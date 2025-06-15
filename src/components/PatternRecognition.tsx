
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, ArrowLeft } from "lucide-react";

type Pattern = {
  prompt: string;
  sequence: (string | number)[];
  choices: (string | number)[];
  answer: string | number;
};

const PatternRecognition: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const generatePattern = (level: number): Pattern => {
    const patterns = [
      // Levels 1-5: Simple arithmetic sequences
      () => {
        const start = Math.floor(Math.random() * 10) + 1;
        const step = Math.floor(Math.random() * 5) + 1;
        const sequence = [start, start + step, start + 2 * step, start + 3 * step];
        const answer = start + 4 * step;
        const wrongChoices = [answer + step, answer - step, answer + 2 * step].filter(x => x !== answer);
        return {
          prompt: "What comes next in the arithmetic sequence?",
          sequence: [...sequence, "?"],
          choices: [answer, ...wrongChoices.slice(0, 2)].sort(() => Math.random() - 0.5),
          answer
        };
      },
      
      // Levels 6-10: Geometric sequences
      () => {
        const start = Math.floor(Math.random() * 5) + 2;
        const ratio = Math.floor(Math.random() * 3) + 2;
        const sequence = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio];
        const answer = start * Math.pow(ratio, 4);
        const wrongChoices = [answer * ratio, Math.floor(answer / ratio), answer + start];
        return {
          prompt: "What comes next in the geometric sequence?",
          sequence: [...sequence, "?"],
          choices: [answer, ...wrongChoices.slice(0, 2)].sort(() => Math.random() - 0.5),
          answer
        };
      },

      // Levels 11-15: Shape patterns
      () => {
        const shapes = ["▲", "■", "●", "◆", "★"];
        const patternLength = Math.min(3 + Math.floor(level / 5), 4);
        const basePattern = shapes.slice(0, patternLength);
        const repeats = Math.floor(Math.random() * 2) + 2;
        const sequence = [];
        for (let i = 0; i < repeats; i++) {
          sequence.push(...basePattern);
        }
        const nextInPattern = basePattern[sequence.length % basePattern.length];
        const wrongChoices = shapes.filter(s => s !== nextInPattern).slice(0, 2);
        
        return {
          prompt: "What shape comes next in the pattern?",
          sequence: [...sequence.slice(-4), "?"],
          choices: [nextInPattern, ...wrongChoices].sort(() => Math.random() - 0.5),
          answer: nextInPattern
        };
      },

      // Levels 16-20: Complex letter/number patterns
      () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const start = Math.floor(Math.random() * 20);
        const step = Math.floor(Math.random() * 3) + 1;
        const sequence = [];
        for (let i = 0; i < 4; i++) {
          sequence.push(letters[(start + i * step) % 26]);
        }
        const answer = letters[(start + 4 * step) % 26];
        const wrongChoices = [
          letters[(start + 5 * step) % 26],
          letters[(start + 3 * step) % 26]
        ].filter(x => x !== answer);
        
        return {
          prompt: "What letter comes next in the alphabetical pattern?",
          sequence: [...sequence, "?"],
          choices: [answer, ...wrongChoices.slice(0, 2)].sort(() => Math.random() - 0.5),
          answer
        };
      }
    ];

    const patternType = Math.floor((level - 1) / 5);
    const generator = patterns[Math.min(patternType, patterns.length - 1)];
    return generator();
  };

  const initializeLevel = () => {
    const pattern = generatePattern(level);
    setCurrentPattern(pattern);
    setSelected(null);
    setShowResult(false);
    setGameComplete(false);
  };

  const handleSelect = (choice: string | number) => {
    if (showResult || !currentPattern) return;
    
    setSelected(choice);
    setShowResult(true);
    
    if (choice === currentPattern.answer) {
      setScore(prev => prev + level * 10);
      setGameComplete(true);
    }
  };

  const nextLevel = () => {
    if (level < 20) {
      setLevel(prev => prev + 1);
    } else {
      // Game completed
      setLevel(1);
      setScore(0);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    initializeLevel();
  };

  useEffect(() => {
    initializeLevel();
  }, [level]);

  if (!currentPattern) return null;

  return (
    <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-purple-700">Pattern Recognition</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-purple-100 text-purple-800">Level {level}/20</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                Score: {score}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={initializeLevel}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-lg font-medium mb-4 text-gray-700">{currentPattern.prompt}</p>
          
          <div className="flex items-center justify-center space-x-3 mb-6 flex-wrap">
            {currentPattern.sequence.map((item, idx) =>
              item === "?" ? (
                <span key={idx} className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-700 font-bold text-xl rounded-lg border-2 border-yellow-300">
                  ?
                </span>
              ) : (
                <span key={idx} className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-900 text-lg font-semibold rounded-lg border border-purple-200">
                  {item}
                </span>
              )
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {currentPattern.choices.map((choice, idx) => (
              <Button
                key={idx}
                className={`min-w-[3rem] h-12 text-lg font-bold transition-all duration-200 ${
                  selected === choice
                    ? choice === currentPattern.answer 
                      ? "bg-green-600 hover:bg-green-700 text-white ring-2 ring-green-400" 
                      : "bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
                disabled={showResult}
                onClick={() => handleSelect(choice)}
              >
                {choice}
              </Button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="text-center p-4 rounded-lg border">
            {selected === currentPattern.answer ? (
              <div className="bg-green-50 border-green-200">
                <div className="flex items-center justify-center space-x-2 text-green-700 font-semibold mb-2">
                  <Trophy className="w-5 h-5" />
                  <span>Correct! Level {level} Complete!</span>
                </div>
                <p className="text-sm text-green-600 mb-3">+{level * 10} points</p>
                <Button 
                  onClick={nextLevel}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {level < 20 ? `Next Level (${level + 1})` : 'Play Again'}
                </Button>
              </div>
            ) : (
              <div className="bg-red-50 border-red-200">
                <div className="text-red-600 font-semibold mb-2">
                  Incorrect! The correct answer was <span className="font-bold">{currentPattern.answer}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={initializeLevel}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatternRecognition;
