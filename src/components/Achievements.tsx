import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal, Star, Target, Calendar, Zap, Crown, Award, Sparkles } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  total: number;
  unlocked: boolean;
  category: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const Achievements = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first meditation session',
      icon: Star,
      progress: 1,
      total: 1,
      unlocked: true,
      category: 'Milestone',
      points: 10,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Complete 7 consecutive days of activities',
      icon: Calendar,
      progress: 7,
      total: 7,
      unlocked: true,
      category: 'Streak',
      points: 50,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Mood Master',
      description: 'Track your mood for 30 days',
      icon: Target,
      progress: 12,
      total: 30,
      unlocked: false,
      category: 'Tracking',
      points: 100,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Sleep Scholar',
      description: 'Listen to 10 sleep stories',
      icon: Medal,
      progress: 3,
      total: 10,
      unlocked: false,
      category: 'Sleep',
      points: 75,
      rarity: 'rare'
    },
    {
      id: '5',
      title: 'Brain Booster',
      description: 'Complete 25 brain training exercises',
      icon: Zap,
      progress: 8,
      total: 25,
      unlocked: false,
      category: 'Training',
      points: 150,
      rarity: 'epic'
    },
    {
      id: '6',
      title: 'Champion',
      description: 'Reach 1000 total points',
      icon: Crown,
      progress: 235,
      total: 1000,
      unlocked: false,
      category: 'Points',
      points: 500,
      rarity: 'legendary'
    }
  ];

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600 border-gray-300';
      case 'rare': return 'from-blue-400 to-blue-600 border-blue-300';
      case 'epic': return 'from-purple-400 to-purple-600 border-purple-300';
      case 'legendary': return 'from-yellow-400 to-orange-500 border-yellow-300';
      default: return 'from-gray-400 to-gray-600 border-gray-300';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-50 border-gray-200';
      case 'rare': return 'bg-blue-50 border-blue-200';
      case 'epic': return 'bg-purple-50 border-purple-200';
      case 'legendary': return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 backdrop-blur-sm shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full translate-y-16 -translate-x-16"></div>
      
      <CardHeader className="relative z-10 bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
        <CardTitle className="flex items-center space-x-3 text-xl font-bold">
          <div className="p-2 bg-white/20 rounded-full shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="drop-shadow-lg">Achievements</span>
        </CardTitle>
        <div className="flex items-center space-x-6 text-sm font-medium mt-3">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <Award className="w-4 h-4 text-white" />
            <span className="text-white drop-shadow-md">Total Points: {totalPoints}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white drop-shadow-md">Unlocked: {unlockedCount}/{achievements.length}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 relative z-10">
        <div className="grid gap-6">
          {achievements.map(achievement => (
            <div key={achievement.id} className={`group relative overflow-hidden rounded-2xl border-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${getRarityBg(achievement.rarity)}`}>
              <div className="flex items-start space-x-4 p-6">
                <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${getRarityStyle(achievement.rarity)} shadow-xl ${achievement.unlocked ? 'animate-pulse' : 'opacity-60'}`}>
                  <achievement.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  {achievement.unlocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md">
                      <Star className="w-2 h-2 text-white fill-current m-0.5" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <h3 className={`font-bold text-lg ${achievement.unlocked ? 'text-gray-900' : 'text-gray-600'}`}>
                      {achievement.title}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-bold border-2 capitalize ${
                        achievement.rarity === 'legendary' ? 'border-yellow-400 text-yellow-700 bg-yellow-50' :
                        achievement.rarity === 'epic' ? 'border-purple-400 text-purple-700 bg-purple-50' :
                        achievement.rarity === 'rare' ? 'border-blue-400 text-blue-700 bg-blue-50' :
                        'border-gray-400 text-gray-700 bg-gray-50'
                      }`}
                    >
                      {achievement.rarity}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-gray-400 text-gray-700 bg-white/80 font-medium">
                      {achievement.category}
                    </Badge>
                    {achievement.unlocked && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold shadow-md">
                        +{achievement.points} pts
                      </Badge>
                    )}
                  </div>
                  
                  <p className={`text-sm font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                  
                  {!achievement.unlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-700 font-medium">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="relative">
                        <Progress value={(achievement.progress / achievement.total) * 100} className="h-3 bg-gray-200" />
                        <div 
                          className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 shadow-md"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Rarity glow effect */}
              {achievement.unlocked && (
                <div className={`absolute inset-0 bg-gradient-to-r ${getRarityStyle(achievement.rarity)} opacity-10 pointer-events-none`}></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;