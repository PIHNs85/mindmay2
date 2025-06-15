
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lightbulb, Shuffle, Coins, Star, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample word data for levels (expandable)
const LEVEL_DATA = [
  {
    level: 1,
    letters: ['C', 'A', 'T', 'R', 'E', 'S'],
    requiredWords: [
      { word: 'CAT', x: 0, y: 0, direction: 'across', clue: 'Feline pet' },
      { word: 'ART', x: 0, y: 2, direction: 'across', clue: 'Creative work' },
      { word: 'CAR', x: 0, y: 0, direction: 'down', clue: 'Vehicle' }
    ],
    bonusWords: ['RATE', 'TEAR', 'CARE', 'RACE', 'SCARE'],
    gridSize: { width: 5, height: 5 }
  },
  {
    level: 2,
    letters: ['H', 'O', 'U', 'S', 'E', 'M', 'T'],
    requiredWords: [
      { word: 'HOUSE', x: 0, y: 0, direction: 'across', clue: 'Place to live' },
      { word: 'MOUSE', x: 0, y: 2, direction: 'across', clue: 'Small rodent' },
      { word: 'HOME', x: 0, y: 4, direction: 'across', clue: 'Where heart is' }
    ],
    bonusWords: ['SOME', 'THEM', 'MOST', 'HOST', 'SHOT'],
    gridSize: { width: 6, height: 6 }
  }
];

interface WordMakerProps {}

