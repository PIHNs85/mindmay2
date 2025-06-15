
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';

export interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Memory' | 'Focus' | 'Logic' | 'Language';
  icon: React.ComponentType<{ className?: string }>;
}

interface GameCardProps {
  game: Game;
  onSelect: (id: string) => void;
  getDifficultyColor: (difficulty: string) => string;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect, getDifficultyColor }) => {
  const IconComponent = game.icon;
  return (
    <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/95 backdrop-blur-lg border-0 ring-1 ring-white/20 hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shadow-md">
              <IconComponent className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">{game.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getDifficultyColor(game.difficulty)}>
                  {game.difficulty}
                </Badge>
                <Badge variant="outline" className="border-gray-300 text-gray-700">{game.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 font-medium">{game.description}</p>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md"
          onClick={() => onSelect(game.id)}
        >
          <Gamepad2 className="w-4 h-4 mr-2" />
          Play Game
        </Button>
      </CardContent>
    </Card>
  );
};
