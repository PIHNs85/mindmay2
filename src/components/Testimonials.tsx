import React from 'react';
import { Star, Quote, Heart, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Professional",
      content: "MindMate AI has been a game-changer for my anxiety management. The AI calls feel so natural and supportive, like talking to a real therapist.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Michael Torres",
      role: "College Student",
      content: "The brain training exercises helped me improve my focus during exams. The sleep stories are amazing too - I actually look forward to bedtime now!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Emily Rodriguez",
      role: "Working Parent",
      content: "As a busy mom, having 24/7 access to mental health support has been incredible. The therapeutic exercises are perfect for my 5-minute breaks.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    {
      name: "David Kim",
      role: "Software Engineer",
      content: "I was skeptical about AI therapy at first, but the personalization and empathy of MindMate AI genuinely surprised me. It's helped me process work stress.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Lisa Johnson",
      role: "Healthcare Worker",
      content: "After long shifts, the relaxation features help me decompress. The progress tracking shows how much I've grown in managing my mental health.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Alex Thompson",
      role: "Freelance Designer",
      content: "The combination of chat and voice options is perfect. Sometimes I need quick text support, other times a longer voice conversation helps more.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50">
            <Heart className="w-5 h-5 text-green-600 animate-pulse" />
            <span className="text-sm font-bold text-green-700">Loved by Thousands Worldwide</span>
            <Sparkles className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Real Stories of{' '}
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-green-400 fill-current drop-shadow-md" />
              ))}
            </div>
            <span className="text-3xl font-bold text-gray-900">4.8/5</span>
          </div>
          
          <p className="text-xl text-gray-700 font-medium">
            Based on 1,300+ verified reviews from real users
          </p>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200/50"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full -translate-y-10 translate-x-10"></div>
              
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-10 h-10 text-green-600 opacity-60" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 leading-relaxed mb-8 font-medium text-lg">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-green-200 shadow-lg"
                  />
                  {testimonial.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {testimonial.role}
                  </p>
                  {testimonial.verified && (
                    <div className="flex items-center space-x-1 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 font-bold">Verified User</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Statistics */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1,300+", label: "Happy Users", icon: Heart },
              { number: "50,000+", label: "Sessions Completed", icon: CheckCircle },
              { number: "4.8/5", label: "Average Rating", icon: Star },
              { number: "95%", label: "User Satisfaction", icon: Sparkles }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 shadow-2xl text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-xl">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-white mb-2 font-bold text-2xl drop-shadow-lg">
                Join Our Community of Wellness
              </h3>
              <p className="text-green-100 font-medium text-lg drop-shadow-md">
                Start your transformation journey today with thousands of others
              </p>
            </div>
            <Link to="/signup">
              <Button className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-4 rounded-2xl text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center space-x-2">
                  <span>Join Now</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;