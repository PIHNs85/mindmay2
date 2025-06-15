
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw } from 'lucide-react';

interface MemoryCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCards: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const symbols = ['🌟', '🎯', '🔥', '💎', '🌈', '⚡', '🎪', '🚀', '🎨', '🎭', '🎵', '🎲', '🎊', '🎈', '🎁', '🏆', '🌺', '🦋', '🌸', '🍀'];

  const getGridConfig = (level: number) => {
    if (level <= 4) return { rows: 2, cols: 2 }; // 2 pairs
    if (level <= 8) return { rows: 2, cols: 3 }; // 3 pairs
    if (level <= 12) return { rows: 3, cols: 4 }; // 6 pairs
    if (level <= 16) return { rows: 4, cols: 4 }; // 8 pairs
    return { rows: 4, cols: 5 }; // 10 pairs
  };

  const initializeGame = () => {
    const { rows, cols } = getGridConfig(level);
    const totalCards = rows * cols;
    const pairsNeeded = Math.floor(totalCards / 2);
    
    const cardValues = symbols.slice(0, pairsNeeded);
    const cardPairs = [...cardValues, ...cardValues];
    
    // Add single card if odd number of total cards
    if (totalCards % 2 === 1) {
      cardPairs.push('🎭'); // Special single card
    }
    
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards.map(id => newCards[id]);

      if (firstCard.value === secondCard.value) {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            newFlippedCards.includes(card.id) ? { ...card, isMatched: true } : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          setScore(prev => prev + (21 - level) * 10); // More points for harder levels
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
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
    const totalPairs = Math.floor(cards.length / 2);
    if (matchedPairs === totalPairs && totalPairs > 0) {
      setGameComplete(true);
    }
  }, [matchedPairs, cards.length]);

  const { rows, cols } = getGridConfig(level);

  return (
    <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-blue-700">Memory Cards</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-blue-100 text-blue-800">Level {level}/20</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                Score: {score}
              </Badge>
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
        <div 
          className="grid gap-3 mx-auto justify-center"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: `${cols * 80}px`
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl font-bold ${
                card.isFlipped || card.isMatched
                  ? 'bg-white border-blue-300 shadow-lg transform scale-105'
                  : 'bg-blue-100 border-blue-200 hover:bg-blue-200 hover:scale-105'
              }`}
              onClick={() => handleCardClick(card.id)}
              style={{ minWidth: '60px', minHeight: '60px' }}
            >
              {card.isFlipped || card.isMatched ? card.value : '?'}
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Moves: {moves} | Pairs: {matchedPairs}/{Math.floor(cards.length / 2)}</p>
          <p className="text-xs mt-1">Grid: {rows}×{cols}</p>
        </div>

        {gameComplete && (
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center space-x-2 text-blue-700 font-semibold mb-2">
              <Trophy className="w-5 h-5" />
              <span>Level {level} Complete!</span>
            </div>
            <p className="text-sm text-blue-600 mb-3">
              Completed in {moves} moves! +{(21 - level) * 10} points
            </p>
            <Button 
              onClick={nextLevel}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {level < 20 ? `Next Level (${level + 1})` : 'Play Again'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryCards;
