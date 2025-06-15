import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw, Keyboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Common 5-letter words for 50 levels
const WORD_LIST = [
  // Level 1-10: Easy words
  'ABOUT', 'ABOVE', 'AFTER', 'AGAIN', 'AMONG', 'APPLE', 'BEACH', 'BREAD', 'CHAIR', 'CLEAN',
  // Level 11-20: Medium words
  'DANCE', 'DREAM', 'EARLY', 'EARTH', 'FIELD', 'FIRST', 'GLASS', 'GREAT', 'GREEN', 'HAPPY',
  // Level 21-30: Harder words
  'HEART', 'HOUSE', 'LIGHT', 'MONEY', 'MUSIC', 'NIGHT', 'OCEAN', 'PAPER', 'PEACE', 'PLANT',
  // Level 31-40: Advanced words
  'QUICK', 'QUIET', 'RIGHT', 'ROUND', 'SMALL', 'SMILE', 'SOUND', 'SPACE', 'START', 'STORY',
  // Level 41-50: Expert words
  'STUDY', 'SWEET', 'TABLE', 'THANK', 'THINK', 'THREE', 'TODAY', 'TRAIN', 'WATER', 'WORLD'
];

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface GuessLetter {
  letter: string;
  state: LetterState;
}

const Wordle5Letter: React.FC = () => {
  const { toast } = useToast();
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<GuessLetter[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [keyboardState, setKeyboardState] = useState<Record<string, LetterState>>({});
  const [score, setScore] = useState(0);
  const [shakeRow, setShakeRow] = useState(-1);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, [level]);

  const startNewGame = () => {
    const word = WORD_LIST[level - 1] || WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(word);
    setGuesses([]);
    setCurrentGuess('');
    setGameState('playing');
    setKeyboardState({});
    setShakeRow(-1);
  };

  const getLetterState = (letter: string, position: number, word: string): LetterState => {
    if (targetWord[position] === letter) {
      return 'correct';
    } else if (targetWord.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  const updateKeyboardState = (guess: GuessLetter[]) => {
    const newKeyboardState = { ...keyboardState };
    
    guess.forEach(({ letter, state }) => {
      const currentState = newKeyboardState[letter];
      
      // Priority: correct > present > absent
      if (state === 'correct' || 
          (state === 'present' && currentState !== 'correct') ||
          (state === 'absent' && !currentState)) {
        newKeyboardState[letter] = state;
      }
    });
    
    setKeyboardState(newKeyboardState);
  };

  const submitGuess = () => {
    if (currentGuess.length !== 5) {
      toast({ title: "Invalid word", description: "Word must be 5 letters long.", variant: "destructive" });
      return;
    }

    // Simple word validation (in a real game, you'd check against a dictionary)
    if (!/^[A-Z]{5}$/.test(currentGuess)) {
      setShakeRow(guesses.length);
      setTimeout(() => setShakeRow(-1), 600);
      toast({ title: "Not a valid word", description: "Please enter a valid 5-letter word.", variant: "destructive" });
      return;
    }

    const newGuess: GuessLetter[] = currentGuess.split('').map((letter, index) => ({
      letter,
      state: getLetterState(letter, index, currentGuess)
    }));

    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    updateKeyboardState(newGuess);

    if (currentGuess === targetWord) {
      setGameState('won');
      const pointsEarned = (7 - newGuesses.length) * 100 + level * 10;
      setScore(score + pointsEarned);
      toast({ 
        title: "🎉 You Won!", 
        description: `Found the word in ${newGuesses.length} tries! +${pointsEarned} points`,
        variant: "default" 
      });
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
      toast({ 
        title: "❌ Game Over!", 
        description: `The word was: ${targetWord}`,
        variant: "destructive" 
      });
    }

    setCurrentGuess('');
  };

  const handleKeyPress = (key: string) => {
    if (gameState !== 'playing') return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACK') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const nextLevel = () => {
    if (level < 50) {
      setLevel(level + 1);
    } else {
      setLevel(1);
      setScore(0);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    startNewGame();
  };

  const getLetterStyle = (state: LetterState) => {
    switch (state) {
      case 'correct': return 'bg-green-500 text-white border-green-500';
      case 'present': return 'bg-yellow-500 text-white border-yellow-500';
      case 'absent': return 'bg-gray-500 text-white border-gray-500';
      default: return 'bg-white border-gray-300';
    }
  };

  const getKeyStyle = (letter: string) => {
    const state = keyboardState[letter];
    const baseStyle = 'px-3 py-4 rounded font-bold text-sm transition-all duration-200 hover:scale-105';
    
    switch (state) {
      case 'correct': return `${baseStyle} bg-green-500 text-white`;
      case 'present': return `${baseStyle} bg-yellow-500 text-white`;
      case 'absent': return `${baseStyle} bg-gray-500 text-white`;
      default: return `${baseStyle} bg-gray-200 text-gray-900 hover:bg-gray-300`;
    }
  };

  return (
    <Card className="max-w-lg mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-green-200 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-green-800 flex items-center space-x-2">
              <Keyboard className="w-5 h-5" />
              <span>Wordle 5-Letter Challenge</span>
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-green-100 text-green-900">Level {level}/50</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                Score: {score}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={startNewGame}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Game Grid */}
        <div className="grid gap-2 justify-center">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`flex gap-2 ${shakeRow === rowIndex ? 'animate-shake' : ''}`}
            >
              {Array.from({ length: 5 }).map((_, colIndex) => {
                const guess = guesses[rowIndex];
                const letter = guess ? guess[colIndex] : null;
                const isCurrentRow = rowIndex === guesses.length && gameState === 'playing';
                const currentLetter = isCurrentRow ? currentGuess[colIndex] : '';
                
                return (
                  <div
                    key={colIndex}
                    className={`w-14 h-14 border-2 rounded flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                      letter 
                        ? getLetterStyle(letter.state)
                        : currentLetter
                        ? 'bg-gray-100 border-gray-400 scale-105'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {letter?.letter || currentLetter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">Guess the 5-letter word in 6 tries!</p>
          <div className="flex justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Wrong position</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span>Not in word</span>
            </div>
          </div>
        </div>

        {/* Virtual Keyboard */}
        <div className="space-y-2">
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((key) => (
                <Button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  disabled={gameState !== 'playing'}
                  className={`${getKeyStyle(key)} ${
                    key === 'ENTER' || key === 'BACK' ? 'px-4' : 'w-10'
                  }`}
                  size="sm"
                >
                  {key === 'BACK' ? '⌫' : key}
                </Button>
              ))}
            </div>
          ))}
        </div>

        {/* Game Result */}
        {gameState !== 'playing' && (
          <div className={`text-center p-4 rounded-lg border ${
            gameState === 'won' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            {gameState === 'won' ? (
              <>
                <div className="flex items-center justify-center space-x-2 text-green-700 font-semibold mb-2">
                  <Trophy className="w-5 h-5" />
                  <span>Level {level} Complete!</span>
                </div>
                <p className="text-sm text-green-600 mb-3">
                  Found in {guesses.length} tries! +{(7 - guesses.length) * 100 + level * 10} points
                </p>
                <Button 
                  onClick={nextLevel}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {level < 50 ? `Next Level (${level + 1})` : 'Play Again'}
                </Button>
              </>
            ) : (
              <>
                <div className="text-red-600 font-semibold mb-2">
                  Game Over! The word was: <span className="font-bold">{targetWord}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={startNewGame}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </>
            )}
          </div>
        )}

        <div className="text-center text-xs text-gray-500">
          Level {level}/50 • Find the hidden 5-letter word!
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </Card>
  );
};

export default Wordle5Letter;