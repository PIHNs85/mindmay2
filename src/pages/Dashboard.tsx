import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, Phone, BookOpen, Brain, Moon, Target, Calendar, TrendingUp, User, Settings, LogOut, CreditCard, Trophy, Bookmark, Sparkles, Star, Crown, Zap, ArrowRight, Play } from 'lucide-react';
import MoodTracker from '@/components/MoodTracker';
import Achievements from '@/components/Achievements';
import Goals from '@/components/Goals';
import WeeklyStreakCalendar from '@/components/WeeklyStreakCalendar';
import PageTransition from '@/components/PageTransition';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showStreakCalendar, setShowStreakCalendar] = useState(false);
  const todayProgress = 60;
  const weeklyStreak = 7;
  const currentMood = "Calm";

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const quickActions = [
    {
      title: "AI Chat",
      icon: MessageCircle,
      href: "/ai-chat",
      color: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/25",
      description: "24/7 text support",
      bgColor: "bg-blue-50"
    },
    {
      title: "AI Call",
      icon: Phone,
      href: "/ai-call",
      color: "from-green-500 to-green-600",
      shadowColor: "shadow-green-500/25",
      description: "Voice conversations",
      bgColor: "bg-green-50"
    },
    {
      title: "Exercises",
      icon: Target,
      href: "/exercises",
      color: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/25",
      description: "Guided activities",
      bgColor: "bg-purple-50"
    },
    {
      title: "Brain Training",
      icon: Brain,
      href: "/brain-training",
      color: "from-orange-500 to-orange-600",
      shadowColor: "shadow-orange-500/25",
      description: "Cognitive games",
      bgColor: "bg-orange-50"
    },
    {
      title: "Sleep Stories",
      icon: Moon,
      href: "/sleep-stories",
      color: "from-indigo-500 to-indigo-600",
      shadowColor: "shadow-indigo-500/25",
      description: "Bedtime stories",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Audiobooks",
      icon: BookOpen,
      href: "/audiobooks",
      color: "from-red-500 to-red-600",
      shadowColor: "shadow-red-500/25",
      description: "Wellness library",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <PageTransition>
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced blurred overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/50 to-indigo-900/40 backdrop-blur-md"></div>
        
        <div className="relative z-10">
          {/* Enhanced Header */}
          <header className="bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-lg border-b border-white/30 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                        Good morning, Sarah! ✨
                      </h1>
                      <p className="text-sm text-gray-600 font-medium">Ready to continue your wellness journey?</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Link to="/programs">
                    <Button variant="outline" size="sm" className="bg-white/90 text-gray-900 border-gray-300 hover:bg-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Programs
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="outline" size="sm" className="bg-white/90 text-gray-900 border-gray-300 hover:bg-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link to="/manage-payments">
                    <Button variant="outline" size="sm" className="bg-white/90 text-gray-900 border-gray-300 hover:bg-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Billing
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button variant="outline" size="sm" className="bg-white/90 text-gray-900 border-gray-300 hover:bg-white shadow-lg hover:scale-105 transition-all duration-300">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Enhanced Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                  <CardTitle className="text-sm font-bold text-gray-900">Today's Progress</CardTitle>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{todayProgress}%</div>
                  <div className="relative mb-3">
                    <Progress value={todayProgress} className="h-3 bg-gray-200" />
                    <div 
                      className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 shadow-md"
                      style={{ width: `${todayProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">3 of 5 activities completed</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => setShowStreakCalendar(true)}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                  <CardTitle className="text-sm font-bold text-gray-900">Weekly Streak</CardTitle>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{weeklyStreak} days</div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < weeklyStreak ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">Click to view calendar</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                  <CardTitle className="text-sm font-bold text-gray-900">Current Mood</CardTitle>
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{currentMood}</div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-700 font-medium">Feeling positive</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">Logged 2 hours ago</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Quick Actions */}
            <Card className="mb-8 bg-gradient-to-br from-white/95 to-indigo-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-gray-900 text-2xl font-bold flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.href}>
                      <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl ${action.bgColor} border-2 border-white/50 hover:border-white/80 p-6`}>
                        {/* Background gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center shadow-xl ${action.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                            <action.icon className="w-8 h-8 text-white" />
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 font-medium">
                              {action.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            <Play className="w-4 h-4" />
                            <span>Start Now</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${action.color} opacity-20 rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                        <div className={`absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br ${action.color} opacity-15 rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Content Grid with enhanced styling */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="animate-slide-in-left">
                <MoodTracker />
              </div>
              <div className="animate-slide-in-right">
                <Goals />
              </div>
            </div>

            {/* Achievements with enhanced styling */}
            <div className="mb-8 animate-fade-in-up">
              <Achievements />
            </div>

            {/* Enhanced Today's Recommendations */}
            <Card className="bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 animate-scale-in overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-gray-900 font-bold text-2xl flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span>Recommended for You Today</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-green-50/90 to-blue-50/90 backdrop-blur-sm border-2 border-green-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div>
                      <h3 className="text-gray-900 font-bold text-lg">Morning Breathing Exercise</h3>
                      <p className="text-sm text-gray-700 font-medium">5 minutes • Reduce anxiety</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold px-6">
                      Start
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-purple-50/90 to-pink-50/90 backdrop-blur-sm border-2 border-purple-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div>
                      <h3 className="text-gray-900 font-bold text-lg">Mindful Check-in</h3>
                      <p className="text-sm text-gray-700 font-medium">10 minutes • Emotional awareness</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold px-6">
                      Start
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-indigo-50/90 to-blue-50/90 backdrop-blur-sm border-2 border-indigo-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div>
                      <h3 className="text-gray-900 font-bold text-lg">Sleep Meditation</h3>
                      <p className="text-sm text-gray-700 font-medium">15 minutes • Better sleep</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold px-6">
                      Start
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Weekly Streak Calendar Modal */}
      <WeeklyStreakCalendar 
        isOpen={showStreakCalendar} 
        onClose={() => setShowStreakCalendar(false)} 
      />
    </PageTransition>
  );
};

export default Dashboard;