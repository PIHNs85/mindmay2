import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle, Moon, Headphones, Heart, Shield, Sparkles, Star, Zap, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: MessageCircle,
      title: "AI Conversation Therapy",
      description: "Engage in meaningful conversations with our AI therapist through text or voice calls. Get personalized guidance anytime you need support.",
      color: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Brain,
      title: "Brain Training Games",
      description: "Enhance cognitive function with scientifically-designed puzzles and games that improve memory, focus, and mental agility.",
      color: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Moon,
      title: "Sleep & Relaxation",
      description: "Access our library of calming audiobooks, bedtime stories, and guided meditations to improve your sleep quality.",
      color: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50"
    },
    {
      icon: Headphones,
      title: "Guided Meditation",
      description: "Practice mindfulness with our extensive collection of guided meditations for stress relief, anxiety management, and emotional balance.",
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Heart,
      title: "Wellness Assessment",
      description: "Take comprehensive mental health assessments to understand your current state and receive personalized program recommendations.",
      color: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-50"
    },
    {
      icon: Shield,
      title: "Crisis Support",
      description: "24/7 crisis detection and support with immediate access to emergency resources and professional help when needed.",
      color: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50">
                <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
                <span className="text-sm font-bold text-green-700">Comprehensive Mental Health Services</span>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Our Mental{' '}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Wellness Services
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
                Comprehensive AI-powered mental health support designed to help you thrive. 
                Each service is backed by evidence-based therapeutic approaches.
              </p>
            </div>

            {/* Enhanced Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <Card key={index} className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl bg-gradient-to-br ${service.bgGradient} border-0`}>
                  {/* Decorative elements */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-full -translate-y-10 translate-x-10`}></div>
                  <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br ${service.color} opacity-5 rounded-full translate-y-8 -translate-x-8`}></div>
                  
                  <CardHeader className="text-center relative z-10 pb-4">
                    <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center relative z-10 space-y-4">
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Button className={`bg-gradient-to-r ${service.color} text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-bold rounded-xl`}>
                      <span className="flex items-center space-x-2">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Evidence-Based Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50 mb-6">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-green-700">Evidence-Based Approaches</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Scientifically Proven Therapeutic Methods
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
                  Our AI is trained on proven therapeutic methods including Cognitive Behavioral Therapy (CBT), 
                  Dialectical Behavior Therapy (DBT), and Mindfulness-Based Stress Reduction (MBSR).
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">CBT Techniques</h3>
                    <p className="text-gray-700 font-medium">Restructure negative thought patterns with proven cognitive methods</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">DBT Skills</h3>
                    <p className="text-gray-700 font-medium">Master emotional regulation and distress tolerance techniques</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">MBSR Practice</h3>
                    <p className="text-gray-700 font-medium">Develop mindfulness and present-moment awareness skills</p>
                  </div>
                </div>
                
                {/* CTA Section */}
                <div className="mt-12 text-center">
                  <Button className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center space-x-3">
                      <Sparkles className="w-6 h-6" />
                      <span>Start Your Wellness Journey</span>
                      <ArrowRight className="w-6 h-6" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Services;