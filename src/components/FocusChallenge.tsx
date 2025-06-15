
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw, Timer } from 'lucide-react';

interface ColorOption {
  name: string;
  bgColor: string;
  textColor: string;
}

const FocusChallenge: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [targetColor, setTargetColor] = useState<ColorOption | null>(null);
  const [options, setOptions] = useState<ColorOption[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ColorOption | null>(null);

  const allColors: ColorOption[] = [
    { name: 'Red', bgColor: 'bg-red-500', textColor: 'text-red-500' },
    { name: 'Blue', bgColor: 'bg-blue-500', textColor: 'text-blue-500' },
    { name: 'Green', bgColor: 'bg-green-500', textColor: 'text-green-500' },
    { name: 'Yellow', bgColor: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { name: 'Purple', bgColor: 'bg-purple-500', textColor: 'text-purple-500' },
    { name: 'Pink', bgColor: 'bg-pink-500', textColor: 'text-pink-500' },
    { name: 'Orange', bgColor: 'bg-orange-500', textColor: 'text-orange-500' },
    { name: 'Teal', bgColor: 'bg-teal-500', textColor: 'text-teal-500' },
    { name: 'Indigo', bgColor: 'bg-indigo-500', textColor: 'text-indigo-500' },
    { name: 'Cyan', bgColor: 'bg-cyan-500', textColor: 'text-cyan-500' },
    { name: 'Lime', bgColor: 'bg-lime-500', textColor: 'text-lime-500' },
    { name: 'Rose', bgColor: 'bg-rose-500', textColor: 'text-rose-500' },
    { name: 'Violet', bgColor: 'bg-violet-500', textColor: 'text-violet-500' },
    { name: 'Amber', bgColor: 'bg-amber-500', textColor: 'text-amber-500' },
    { name: 'Emerald', bgColor: 'bg-emerald-500', textColor: 'text-emerald-500' },
    { name: 'Sky', bgColor: 'bg-sky-500', textColor: 'text-sky-500' },
  ];

  const getGameConfig = (level: number) => {
    const optionCount = Math.min(4 + Math.floor((level - 1) / 2), 16);
    const timeLimit = Math.max(10 - Math.floor((level - 1) / 3), 3); // 10s to 3s
    return { optionCount, timeLimit };
  };

  const initializeGame = () => {
    const { optionCount, timeLimit } = getGameConfig(level);
    
    // Select random colors for this level
    const shuffledColors = [...allColors].sort(() => Math.random() - 0.5);
    const levelOptions = shuffledColors.slice(0, optionCount);
    
    // Pick a random target
    const target = levelOptions[Math.floor(Math.random() * levelOptions.length)];
    
    setOptions(levelOptions);
    setTargetColor(target);
    setTimeLeft(timeLimit);
    setGameActive(true);
    setGameComplete(false);
    setSelectedOption(null);
  };

  const handleColorClick = (option: ColorOption) => {
    if (!gameActive || gameComplete) return;
    
    setSelectedOption(option);
    setGameActive(false);
    
    if (option.name === targetColor?.name) {
      const timeBonus = Math.max(timeLeft * 5, 10);
      setScore(prev => prev + level * 20 + timeBonus);
      setGameComplete(true);
    } else {
      setScore(prev => Math.max(0, prev - 10));
    }
  };

  const nextLevel = () => {
    if (level < 20) {
      setLevel(prev => prev + 1);
    } else {
      setLevel(1);
      setScore(0);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, [level]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gameActive && timeLeft === 0) {
      setGameActive(false);
      setScore(prev => Math.max(0, prev - 20));
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  const gridCols = Math.ceil(Math.sqrt(options.length));

  return (
    <Card className="max-w-3xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-green-700">Focus Challenge</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-green-100 text-green-800">Level {level}/20</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                Score: {score}
              </Badge>
              {gameActive && (
                <Badge className="bg-red-100 text-red-800">
                  <Timer className="w-3 h-3 mr-1" />
                  {timeLeft}s
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={initializeGame}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {targetColor && (
          <div className="text-center">
            <p className="text-lg font-medium mb-4">Find this color:</p>
            <div className={`text-3xl font-bold mb-6 ${targetColor.textColor}`}>
              {targetColor.name}
            </div>
          </div>
        )}

        <div 
          className="grid gap-3 mx-auto justify-center"
          style={{ 
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            maxWidth: `${gridCols * 100}px`
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg cursor-pointer transition-all duration-200 border-2 flex items-center justify-center ${
                option.bgColor
              } ${
                selectedOption === option
                  ? option.name === targetColor?.name
                    ? 'ring-4 ring-green-400 border-green-300'
                    : 'ring-4 ring-red-400 border-red-300'
                  : 'border-gray-300 hover:scale-105 hover:ring-2 hover:ring-gray-400'
              } ${!gameActive ? 'cursor-not-allowed opacity-75' : ''}`}
              onClick={() => handleColorClick(option)}
              style={{ minWidth: '80px', minHeight: '80px' }}
            >
              {selectedOption === option && (
                <span className="text-white font-bold text-lg drop-shadow-lg">
                  {option.name === targetColor?.name ? '✓' : '✗'}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Colors: {options.length} | Time Limit: {getGameConfig(level).timeLimit}s</p>
        </div>

        {!gameActive && !gameComplete && timeLeft === 0 && (
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-red-600 font-semibold mb-2">
              Time's up! The correct color was <span className={`font-bold ${targetColor?.textColor}`}>{targetColor?.name}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={initializeGame}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        )}

        {!gameActive && selectedOption && selectedOption.name !== targetColor?.name && (
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-red-600 font-semibold mb-2">
              Incorrect! The correct color was <span className={`font-bold ${targetColor?.textColor}`}>{targetColor?.name}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={initializeGame}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        )}

        {gameComplete && (
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center space-x-2 text-green-700 font-semibold mb-2">
              <Trophy className="w-5 h-5" />
              <span>Correct! Level {level} Complete!</span>
            </div>
            <p className="text-sm text-green-600 mb-3">
              +{level * 20 + Math.max(timeLeft * 5, 10)} points (including time bonus)
            </p>
            <Button 
              onClick={nextLevel}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {level < 20 ? `Next Level (${level + 1})` : 'Play Again'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FocusChallenge;
