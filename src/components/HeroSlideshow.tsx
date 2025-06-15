import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Sparkles, Star, Heart, Brain, Moon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSlideshow = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&h=800&fit=crop",
      title: "Find Your Inner Peace",
      subtitle: "Discover tranquility through AI-guided meditation and mindfulness practices",
      overlay: "bg-gradient-to-r from-green-900/80 via-emerald-800/70 to-teal-700/60",
      icon: Heart,
      accent: "from-green-400 to-emerald-500",
      cta: "Start Meditation",
      ctaLink: "/signup",
      stats: { users: "50K+", rating: "4.9" }
    },
    {
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=800&fit=crop",
      title: "24/7 Mental Health Support",
      subtitle: "Your AI companion is always here to listen, understand, and guide you through any challenge",
      overlay: "bg-gradient-to-r from-blue-900/80 via-indigo-800/70 to-purple-700/60",
      icon: Brain,
      accent: "from-blue-400 to-indigo-500",
      cta: "Chat Now",
      ctaLink: "/signup",
      stats: { users: "100K+", rating: "4.8" }
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
      title: "Transform Your Mindset",
      subtitle: "Build resilience and mental clarity with personalized therapeutic exercises and brain training",
      overlay: "bg-gradient-to-r from-purple-900/80 via-pink-800/70 to-rose-700/60",
      icon: Zap,
      accent: "from-purple-400 to-pink-500",
      cta: "Train Brain",
      ctaLink: "/signup",
      stats: { users: "75K+", rating: "4.9" }
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=800&fit=crop",
      title: "Sleep Better Tonight",
      subtitle: "Relax with calming stories, guided sleep meditations, and soothing soundscapes",
      overlay: "bg-gradient-to-r from-indigo-900/80 via-blue-800/70 to-cyan-700/60",
      icon: Moon,
      accent: "from-indigo-400 to-blue-500",
      cta: "Sleep Stories",
      ctaLink: "/signup",
      stats: { users: "80K+", rating: "4.8" }
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState('next');

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [slides.length, isAutoPlaying]);

  const nextSlide = () => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden rounded-3xl mb-12 group shadow-2xl">
      {/* Background slides */}
      {slides.map((slide, index) => {
        const IconComponent = slide.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Ken Burns effect */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-linear ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Enhanced Gradient Overlay */}
            <div className={`absolute inset-0 ${slide.overlay}`}></div>
            
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-40 left-32 w-3 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-5xl">
                {/* Icon with animation */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${slide.accent} rounded-full mb-8 shadow-2xl transform transition-all duration-1000 ${
                  index === currentSlide ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
                }`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                {/* Title with staggered animation */}
                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight transition-all duration-1000 delay-200 ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : slideDirection === 'next' 
                      ? 'opacity-0 translate-y-8' 
                      : 'opacity-0 -translate-y-8'
                }`}>
                  {slide.title}
                </h2>
                
                {/* Subtitle with staggered animation */}
                <p className={`text-xl md:text-2xl lg:text-3xl opacity-90 drop-shadow-lg mb-8 font-medium leading-relaxed transition-all duration-1000 delay-400 ${
                  index === currentSlide 
                    ? 'opacity-90 translate-y-0' 
                    : slideDirection === 'next' 
                      ? 'opacity-0 translate-y-8' 
                      : 'opacity-0 -translate-y-8'
                }`}>
                  {slide.subtitle}
                </p>
                
                {/* Stats and CTA with staggered animation */}
                <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 transition-all duration-1000 delay-600 ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : slideDirection === 'next' 
                      ? 'opacity-0 translate-y-8' 
                      : 'opacity-0 -translate-y-8'
                }`}>
                  {/* Stats */}
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white drop-shadow-lg">{slide.stats.users}</div>
                      <div className="text-sm text-white/80 font-medium">Happy Users</div>
                    </div>
                    <div className="w-px h-12 bg-white/30"></div>
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-2xl font-bold text-white drop-shadow-lg">{slide.stats.rating}</span>
                      </div>
                      <div className="text-sm text-white/80 font-medium">Rating</div>
                    </div>
                  </div>
                  
                  {/* CTA Button - Now clickable */}
                  <Link to={slide.ctaLink}>
                    <Button className={`bg-gradient-to-r ${slide.accent} hover:shadow-2xl hover:scale-110 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl transform transition-all duration-300 border-2 border-white/20 backdrop-blur-sm`}>
                      <Play className="w-5 h-5 mr-2" />
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Enhanced Navigation arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl hover:scale-110 group-hover:translate-x-0 -translate-x-2 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl hover:scale-110 group-hover:translate-x-0 translate-x-2 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Enhanced Progress indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`relative overflow-hidden rounded-full transition-all duration-500 hover:scale-125 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-white shadow-lg' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-110"
        >
          {isAutoPlaying ? (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
        <div className="text-white/80 text-sm font-medium bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
          {isAutoPlaying ? 'Auto' : 'Manual'}
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 left-6 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 text-white font-medium shadow-lg">
        <span className="text-lg font-bold">{currentSlide + 1}</span>
        <span className="text-white/70 mx-1">/</span>
        <span className="text-white/70">{slides.length}</span>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute top-10 right-20 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-70 shadow-lg" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-32 left-16 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce opacity-60 shadow-lg" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-10 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce opacity-50 shadow-lg" style={{ animationDelay: '2s' }}></div>
      
      {/* Sparkle effects */}
      <div className="absolute top-20 left-1/4 animate-pulse opacity-60">
        <Sparkles className="w-6 h-6 text-yellow-300" />
      </div>
      <div className="absolute bottom-20 right-1/4 animate-pulse opacity-50" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-4 h-4 text-blue-300" />
      </div>
    </div>
  );
};

export default HeroSlideshow;