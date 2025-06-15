import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff, User, Bot, ArrowLeft, Sparkles, Heart, Zap, Settings, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI mental health companion. How are you feeling today? I'm here to listen and support you through whatever you're experiencing. 💙",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. It's completely normal to experience these emotions. Would you like to try a breathing exercise together, or would you prefer to talk more about what's on your mind?",
        "Thank you for sharing that with me. Your feelings are valid, and I'm here to support you. What would help you feel more comfortable right now?",
        "I hear you, and I want you to know that you're not alone in this. Many people experience similar feelings. Let's explore some coping strategies that might help.",
        "That sounds challenging. You're being very brave by reaching out and talking about this. What has helped you feel better in similar situations before?"
      ];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const quickResponses = [
    "I'm feeling anxious",
    "I need help sleeping",
    "I'm stressed about work",
    "I feel overwhelmed"
  ];

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-blue-900/40 to-teal-900/50 backdrop-blur-md"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-white/95 via-green-50/95 to-blue-50/95 backdrop-blur-lg border-b border-white/30 shadow-2xl">
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
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">AI Chat Companion</h1>
                    <p className="text-sm text-gray-600 font-medium">Always here to listen and support</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-700 font-medium">Online & Ready</span>
                </div>
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

        {/* Enhanced Chat Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card className="h-[calc(100vh-200px)] flex flex-col bg-gradient-to-br from-white/95 via-green-50/30 to-blue-50/30 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
            {/* Chat Header */}
            <CardHeader className="border-b border-white/50 bg-gradient-to-r from-white/90 to-green-50/90 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-full shadow-lg">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold">Your Wellness Companion</span>
                    <p className="text-sm text-gray-600 font-medium">Trained in CBT, DBT, and mindfulness techniques</p>
                  </div>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
                  <span className="text-sm font-bold text-green-700">AI Powered</span>
                </div>
              </div>
            </CardHeader>
            
            {/* Enhanced Messages */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/90 to-white/95">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                        : 'bg-gradient-to-br from-green-500 to-blue-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-4 shadow-lg backdrop-blur-sm border-2 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-300/50' 
                        : 'bg-white/95 text-gray-900 border-green-200/50'
                    }`}>
                      <p className="text-sm font-medium leading-relaxed">{message.text}</p>
                      <span className="text-xs opacity-70 mt-2 block font-medium">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/95 rounded-2xl p-4 shadow-lg backdrop-blur-sm border-2 border-green-200/50">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Quick Response Buttons */}
            {messages.length === 1 && (
              <div className="px-6 py-3 border-t border-white/50 bg-gradient-to-r from-white/90 to-green-50/90">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick responses:</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(response)}
                      className="bg-white/80 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300 font-medium"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Input Area */}
            <div className="border-t border-white/50 p-6 bg-gradient-to-r from-white/90 to-green-50/90 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Share what's on your mind... I'm here to listen 💙"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-white/90 border-2 border-green-200 text-gray-900 placeholder-gray-500 shadow-md rounded-2xl h-12 pr-12 font-medium focus:border-green-400 focus:ring-4 focus:ring-green-200"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Zap className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleListening}
                  className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                      : 'bg-white/90 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputMessage.trim()}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Helpful Tips */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600 font-medium">
                  💡 Tip: Be open and honest about your feelings. I'm here to provide support, not judgment.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChat;