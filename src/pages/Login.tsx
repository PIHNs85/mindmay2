import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&h=800&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Enhanced blurred overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-blue-900/50 to-purple-900/60 backdrop-blur-md"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-32 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative w-full max-w-md z-10">
          {/* Enhanced Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent drop-shadow-lg">MindMate AI</span>
                <p className="text-sm text-green-100 font-medium">Your Wellness Companion</p>
              </div>
            </Link>
          </div>

          {/* Enhanced Card */}
          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
            
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-3xl text-gray-900 font-bold">Welcome back</CardTitle>
                <CardDescription className="text-gray-600 font-medium text-lg">Sign in to continue your wellness journey</CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-900 font-bold text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-12 bg-white border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl h-14 text-gray-900 font-medium shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-900 font-bold text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-12 bg-white border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl h-14 text-gray-900 font-medium shadow-sm"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700 text-white shadow-2xl hover:shadow-green-500/25 h-14 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 group">
                  <span className="flex items-center space-x-2">
                    <span>Sign In</span>
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
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-green-600 hover:text-green-700 font-bold hover:underline transition-colors duration-300">
                    Start your free journey
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

export default Login;