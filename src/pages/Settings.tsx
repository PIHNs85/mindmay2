import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  ArrowLeft, 
  Bell, 
  Moon, 
  Volume2, 
  Shield, 
  Smartphone, 
  Globe, 
  Palette,
  Save,
  Sparkles,
  Heart,
  Brain,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    reminderNotifications: true,
    weeklyReports: true,
    
    // Privacy & Security
    dataSharing: false,
    analyticsOptIn: true,
    biometricAuth: false,
    
    // App Preferences
    theme: 'auto',
    language: 'en',
    voiceSpeed: [1.0],
    autoSave: true,
    
    // Wellness Settings
    dailyReminders: true,
    moodTrackingReminders: true,
    exerciseReminders: true,
    sleepReminders: true,
    reminderTime: '09:00',
    
    // AI Preferences
    aiPersonality: 'empathetic',
    conversationStyle: 'supportive',
    responseLength: 'medium'
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
    toast.success('Settings saved successfully!');
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

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
                    <SettingsIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Settings</h1>
                    <p className="text-sm text-gray-600 font-medium">Customize your MindMate experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Notifications Settings */}
            <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full -translate-y-12 translate-x-12"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Push Notifications</Label>
                      <p className="text-xs text-gray-600">Receive notifications on your device</p>
                    </div>
                    <Switch 
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Email Notifications</Label>
                      <p className="text-xs text-gray-600">Get updates via email</p>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Daily Reminders</Label>
                      <p className="text-xs text-gray-600">Gentle reminders for wellness activities</p>
                    </div>
                    <Switch 
                      checked={settings.dailyReminders}
                      onCheckedChange={(checked) => updateSetting('dailyReminders', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Weekly Reports</Label>
                      <p className="text-xs text-gray-600">Summary of your progress</p>
                    </div>
                    <Switch 
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                    />
                  </div>
                </div>
                
                {settings.dailyReminders && (
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Reminder Time</Label>
                    <Input
                      type="time"
                      value={settings.reminderTime}
                      onChange={(e) => updateSetting('reminderTime', e.target.value)}
                      className="bg-white border-blue-200 focus:border-blue-400"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full -translate-y-12 translate-x-12"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Data Sharing</Label>
                      <p className="text-xs text-gray-600">Share anonymized data for research</p>
                    </div>
                    <Switch 
                      checked={settings.dataSharing}
                      onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Analytics</Label>
                      <p className="text-xs text-gray-600">Help improve the app with usage data</p>
                    </div>
                    <Switch 
                      checked={settings.analyticsOptIn}
                      onCheckedChange={(checked) => updateSetting('analyticsOptIn', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Biometric Authentication</Label>
                      <p className="text-xs text-gray-600">Use fingerprint or face ID</p>
                    </div>
                    <Switch 
                      checked={settings.biometricAuth}
                      onCheckedChange={(checked) => updateSetting('biometricAuth', checked)}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-700">Your data is secure</span>
                  </div>
                  <p className="text-xs text-green-600">All conversations are encrypted and never shared with third parties.</p>
                </div>
              </CardContent>
            </Card>

            {/* App Preferences */}
            <Card className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full -translate-y-12 translate-x-12"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <span>App Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className="p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                      <SelectTrigger className="bg-white border-purple-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                      <SelectTrigger className="bg-white border-purple-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">
                      Voice Speed: {settings.voiceSpeed[0]}x
                    </Label>
                    <Slider
                      value={settings.voiceSpeed}
                      onValueChange={(value) => updateSetting('voiceSpeed', value)}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <div>
                      <Label className="text-sm font-bold text-gray-700">Auto-save Progress</Label>
                      <p className="text-xs text-gray-600">Automatically save your progress</p>
                    </div>
                    <Switch 
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Preferences */}
            <Card className="bg-gradient-to-br from-white/95 to-orange-50/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full -translate-y-12 translate-x-12"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <span>AI Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className="p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">AI Personality</Label>
                    <Select value={settings.aiPersonality} onValueChange={(value) => updateSetting('aiPersonality', value)}>
                      <SelectTrigger className="bg-white border-orange-200 focus:border-orange-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empathetic">Empathetic & Caring</SelectItem>
                        <SelectItem value="professional">Professional & Clinical</SelectItem>
                        <SelectItem value="friendly">Friendly & Casual</SelectItem>
                        <SelectItem value="wise">Wise & Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Conversation Style</Label>
                    <Select value={settings.conversationStyle} onValueChange={(value) => updateSetting('conversationStyle', value)}>
                      <SelectTrigger className="bg-white border-orange-200 focus:border-orange-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supportive">Supportive & Encouraging</SelectItem>
                        <SelectItem value="analytical">Analytical & Solution-focused</SelectItem>
                        <SelectItem value="exploratory">Exploratory & Questioning</SelectItem>
                        <SelectItem value="directive">Directive & Goal-oriented</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-white/80 rounded-xl border border-white/50 shadow-md">
                    <Label className="text-sm font-bold text-gray-700 mb-3 block">Response Length</Label>
                    <Select value={settings.responseLength} onValueChange={(value) => updateSetting('responseLength', value)}>
                      <SelectTrigger className="bg-white border-orange-200 focus:border-orange-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brief">Brief & Concise</SelectItem>
                        <SelectItem value="medium">Medium Length</SelectItem>
                        <SelectItem value="detailed">Detailed & Thorough</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-bold text-orange-700">AI Learning</span>
                  </div>
                  <p className="text-xs text-orange-600">Your AI companion learns from your preferences to provide better support over time.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleSave} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-12 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
            >
              <Save className="w-6 h-6 mr-3" />
              Save All Settings
              <Sparkles className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;