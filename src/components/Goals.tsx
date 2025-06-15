import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, Clock, Plus, CheckCircle, Circle, Sparkles, Trophy, Zap } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  progress: number;
  total: number;
  completed: boolean;
  dueDate: Date;
}

const Goals = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete morning meditation',
      description: 'Start the day with 10 minutes of mindfulness',
      type: 'daily',
      progress: 1,
      total: 1,
      completed: true,
      dueDate: new Date()
    },
    {
      id: '2',
      title: 'Track mood 3 times',
      description: 'Check in with your emotions regularly',
      type: 'daily',
      progress: 2,
      total: 3,
      completed: false,
      dueDate: new Date()
    },
    {
      id: '3',
      title: 'Complete 5 brain training sessions',
      description: 'Keep your mind sharp with cognitive exercises',
      type: 'weekly',
      progress: 2,
      total: 5,
      completed: false,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'Listen to 3 sleep stories',
      description: 'Improve your sleep quality',
      type: 'weekly',
      progress: 1,
      total: 3,
      completed: false,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      title: 'Achieve 7-day streak',
      description: 'Maintain consistency in your wellness journey',
      type: 'monthly',
      progress: 7,
      total: 7,
      completed: true,
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
    },
    {
      id: '6',
      title: 'Complete wellness assessment',
      description: 'Track your progress with monthly evaluation',
      type: 'monthly',
      progress: 0,
      total: 1,
      completed: false,
      dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
    }
  ]);

  const filteredGoals = goals.filter(goal => goal.type === activeTab);

  const toggleGoalComplete = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : goal.total }
        : goal
    ));
  };

  const addNewGoal = () => {
    if (newGoalTitle.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: newGoalTitle,
        description: 'Custom goal',
        type: activeTab,
        progress: 0,
        total: 1,
        completed: false,
        dueDate: new Date(Date.now() + (activeTab === 'daily' ? 1 : activeTab === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000)
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setShowAddForm(false);
    }
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'daily': return Clock;
      case 'weekly': return Calendar;
      case 'monthly': return Target;
      default: return Target;
    }
  };

  const getTabColor = (type: string) => {
    switch (type) {
      case 'daily': return 'from-orange-400 to-red-500';
      case 'weekly': return 'from-blue-400 to-indigo-500';
      case 'monthly': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const completedGoals = filteredGoals.filter(goal => goal.completed).length;
  const totalGoals = filteredGoals.length;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  return (
    <Card className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-sm shadow-xl border-0 ring-1 ring-white/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-green-200/20 rounded-full translate-y-16 -translate-x-16"></div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center space-x-2 text-gray-900">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
            Goals & Progress
          </span>
        </CardTitle>
        
        {/* Progress overview */}
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
            <Zap className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              {completedGoals}/{totalGoals} completed
            </span>
          </div>
          <div className="flex-1 max-w-32 relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(completionRate)}%
          </span>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/40 backdrop-blur-sm rounded-xl p-1 shadow-md mt-4">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => {
            const Icon = getTabIcon(tab);
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${getTabColor(tab)} text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{tab}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        {/* Add Goal Form */}
        {showAddForm ? (
          <div className="p-4 border-2 border-dashed border-green-300 rounded-xl bg-white/40 backdrop-blur-sm shadow-md">
            <div className="flex space-x-2">
              <Input
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder={`Enter ${activeTab} goal...`}
                onKeyPress={(e) => e.key === 'Enter' && addNewGoal()}
                className="bg-white/80 border-green-200 focus:ring-green-500"
              />
              <Button 
                onClick={addNewGoal} 
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
              >
                Add
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)} 
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowAddForm(true)}
            className="w-full border-dashed border-green-300 text-green-700 hover:bg-green-50 bg-white/40 backdrop-blur-sm shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {activeTab} goal
          </Button>
        )}

        {/* Goals List */}
        <div className="space-y-3">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                goal.completed
                  ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg'
                  : 'border-white/40 bg-white/60 backdrop-blur-sm hover:border-green-200 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleGoalComplete(goal.id)}
                  className="mt-1 transform hover:scale-110 transition-transform duration-200"
                >
                  {goal.completed ? (
                    <div className="relative">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors duration-200" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold ${
                      goal.completed ? 'text-green-700 line-through' : 'text-gray-900'
                    }`}>
                      {goal.title}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs capitalize border-white/40 ${
                        goal.type === 'daily' ? 'text-orange-600 bg-orange-50' :
                        goal.type === 'weekly' ? 'text-blue-600 bg-blue-50' :
                        'text-purple-600 bg-purple-50'
                      }`}
                    >
                      {goal.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                  
                  {!goal.completed && goal.total > 1 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span className="font-medium">Progress</span>
                        <span className="font-medium">{goal.progress}/{goal.total}</span>
                      </div>
                      <div className="relative">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-3 text-xs">
                    <span className="text-gray-500 font-medium">
                      Due: {goal.dueDate.toLocaleDateString()}
                    </span>
                    {goal.completed && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGoals.length === 0 && (
          <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium text-lg">No {activeTab} goals yet</p>
            <p className="text-sm text-gray-400 mt-1">Add your first goal to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Goals;