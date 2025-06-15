import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Settings, Target, Calendar, Star, Trophy, Zap, Heart, Brain, Moon, ArrowLeft, Sparkles, Crown, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    age: '28',
    primaryGoal: 'anxiety',
    interests: ['mindfulness', 'sleep', 'stress-management'],
    dailyFocus: 'Anxiety Management',
    notes: 'Prefer morning exercises and calming voice tones.'
  });

  const goalOptions = [
    { value: 'anxiety', label: 'Reduce Anxiety' },
    { value: 'sleep', label: 'Improve Sleep' },
    { value: 'stress', label: 'Manage Stress' },
    { value: 'confidence', label: 'Build Confidence' },
    { value: 'energy', label: 'Increase Energy' },
    { value: 'focus', label: 'Improve Focus' }
  ];

  const interestOptions = [
    'mindfulness', 'meditation', 'breathing', 'sleep', 'stress-management',
    'cbt', 'self-care', 'energy', 'social-skills', 'trauma-healing'
  ];

  const handleSave = () => {
    // Save profile logic here
    console.log('Profile saved:', profile);
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved.',
      duration: 3000,
    });
  };

  const stats = [
    { label: 'Days Active', value: '45', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Points', value: '1,250', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Achievements', value: '12', icon: Trophy, color: 'from-purple-500 to-purple-600' },
    { label: 'Streak', value: '7', icon: Zap, color: 'from-green-500 to-green-600' }
  ];

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50 backdrop-blur-md"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-white/95 via-indigo-50/95 to-purple-50/95 backdrop-blur-lg border-b border-white/30 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="bg-white/90 text-gray-900 border-gray-300 hover:bg-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profile Settings</h1>
                    <p className="text-sm text-gray-600 font-medium">Customize your wellness experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Profile Overview */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-gradient-to-br from-white/95 to-indigo-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -translate-y-12 translate-x-12"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ring-4 ring-white/50">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{profile.name}</CardTitle>
                  <p className="text-gray-600 font-medium">{profile.email}</p>
                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold mt-2">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                        <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Current Program</Label>
                      <p className="text-lg font-bold text-indigo-600">Stress & Anxiety Management</p>
                      <div className="relative mt-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: '65%' }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">65% Complete</p>
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Member Since</Label>
                      <p className="font-semibold text-gray-900">January 2024</p>
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Current Streak</Label>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-bold text-green-600">7 days</p>
                        <Zap className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Profile Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full -translate-y-12 translate-x-12"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="mt-2 bg-white/90 border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 rounded-xl shadow-md"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age" className="text-sm font-bold text-gray-700">Age</Label>
                      <Input
                        id="age"
                        value={profile.age}
                        onChange={(e) => setProfile({...profile, age: e.target.value})}
                        className="mt-2 bg-white/90 border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 rounded-xl shadow-md"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-bold text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="mt-2 bg-white/90 border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 rounded-xl shadow-md"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Wellness Goals */}
              <Card className="bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full -translate-y-12 translate-x-12"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <span>Wellness Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div>
                    <Label htmlFor="primaryGoal" className="text-sm font-bold text-gray-700">Primary Goal</Label>
                    <Select value={profile.primaryGoal} onValueChange={(value) => setProfile({...profile, primaryGoal: value})}>
                      <SelectTrigger className="mt-2 bg-white/90 border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl shadow-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {goalOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="dailyFocus" className="text-sm font-bold text-gray-700">Daily Focus</Label>
                    <Input
                      id="dailyFocus"
                      value={profile.dailyFocus}
                      onChange={(e) => setProfile({...profile, dailyFocus: e.target.value})}
                      placeholder="e.g., Anxiety, Sleep, Energy"
                      className="mt-2 bg-white/90 border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl shadow-md"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Interests</Label>
                    <div className="flex flex-wrap gap-3">
                      {interestOptions.map(interest => (
                        <Badge
                          key={interest}
                          variant={profile.interests.includes(interest) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 font-semibold px-4 py-2 ${
                            profile.interests.includes(interest)
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                              : 'border-2 border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50'
                          }`}
                          onClick={() => {
                            const newInterests = profile.interests.includes(interest)
                              ? profile.interests.filter(i => i !== interest)
                              : [...profile.interests, interest];
                            setProfile({...profile, interests: newInterests});
                          }}
                        >
                          {interest.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full -translate-y-12 translate-x-12"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <span>Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div>
                    <Label htmlFor="notes" className="text-sm font-bold text-gray-700">Personal Notes</Label>
                    <Textarea
                      id="notes"
                      value={profile.notes}
                      onChange={(e) => setProfile({...profile, notes: e.target.value})}
                      placeholder="Any preferences, triggers to avoid, or helpful notes for your AI companion..."
                      rows={4}
                      className="mt-2 bg-white/90 border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-200 rounded-xl shadow-md"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Save Button */}
              <div className="flex justify-end">
                <Button 
                  onClick={handleSave} 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;