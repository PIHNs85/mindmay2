import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Smile, Meh, Frown, CloudRain, Sparkles, TrendingUp, Star } from 'lucide-react';

interface MoodEntry {
  mood: string;
  intensity: number;
  timestamp: Date;
  notes?: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([
    { mood: 'happy', intensity: 7, timestamp: new Date(Date.now() - 86400000) },
    { mood: 'calm', intensity: 8, timestamp: new Date(Date.now() - 172800000) },
    { mood: 'anxious', intensity: 4, timestamp: new Date(Date.now() - 259200000) }
  ]);

  const moods = [
    { name: 'happy', icon: Smile, color: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-300' },
    { name: 'calm', icon: Heart, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-300' },
    { name: 'neutral', icon: Meh, color: 'from-gray-400 to-slate-500', bgColor: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-300' },
    { name: 'sad', icon: Frown, color: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-300' },
    { name: 'anxious', icon: CloudRain, color: 'from-purple-400 to-violet-500', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-300' }
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        intensity,
        timestamp: new Date(),
        notes: notes || undefined
      };
      setRecentEntries([newEntry, ...recentEntries.slice(0, 6)]);
      setSelectedMood('');
      setIntensity(5);
      setNotes('');
    }
  };

  const getMoodData = (moodName: string) => {
    return moods.find(m => m.name === moodName) || moods[2];
  };

  const averageIntensity = recentEntries.length > 0 
    ? recentEntries.reduce((sum, entry) => sum + entry.intensity, 0) / recentEntries.length 
    : 0;

  return (
    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>
      
      <CardHeader className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="flex items-center space-x-3 text-xl font-bold">
          <div className="p-2 bg-white/20 rounded-full shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="drop-shadow-lg">Daily Mood Check-in</span>
        </CardTitle>
        
        {/* Mood insights */}
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white drop-shadow-md">
              Avg: {averageIntensity.toFixed(1)}/10
            </span>
          </div>
          <div className="text-sm text-white/90 font-medium drop-shadow-md">
            {recentEntries.length} entries this week
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 relative z-10 p-8">
        <div>
          <h3 className="font-bold mb-6 text-gray-900 text-xl text-center">How are you feeling today?</h3>
          <div className="grid grid-cols-5 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`group relative p-5 rounded-2xl border-3 transition-all duration-300 transform hover:scale-110 ${
                  selectedMood === mood.name
                    ? `${mood.borderColor} shadow-2xl scale-110 ring-4 ring-opacity-50`
                    : `border-gray-200 hover:${mood.borderColor} shadow-lg hover:shadow-xl`
                }`}
                style={{
                  background: selectedMood === mood.name 
                    ? `linear-gradient(135deg, ${mood.color.replace('from-', '').replace(' to-', ', ')})` 
                    : 'white',
                }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <mood.icon className={`w-8 h-8 transition-colors duration-300 ${
                    selectedMood === mood.name ? 'text-white drop-shadow-md' : mood.textColor
                  }`} />
                  <span className={`text-sm font-bold capitalize transition-colors duration-300 ${
                    selectedMood === mood.name ? 'text-white drop-shadow-md' : mood.textColor
                  }`}>
                    {mood.name}
                  </span>
                </div>
                
                {selectedMood === mood.name && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {selectedMood && (
          <div className="space-y-6 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-200/50 shadow-xl">
            <div>
              <label className="block text-lg font-bold mb-4 text-gray-900">
                Intensity Level: <span className="text-blue-600">{intensity}/10</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full appearance-none cursor-pointer slider shadow-lg"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${intensity * 10}%, #e5e7eb ${intensity * 10}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-bold mb-3 text-gray-900">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's contributing to this mood?"
                className="w-full p-4 border-2 border-blue-200 rounded-xl resize-none h-24 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 shadow-md"
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-5 h-5 mr-2" />
              Save Mood Entry
            </Button>
          </div>
        )}

        <div>
          <h3 className="font-bold mb-6 text-gray-900 text-xl">Recent Entries</h3>
          <div className="space-y-4">
            {recentEntries.slice(0, 3).map((entry, index) => {
              const moodData = getMoodData(entry.mood);
              return (
                <div key={index} className={`${moodData.bgColor} rounded-xl p-5 border-2 ${moodData.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${moodData.color} shadow-md`}></div>
                      <Badge 
                        variant="outline" 
                        className={`capitalize font-bold border-2 ${moodData.borderColor} ${moodData.textColor} ${moodData.bgColor}`}
                      >
                        {entry.mood}
                      </Badge>
                      <span className={`text-sm font-bold ${moodData.textColor}`}>
                        Intensity: {entry.intensity}/10
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {entry.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;