import React from 'react';
import { MessageCircle, Phone, Moon, Brain, Heart, BarChart, Sparkles, Star, ArrowRight, Zap, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesShowcase = () => {
  const services = [
    {
      icon: MessageCircle,
      title: "AI Chat Therapy",
      description: "24/7 conversational support with empathetic AI trained in therapeutic techniques",
      features: ["CBT & DBT approaches", "Mood tracking", "Crisis detection"],
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      color: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Phone,
      title: "AI Voice Calls",
      description: "Human-like conversations with real-time speech processing and therapeutic guidance",
      features: ["Natural voice interaction", "Low-latency responses", "Personalized sessions"],
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Moon,
      title: "Sleep & Relaxation",
      description: "Curated audio library with meditations, bedtime stories, and calming soundscapes",
      features: ["Guided meditations", "Sleep stories", "Ambient soundscapes"],
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop",
      color: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50"
    },
    {
      icon: Brain,
      title: "Brain Training",
      description: "Cognitive exercises and puzzles designed to improve focus, memory, and mental agility",
      features: ["Progressive difficulty", "Performance tracking", "Daily challenges"],
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
      color: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Heart,
      title: "Therapeutic Exercises",
      description: "Evidence-based activities for anxiety, depression, trauma, and personal growth",
      features: ["Breathing exercises", "Mindfulness practices", "CBT worksheets"],
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      color: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-50"
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Comprehensive insights into your mental health journey with detailed analytics",
      features: ["Mood charts", "Activity history", "Goal tracking"],
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      color: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50"
    }
  ];

  return (
    <section 
      className="py-20 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=1200&h=800&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50">
            <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
            <span className="text-sm font-bold text-green-700">Comprehensive Mental Wellness Services</span>
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Everything You Need for{' '}
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h2>
          
          <p className="text-xl text-gray-800 max-w-4xl mx-auto font-medium leading-relaxed">
            Our comprehensive platform combines cutting-edge AI technology with evidence-based therapeutic approaches 
            to provide personalized mental health support that adapts to your unique needs.
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-gray-700">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-gray-700">Evidence-Based</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-bold text-gray-700">24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className={`group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${service.bgGradient} border-0`}>
              {/* Decorative elements */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-10 rounded-full -translate-y-12 translate-x-12`}></div>
              <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br ${service.color} opacity-5 rounded-full translate-y-8 -translate-x-8`}></div>
              
              {/* Service Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className={`absolute top-4 left-4 w-14 h-14 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8 space-y-6 relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
                
                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full shadow-md`}></div>
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Link to="/signup">
                  <Button className={`w-full bg-gradient-to-r ${service.color} text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-bold rounded-xl py-3`}>
                    <span className="flex items-center space-x-2">
                      <span>Try Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200/50">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-gray-900 mb-2 font-bold text-2xl">
                Ready to Transform Your Mental Health?
              </h3>
              <p className="text-gray-700 font-medium text-lg">
                Join thousands finding peace, clarity, and growth with MindMate AI
              </p>
            </div>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;