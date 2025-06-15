
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export const ProgressSection: React.FC = () => (
  <Card className="mt-8 bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-gray-900">
        <Trophy className="w-5 h-5 text-green-500" />
        <span>Your Progress</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-gray-700 font-medium">Games Played</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-sm text-gray-700 font-medium">Average Score</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">7</div>
          <div className="text-sm text-gray-700 font-medium">Day Streak</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-600">3</div>
          <div className="text-sm text-gray-700 font-medium">Achievements</div>
        </div>
      </div>
    </CardContent>
  </Card>
);
