
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Check, X, Trophy } from 'lucide-react';

interface Word {
  word: string;
  hint: string;
  category: string;
}

const WordScramble = () => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const words: Word[] = [
    { word: 'HAPPINESS', hint: 'A feeling of joy and contentment', category: 'Emotions' },
    { word: 'MINDFUL', hint: 'Being present and aware', category: 'Wellness' },
    { word: 'BREATHE', hint: 'What you do to live and relax', category: 'Health' },
    { word: 'PEACEFUL', hint: 'Calm and tranquil state', category: 'Emotions' },
    { word: 'GRATITUDE', hint: 'Feeling thankful', category: 'Emotions' },
    { word: 'STRENGTH', hint: 'Inner power and resilience', category: 'Wellness' },
    { word: 'BALANCE', hint: 'Harmony in life', category: 'Wellness' },
    { word: 'COURAGE', hint: 'Bravery in difficult times', category: 'Character' }
  ];

  const scrambleWord = (word: string) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  const getNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord.word));
    setUserAnswer('');
    setFeedback(null);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setAttempts(0);
    getNewWord();
  };

  const checkAnswer = () => {
    if (!currentWord) return;
    
    setAttempts(prev => prev + 1);
    
    if (userAnswer.toUpperCase() === currentWord.word) {
      setScore(prev => prev + 1);
      setFeedback('correct');
      setTimeout(() => {
        getNewWord();
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  const reshuffleWord = () => {
    if (currentWord) {
      setScrambledWord(scrambleWord(currentWord.word));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Shuffle className="w-5 h-5" />
          <span>Word Scramble</span>
        </CardTitle>
        {gameStarted && (
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Score: {score}</span>
            </div>
            <div>Attempts: {attempts}</div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!gameStarted ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">Unscramble words related to mental wellness!</p>
            <Button onClick={startGame} className="w-full">
              Start Game
            </Button>
          </div>
        ) : currentWord ? (
          <>
            <div className="text-center space-y-2">
              <Badge variant="outline">{currentWord.category}</Badge>
              <div className="text-2xl font-bold tracking-widest text-blue-600">
                {scrambledWord}
              </div>
              <p className="text-sm text-gray-600">Hint: {currentWord.hint}</p>
            </div>
            
            <div className="space-y-3">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                className="text-center"
              />
              
              <div className="flex space-x-2">
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()} className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Check
                </Button>
                <Button variant="outline" onClick={reshuffleWord}>
                  <Shuffle className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {feedback && (
              <div className={`text-center p-3 rounded-lg ${
                feedback === 'correct' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {feedback === 'correct' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span>Correct! Well done!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <X className="w-5 h-5" />
                    <span>Try again!</span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default WordScramble;
