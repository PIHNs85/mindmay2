import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Sparkles, User, Mail, Lock, ArrowRight, Star } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
    navigate('/assessment');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=800&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Enhanced blurred overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-green-900/60 backdrop-blur-md"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-32 w-5 h-5 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative w-full max-w-md z-10">
          {/* Enhanced Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">MindMate AI</span>
                <p className="text-sm text-blue-100 font-medium">Your Wellness Companion</p>
              </div>
            </Link>
          </div>

          {/* Enhanced Card */}
          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
            
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-3xl text-gray-900 font-bold">Start your journey</CardTitle>
                <CardDescription className="text-gray-600 font-medium text-lg">Create your account for better mental wellness</CardDescription>
              </div>
              
              {/* Benefits preview */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-bold">Free Trial</span>
                  </div>
                  <div className="w-1 h-4 bg-blue-300 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700 font-bold">24/7 Support</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-gray-900 font-bold text-sm">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-12 bg-white border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 rounded-xl h-14 text-gray-900 font-medium shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-900 font-bold text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-12 bg-white border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 rounded-xl h-14 text-gray-900 font-medium shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-900 font-bold text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-12 bg-white border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 rounded-xl h-14 text-gray-900 font-medium shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-gray-900 font-bold text-sm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="pl-12 bg-white border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 rounded-xl h-14 text-gray-900 font-medium shadow-sm"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white shadow-2xl hover:shadow-blue-500/25 h-14 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 group">
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                    <span>Start Your Free Journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </form>
              
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">or</span>
                  </div>
                </div>
                
                <p className="text-gray-700 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors duration-300">
                    Sign in
                  </Link>
                </p>
                
                <Link to="/" className="inline-block text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors duration-300">
                  ← Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;