const WordMaker: React.FC<WordMakerProps> = () => {
  const { toast } = useToast();
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [bonusWords, setBonusWords] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [coins, setCoins] = useState(100);
  const [hints, setHints] = useState(3);
  const [score, setScore] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);

  const currentLevelData = LEVEL_DATA[Math.min(level - 1, LEVEL_DATA.length - 1)];
  const shuffledLetters = useMemo(() => {
    const letters = [...currentLevelData.letters];
    for (let i = 0; i < shuffleCount; i++) {
      for (let j = letters.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [letters[j], letters[k]] = [letters[k], letters[j]];
      }
    }
    return letters;
  }, [currentLevelData.letters, shuffleCount]);

  const allPossibleWords = [...currentLevelData.requiredWords.map(w => w.word), ...currentLevelData.bonusWords];

  // Reset when level changes
  useEffect(() => {
    setFoundWords([]);
    setBonusWords([]);
    setCurrentWord('');
    setSelectedLetters([]);
    setScore(0);
  }, [level]);

  const handleLetterClick = (index: number) => {
    if (selectedLetters.includes(index)) {
      // Deselect if already selected
      const newSelected = selectedLetters.filter(i => i !== index);
      setSelectedLetters(newSelected);
      setCurrentWord(newSelected.map(i => shuffledLetters[i]).join(''));
    } else {
      // Add to selection
      const newSelected = [...selectedLetters, index];
      setSelectedLetters(newSelected);
      setCurrentWord(newSelected.map(i => shuffledLetters[i]).join(''));
    }
  };

  const submitWord = () => {
    if (currentWord.length < 3) {
      toast({ title: "Too short", description: "Words must be at least 3 letters long.", variant: "destructive" });
      return;
    }

    const requiredWord = currentLevelData.requiredWords.find(w => w.word === currentWord);
    const isBonusWord = currentLevelData.bonusWords.includes(currentWord);

    if (requiredWord && !foundWords.includes(currentWord)) {
      setFoundWords([...foundWords, currentWord]);
      setScore(score + currentWord.length * 10);
      setCoins(coins + 5);
      toast({ title: "Great!", description: `Found required word: ${currentWord}`, variant: "default" });
    } else if (isBonusWord && !bonusWords.includes(currentWord)) {
      setBonusWords([...bonusWords, currentWord]);
      setScore(score + currentWord.length * 15);
      setCoins(coins + 10);
      toast({ title: "Bonus!", description: `Found bonus word: ${currentWord}`, variant: "default" });
    } else if (foundWords.includes(currentWord) || bonusWords.includes(currentWord)) {
      toast({ title: "Already found", description: "You've already found this word.", variant: "destructive" });
    } else {
      toast({ title: "Not a valid word", description: "This word is not in the puzzle.", variant: "destructive" });
    }

    setCurrentWord('');
    setSelectedLetters([]);
  };

  const shuffleLetters = () => {
    if (coins >= 10) {
      setShuffleCount(shuffleCount + 1);
      setCoins(coins - 10);
      toast({ title: "Letters shuffled!", description: "Spent 10 coins", variant: "default" });
    } else {
      toast({ title: "Not enough coins", description: "Need 10 coins to shuffle", variant: "destructive" });
    }
  };

  const useHint = () => {
    if (hints > 0) {
      const unFoundRequired = currentLevelData.requiredWords.filter(w => !foundWords.includes(w.word));
      if (unFoundRequired.length > 0) {
        const hintWord = unFoundRequired[0];
        toast({ title: "Hint", description: `Try: ${hintWord.clue}`, variant: "default" });
        setHints(hints - 1);
      }
    } else {
      toast({ title: "No hints left", description: "Use coins to buy more hints", variant: "destructive" });
    }
  };

  const nextLevel = () => {
    if (level < LEVEL_DATA.length) {
      setLevel(level + 1);
    } else {
      toast({ title: "Congratulations!", description: "You've completed all available levels!", variant: "default" });
    }
  };

  const isLevelComplete = foundWords.length === currentLevelData.requiredWords.length;
  const progressPercentage = (foundWords.length / currentLevelData.requiredWords.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 animate-fade-in-up">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span>Word Maker</span>
          <Badge className="ml-2 bg-purple-600 text-white">Level {level}</Badge>
        </CardTitle>
        
        <div className="flex justify-center gap-4 mt-3 text-sm">
          <span className="flex items-center">
            <Coins className="w-4 h-4 text-yellow-500 mr-1" />
            {coins}
          </span>
          <span className="flex items-center">
            <Lightbulb className="w-4 h-4 text-blue-500 mr-1" />
            {hints}
          </span>
          <span className="flex items-center">
            <Star className="w-4 h-4 text-purple-500 mr-1" />
            {score}
          </span>
        </div>

        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {foundWords.length}/{currentLevelData.requiredWords.length} required words found
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Word Display */}
        <div className="text-center">
          <div className="text-2xl font-bold tracking-wider min-h-[2rem] p-3 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            {currentWord || 'Select letters to form words...'}
          </div>
        </div>

        {/* Letter Circle */}
        <div className="relative mx-auto" style={{ width: '280px', height: '280px' }}>
          <div className="absolute inset-0 rounded-full border-4 border-purple-200 bg-purple-50">
            {shuffledLetters.map((letter, index) => {
              const angle = (index * 360) / shuffledLetters.length;
              const radian = (angle * Math.PI) / 180;
              const radius = 110;
              const x = Math.cos(radian) * radius + 140;
              const y = Math.sin(radian) * radius + 140;
              
              return (
                <button
                  key={index}
                  className={`absolute w-12 h-12 rounded-full font-bold text-lg transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedLetters.includes(index)
                      ? 'bg-purple-600 text-white scale-110 shadow-lg'
                      : 'bg-white text-purple-900 hover:bg-purple-100 shadow-md hover:scale-105'
                  }`}
                  style={{ left: x, top: y }}
                  onClick={() => handleLetterClick(index)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 flex-wrap">
          <Button onClick={submitWord} disabled={currentWord.length < 3} className="bg-green-600 hover:bg-green-700">
            Submit Word
          </Button>
          <Button onClick={() => { setCurrentWord(''); setSelectedLetters([]); }} variant="outline">
            Clear
          </Button>
          <Button onClick={shuffleLetters} variant="outline" className="flex items-center gap-1">
            <Shuffle className="w-4 h-4" />
            Shuffle (10 coins)
          </Button>
          <Button onClick={useHint} variant="outline" className="flex items-center gap-1">
            <Lightbulb className="w-4 h-4" />
            Hint ({hints})
          </Button>
        </div>

        {/* Found Words */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Required Words ({foundWords.length}/{currentLevelData.requiredWords.length})</h3>
            <div className="space-y-1">
              {currentLevelData.requiredWords.map((wordData, index) => (
                <div key={index} className={`p-2 rounded text-sm ${
                  foundWords.includes(wordData.word) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {foundWords.includes(wordData.word) ? wordData.word : '???'} - {wordData.clue}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bonus Words ({bonusWords.length})</h3>
            <div className="flex flex-wrap gap-1">
              {bonusWords.map((word, index) => (
                <Badge key={index} className="bg-yellow-200 text-yellow-800">
                  {word}
                </Badge>
              ))}
              {bonusWords.length === 0 && (
                <span className="text-gray-500 italic text-sm">Find extra words for bonus points!</span>
              )}
            </div>
          </div>
        </div>

        {/* Level Complete */}
        {isLevelComplete && (
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-2">Level Complete! 🎉</h3>
            <p className="text-green-700 mb-3">
              Bonus words found: {bonusWords.length} | Total score: {score}
            </p>
            <Button onClick={nextLevel} className="bg-green-600 hover:bg-green-700">
              Next Level <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Daily Challenge Hint */}
        <div className="text-center text-xs text-gray-500 border-t pt-4">
          🎯 Daily challenges and more levels coming soon!
        </div>
      </CardContent>
    </Card>
  );
};

export default WordMaker;
