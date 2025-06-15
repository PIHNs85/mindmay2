import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Phone, Moon, User, Sparkles, Star, Zap, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Enhanced background gradient with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-blue-50/60 to-purple-50/80"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Enhanced */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50">
                <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
                <span className="text-sm font-bold text-green-700">Transform Your Mental Health Today</span>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your AI Companion for{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Mental Wellness
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full opacity-60"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                Transform your mental health journey with personalized AI conversations, 
                therapeutic exercises, brain training, and sleep aids — all designed to support your wellbeing.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="group">
                <Button className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700 text-white text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 font-bold border-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <Zap className="w-6 h-6 group-hover:animate-pulse" />
                    <span>Start Free Now</span>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/learn-more">
                <Button variant="outline" className="group relative overflow-hidden bg-white/90 backdrop-blur-sm text-gray-900 text-lg px-10 py-6 rounded-2xl border-3 border-gray-300 hover:border-green-400 hover:bg-green-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <Heart className="w-5 h-5 group-hover:text-green-600 transition-colors duration-300" />
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </Link>
            </div>

            {/* Enhanced Social Proof */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center border-3 border-white shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">1,300+</span>
                  <p className="text-sm text-gray-600 font-medium">happy users</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
                  ))}
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">4.8/5</span>
                  <p className="text-sm text-gray-600 font-medium">rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Feature Preview */}
          <div className="relative lg:pl-8">
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Daily Wellness Hub</h3>
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-4 py-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-green-700">Live & Ready</span>
                    </div>
                  </div>
                  
                  {/* Enhanced Feature Icons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/signup" className="group">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-green-500/25">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">AI Chat</p>
                          <p className="text-sm text-green-600 font-medium">24/7 Support</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link to="/signup" className="group">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">AI Calls</p>
                          <p className="text-sm text-blue-600 font-medium">Voice Support</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link to="/signup" className="group">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25">
                          <Moon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Sleep Aid</p>
                          <p className="text-sm text-purple-600 font-medium">Rest Better</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link to="/signup" className="group">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Therapy</p>
                          <p className="text-sm text-orange-600 font-medium">Guided Exercises</p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Enhanced Progress Indicator */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-gray-900">Today's Progress</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-bold">3/5 completed</span>
                        <Sparkles className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 h-3 rounded-full transition-all duration-1000 animate-pulse" style={{ width: '60%' }}></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent h-3 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-bounce shadow-xl" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;