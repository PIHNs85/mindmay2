import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, Sparkles, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-100 fixed w-full top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-2.5 h-2.5 text-white fill-current" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">MindMate AI</span>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-green-500" />
                <span className="text-xs font-bold text-green-600">Your Wellness Companion</span>
              </div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/learn-more" className="relative group">
              <span className="text-gray-700 hover:text-green-600 font-semibold transition-colors duration-300">
                Learn More
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link to="/pricing" className="relative group">
              <span className="text-gray-700 hover:text-green-600 font-semibold transition-colors duration-300">
                Pricing
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link to="/services" className="relative group">
              <span className="text-gray-700 hover:text-green-600 font-semibold transition-colors duration-300">
                Services
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link to="/contact" className="relative group">
              <span className="text-gray-700 hover:text-green-600 font-semibold transition-colors duration-300">
                Contact
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-gray-700 hover:text-green-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl">
          <div className="px-4 py-6 space-y-4">
            <Link to="/learn-more" className="block text-gray-700 hover:text-green-600 font-semibold py-3 px-4 rounded-xl hover:bg-green-50 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
              Learn More
            </Link>
            <Link to="/pricing" className="block text-gray-700 hover:text-green-600 font-semibold py-3 px-4 rounded-xl hover:bg-green-50 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link to="/services" className="block text-gray-700 hover:text-green-600 font-semibold py-3 px-4 rounded-xl hover:bg-green-50 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-green-600 font-semibold py-3 px-4 rounded-xl hover:bg-green-50 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-4 space-y-3 border-t border-gray-200">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 font-semibold rounded-xl">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;