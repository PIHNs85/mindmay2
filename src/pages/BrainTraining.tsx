import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Gamepad2, Target, Zap, ArrowLeft, Trophy, Focus, Eye, BookType, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import WordScramble from '@/components/WordScramble';
import PatternRecognition from '@/components/PatternRecognition';
import MemoryCards from '@/components/MemoryCards';
import FocusChallenge from '@/components/FocusChallenge';
import SimonPattern from "@/components/SimonPattern";
import AdvancedColorMemory from '@/components/AdvancedColorMemory';
import AlphabetOrderChallenge from '@/components/AlphabetOrderChallenge';
import Wordle5Letter from '@/components/Wordle5Letter';
import { GameCard } from '@/components/brain-training/GameCard';
import { CategoryFilter } from '@/components/brain-training/CategoryFilter';
import { ProgressSection } from '@/components/brain-training/ProgressSection';
import WordMaker from '@/components/WordMaker';

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Memory' | 'Focus' | 'Logic' | 'Language';
  icon: typeof Brain;
}

const BrainTraining = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const games: Game[] = [
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble words related to mental wellness and mindfulness.',
      difficulty: 'Easy',
      category: 'Language',
      icon: Brain
    },
    {
      id: 'memory-cards',
      title: 'Memory Cards (20 Levels)',
      description: 'Match pairs of cards with increasing grid sizes across 20 progressive levels.',
      difficulty: 'Medium',
      category: 'Memory',
      icon: Target
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition (20 Levels)',
      description: 'Identify arithmetic, geometric, and complex patterns across 20 challenging levels.',
      difficulty: 'Hard',
      category: 'Logic',
      icon: Zap
    },
    {
      id: 'focus-challenge',
      title: 'Focus Challenge (20 Levels)',
      description: 'Color identification challenges with increasing difficulty and time pressure.',
      difficulty: 'Hard',
      category: 'Focus',
      icon: Eye
    },
    {
      id: 'simon-pattern',
      title: 'Simon Pattern (20 Levels)',
      description: 'Memorize and repeat progressively longer patterns in a classic Simon Says game.',
      difficulty: 'Medium',
      category: 'Memory',
      icon: Trophy
    },
    {
      id: 'advanced-color-memory',
      title: 'Advanced Color Memory',
      description: 'Memorize and recall complex color sequences, with a growing palette and tough time pressure. A true visual memory challenge!',
      difficulty: 'Hard',
      category: 'Memory',
      icon: Eye
    },
    {
      id: 'alphabet-order-challenge',
      title: 'Alphabet Order Challenge',
      description: 'Select shuffled letters in perfect alphabetical order! Letters, pool, and difficulty increase each level.',
      difficulty: 'Medium',
      category: 'Language',
      icon: BookType
    },
    {
      id: 'wordle-challenge',
      title: 'Wordle 5-Letter Challenge (50 Levels)',
      description: 'Guess the 5-letter word in 6 tries! Green = correct position, Yellow = wrong position, Gray = not in word.',
      difficulty: 'Hard',
      category: 'Language',
      icon: Trophy
    },
    {
      id: 'word-maker',
      title: 'Word Maker (50 Levels)',
      description: 'Swipe through jumbled letters in a circle to form words and fill crossword-style grids. Find required words and discover bonus words for extra points!',
      difficulty: 'Medium',
      category: 'Language',
      icon: BookType
    }
  ];

  const categories = ['All', 'Memory', 'Focus', 'Logic', 'Language'];

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'word-scramble':
        return <WordScramble />;
      case 'pattern-recognition':
        return <PatternRecognition />;
      case 'memory-cards':
        return <MemoryCards />;
      case 'focus-challenge':
        return <FocusChallenge />;
      case 'simon-pattern':
        return <SimonPattern />;
      case 'advanced-color-memory':
        return <AdvancedColorMemory />;
      case 'alphabet-order-challenge':
        return <AlphabetOrderChallenge />;
      case 'wordle-challenge':
        return <Wordle5Letter />;
      case 'word-maker':
        return <WordMaker />;
      default:
        return (
          <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20">
            <CardContent className="text-center py-12">
              <p className="text-gray-700 font-medium">This game is coming soon!</p>
              <Button 
                onClick={() => setSelectedGame(null)} 
                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                Back to Games
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  if (selectedGame) {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop&crop=center')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced blurred overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-blue-900/40 backdrop-blur-md"></div>
        
        <div className="relative z-10">
          <header className="bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedGame(null)} className="text-gray-900 hover:bg-white/80">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Games
                  </Button>
                  <h1 className="text-xl font-semibold text-gray-900">Brain Training</h1>
                </div>
              </div>
            </div>
          </header>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderGame()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-blue-900/40 backdrop-blur-md"></div>
      
      <div className="relative z-10">
        {/* Header with enhanced contrast */}
        <header className="bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/80">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">Brain Training</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filters with enhanced styling */}
          <div className="mb-8">
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>

          {/* Games Grid with enhanced styling */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onSelect={setSelectedGame} 
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>

          {/* Progress Section with enhanced styling */}
          <ProgressSection />
        </div>
      </div>
    </div>
  );
};

export default BrainTraining;