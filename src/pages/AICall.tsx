import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, ArrowLeft, Heart, Sparkles, Zap, Settings, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const AICall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callQuality, setCallQuality] = useState('excellent');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsCallActive(true);
    }, 3000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const getQualityColor = () => {
    switch (callQuality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      default: return 'text-red-600';
    }
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/80 transition-all duration-300">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    {isCallActive && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Voice Call</h1>
                    <p className="text-sm text-gray-600 font-medium">Natural voice conversations</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {isCallActive && (
                  <div className={`flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md`}>
                    <div className={`w-2 h-2 rounded-full ${callQuality === 'excellent' ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                    <span className={`text-sm font-medium ${getQualityColor()}`}>
                      {callQuality} quality
                    </span>
                  </div>
                )}
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-white/80">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-white/80">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Call Interface */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center bg-gradient-to-br from-white/95 via-indigo-50/30 to-purple-50/30 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full translate-y-12 -translate-x-12"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900 font-bold">MindMate AI Assistant</CardTitle>
                  <p className="text-gray-600 font-medium">Your compassionate voice companion</p>
                </div>
              </div>
              
              {isCallActive && (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-indigo-600">{formatDuration(callDuration)}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Call in progress</span>
                  </div>
                </div>
              )}
            </CardHeader>
            
            <CardContent className="space-y-8 relative z-10">
              {/* Enhanced Avatar */}
              <div className="relative mx-auto">
                <div className={`w-40 h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/50 transition-all duration-500 ${
                  isCallActive ? 'animate-pulse scale-110' : ''
                }`}>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-indigo-600">AI</span>
                  </div>
                </div>
                
                {/* Animated rings for active call */}
                {isCallActive && (
                  <>
                    <div className="absolute inset-0 w-40 h-40 border-4 border-indigo-400 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 w-40 h-40 border-4 border-purple-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
              </div>

              {/* Enhanced Status */}
              <div className="space-y-4">
                {isConnecting && (
                  <div className="space-y-4">
                    <p className="text-xl text-gray-800 font-bold">Connecting...</p>
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Establishing secure connection</p>
                  </div>
                )}
                
                {isCallActive && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xl text-green-700 font-bold">Call Active</p>
                    </div>
                    
                    {/* Audio visualization */}
                    <div className="flex justify-center space-x-2">
                      <div className="w-2 h-10 bg-gradient-to-t from-indigo-500 to-purple-600 rounded animate-pulse shadow-md"></div>
                      <div className="w-2 h-8 bg-gradient-to-t from-indigo-400 to-purple-500 rounded animate-pulse shadow-md" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-12 bg-gradient-to-t from-indigo-500 to-purple-600 rounded animate-pulse shadow-md" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-6 bg-gradient-to-t from-indigo-400 to-purple-500 rounded animate-pulse shadow-md" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-2 h-9 bg-gradient-to-t from-indigo-500 to-purple-600 rounded animate-pulse shadow-md" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <p className="text-sm text-gray-700 font-medium">
                        "I'm here to listen and support you. Feel free to share whatever is on your mind."
                      </p>
                    </div>
                  </div>
                )}

                {!isCallActive && !isConnecting && (
                  <div className="space-y-4">
                    <p className="text-xl text-gray-800 font-bold">Ready to connect</p>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200/50">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Zap className="w-5 h-5 text-indigo-600" />
                        <span className="font-bold text-indigo-700">AI-Powered Voice Support</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        Experience natural, empathetic conversations with advanced AI trained in therapeutic techniques
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Controls */}
              <div className="flex justify-center items-center space-x-6">
                {!isCallActive && !isConnecting && (
                  <Button
                    onClick={handleStartCall}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl hover:scale-110 transition-all duration-300 group"
                  >
                    <Phone className="w-8 h-8 text-white group-hover:animate-pulse" />
                  </Button>
                )}

                {isCallActive && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsMuted(!isMuted)}
                      className={`w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${
                        isMuted 
                          ? 'bg-red-100 border-red-300 text-red-600 hover:bg-red-200' 
                          : 'bg-white/90 border-gray-300 text-gray-700 hover:bg-white'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </Button>
                    
                    <Button
                      onClick={handleEndCall}
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-2xl hover:scale-110 transition-all duration-300 group"
                    >
                      <PhoneOff className="w-8 h-8 text-white group-hover:animate-pulse" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                      className={`w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${
                        !isSpeakerOn 
                          ? 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200' 
                          : 'bg-white/90 border-gray-300 text-gray-700 hover:bg-white'
                      }`}
                    >
                      {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                    </Button>
                  </>
                )}
              </div>

              {/* Enhanced Tips */}
              {!isCallActive && !isConnecting && (
                <div className="bg-gradient-to-r from-white/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200/50 shadow-lg">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-indigo-700">How it works</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">1</span>
                      </div>
                      <p className="text-gray-700 font-medium">Speak naturally about your feelings and thoughts</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">2</span>
                      </div>
                      <p className="text-gray-700 font-medium">AI listens with empathy and provides supportive responses</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">3</span>
                      </div>
                      <p className="text-gray-700 font-medium">End the call anytime you feel ready</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AICall;