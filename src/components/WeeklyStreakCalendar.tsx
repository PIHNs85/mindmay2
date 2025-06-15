import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Flame, Star, X } from 'lucide-react';

interface WeeklyStreakCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const WeeklyStreakCalendar = ({ isOpen, onClose }: WeeklyStreakCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for demonstration
  const streakData = {
    currentStreak: 7,
    longestStreak: 15,
    totalDays: 45,
    streakDays: [
      '2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', 
      '2024-01-19', '2024-01-20', '2024-01-21', // Current 7-day streak
      '2024-01-10', '2024-01-11', '2024-01-12', // Previous streak
      '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08'
    ],
    missedDays: ['2024-01-09', '2024-01-13', '2024-01-14']
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayStatus = (date: Date | null) => {
    if (!date) return 'empty';
    
    const dateString = formatDateString(date);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isFuture = date > today;
    
    if (isFuture) return 'future';
    if (isToday) return 'today';
    if (streakData.streakDays.includes(dateString)) return 'streak';
    if (streakData.missedDays.includes(dateString)) return 'missed';
    return 'inactive';
  };

  const getDayClassName = (status: string) => {
    switch (status) {
      case 'streak':
        return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg transform scale-110';
      case 'missed':
        return 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-md';
      case 'today':
        return 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg ring-4 ring-blue-300 transform scale-110';
      case 'future':
        return 'bg-gray-100 text-gray-400 cursor-not-allowed';
      case 'inactive':
        return 'bg-gray-200 text-gray-600 hover:bg-gray-300';
      default:
        return '';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full shadow-lg">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold drop-shadow-lg">Weekly Streak Calendar</CardTitle>
                <p className="text-green-100 font-medium">Track your wellness journey</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Streak Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/50 shadow-md">
              <div className="text-2xl font-bold text-green-600">{streakData.currentStreak}</div>
              <div className="text-sm text-green-700 font-medium">Current Streak</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 shadow-md">
              <div className="text-2xl font-bold text-blue-600">{streakData.longestStreak}</div>
              <div className="text-sm text-blue-700 font-medium">Longest Streak</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 shadow-md">
              <div className="text-2xl font-bold text-purple-600">{streakData.totalDays}</div>
              <div className="text-sm text-purple-700 font-medium">Total Active Days</div>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <h3 className="text-xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-bold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((date, index) => {
                const status = getDayStatus(date);
                return (
                  <div
                    key={index}
                    className={`
                      aspect-square flex items-center justify-center text-sm font-bold rounded-lg transition-all duration-300
                      ${status === 'empty' ? '' : getDayClassName(status)}
                    `}
                  >
                    {date && (
                      <div className="relative">
                        {date.getDate()}
                        {status === 'streak' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3">
                            <Star className="w-3 h-3 text-yellow-300 fill-current" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded shadow-md"></div>
              <span className="text-gray-700 font-medium">Streak Day</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-500 rounded shadow-md"></div>
              <span className="text-gray-700 font-medium">Missed Day</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded shadow-md"></div>
              <span className="text-gray-700 font-medium">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded shadow-md"></div>
              <span className="text-gray-700 font-medium">Inactive</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyStreakCalendar;