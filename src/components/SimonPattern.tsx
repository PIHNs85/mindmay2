
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const MAX_LEVEL = 20;

const getPatternLengthForLevel = (level: number) => {
  if (level < 5) return 3 + level;
  if (level < 10) return 7 + Math.floor((level - 5) / 2);
  if (level < 15) return 10 + level - 10;
  return 15 + (level - 15);
};

const SimonPattern: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [showingPattern, setShowingPattern] = useState(false);
  const [patternStep, setPatternStep] = useState<number>(-1);
  const [patternHighlight, setPatternHighlight] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [mistake, setMistake] = useState(false);

  useEffect(() => {
    initializePatternGame();
    // eslint-disable-next-line
  }, [level]);

  const initializePatternGame = () => {
    const len = getPatternLengthForLevel(level);
    const newPattern = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 9)
    );
    setPattern(newPattern);
    setUserPattern([]);
    setPatternStep(-1);
    setPatternHighlight(null);
    setMistake(false);
    showPattern(newPattern);
  };

  const showPattern = (patternSequence: number[]) => {
    setShowingPattern(true);
    let idx = 0;
    setPatternHighlight(null);

    const interval = setInterval(() => {
      setPatternHighlight(patternSequence[idx]);
      idx++;
      if (idx >= patternSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPatternHighlight(null);
          setShowingPattern(false);
        }, 700);
      }
    }, 700);
  };

  const handlePatternClick = (index: number) => {
    if (showingPattern) return;
    if (gameComplete) return;

    const current = userPattern.length;
    if (pattern[current] !== index) {
      setMistake(true);
      setTimeout(() => {
        setUserPattern([]);
        setMistake(false);
        showPattern(pattern);
      }, 700);
      return;
    }

    const nextPattern = [...userPattern, index];
    setUserPattern(nextPattern);
    if (nextPattern.length === pattern.length) {
      setScore((prev) => prev + level * 10);
      setGameComplete(true);
    }
  };

  const nextLevel = () => {
    if (level < MAX_LEVEL) {
      setLevel((l) => l + 1);
    } else {
      setLevel(1);
      setScore(0);
    }
    setGameComplete(false);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameComplete(false);
    initializePatternGame();
  };

  return (
    <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-yellow-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-yellow-800">Simon Pattern</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-yellow-100 text-yellow-800">Level {level}/20</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                Score: {score}
              </Badge>
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-3 text-center">
          <p className="text-lg mb-2">
            {showingPattern
              ? "Watch the pattern!"
              : userPattern.length === 0
              ? "Repeat the pattern by clicking the squares"
              : mistake
              ? "Oops! Try again with the same pattern."
              : "Keep going! Replay the pattern"}
          </p>
          <Badge variant="outline">Pattern Length: {pattern.length}</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {Array.from({ length: 9 }, (_, index) => {
            const isStep = showingPattern && patternHighlight === index;
            const isUser =
              !showingPattern &&
              userPattern.length > 0 &&
              userPattern[userPattern.length - 1] === index;
            const isWrong = mistake && isUser && pattern[userPattern.length - 1] !== index;
            return (
              <div
                key={index}
                className={[
                  "aspect-square rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer transition-all duration-200 select-none",
                  isStep
                    ? "bg-yellow-400 animate-pulse"
                    : showingPattern
                    ? "bg-yellow-200 opacity-70"
                    : isUser
                    ? isWrong
                      ? "bg-red-500"
                      : "bg-green-500"
                    : "bg-gray-400 hover:scale-105",
                ].join(" ")}
                style={{
                  pointerEvents: showingPattern || gameComplete ? "none" : "auto",
                  userSelect: "none",
                }}
                onClick={() => handlePatternClick(index)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>

        {gameComplete && (
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-center space-x-2 text-yellow-700 font-semibold mb-2">
              <Trophy className="w-5 h-5" />
              <span>Level {level} Complete!</span>
            </div>
            <p className="text-sm text-yellow-700 mb-3">
              +{level * 10} points
            </p>
            <Button
              onClick={nextLevel}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              {level < MAX_LEVEL ? `Next Level (${level + 1})` : "Play Again"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimonPattern;
