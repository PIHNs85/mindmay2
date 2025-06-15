import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const PageTransition = ({ children, isLoading = false }: PageTransitionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Reset transition state when location changes
    setShowContent(false);
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setShowContent(true);
      setIsTransitioning(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading || isTransitioning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center z-10">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-green-200 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-700 ease-out ${
      showContent 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-8 scale-95'
    }`}>
      <div className="animate-fade-in-up">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;