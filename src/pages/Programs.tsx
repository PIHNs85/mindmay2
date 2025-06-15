import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Target, Users, Star, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  modules: number;
  completedModules: number;
  rating: number;
  participants: number;
  isActive: boolean;
  isRecommended: boolean;
  backgroundImage: string;
}

const Programs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const programs: Program[] = [
    {
      id: '1',
      title: 'Stress & Anxiety Management',
      description: 'Learn evidence-based techniques to manage stress and reduce anxiety in daily life.',
      duration: '6 weeks',
      difficulty: 'Beginner',
      category: 'Anxiety',
      modules: 12,
      completedModules: 8,
      rating: 4.8,
      participants: 2847,
      isActive: true,
      isRecommended: false,
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    {
      id: '2',
      title: 'Mindful Sleep Program',
      description: 'Improve your sleep quality through mindfulness and relaxation techniques.',
      duration: '4 weeks',
      difficulty: 'Beginner',
      category: 'Sleep',
      modules: 8,
      completedModules: 0,
      rating: 4.9,
      participants: 1956,
      isActive: false,
      isRecommended: true,
      backgroundImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop'
    },
    {
      id: '3',
      title: 'Building Confidence & Self-Esteem',
      description: 'Develop a positive self-image and build lasting confidence through proven strategies.',
      duration: '8 weeks',
      difficulty: 'Intermediate',
      category: 'Confidence',
      modules: 16,
      completedModules: 0,
      rating: 4.7,
      participants: 1432,
      isActive: false,
      isRecommended: true,
      backgroundImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop'
    },
    {
      id: '4',
      title: 'Advanced Meditation Mastery',
      description: 'Deepen your meditation practice with advanced techniques and philosophical insights.',
      duration: '12 weeks',
      difficulty: 'Advanced',
      category: 'Meditation',
      modules: 24,
      completedModules: 0,
      rating: 4.9,
      participants: 856,
      isActive: false,
      isRecommended: false,
      backgroundImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop'
    },
    {
      id: '5',
      title: 'Energy & Motivation Boost',
      description: 'Overcome fatigue and build sustainable energy through lifestyle and mindset changes.',
      duration: '5 weeks',
      difficulty: 'Beginner',
      category: 'Energy',
      modules: 10,
      completedModules: 0,
      rating: 4.6,
      participants: 1278,
      isActive: false,
      isRecommended: false,
      backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
    },
    {
      id: '6',
      title: 'Focus & Concentration Training',
      description: 'Enhance your ability to focus and maintain concentration in our distracted world.',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      category: 'Focus',
      modules: 12,
      completedModules: 0,
      rating: 4.8,
      participants: 1645,
      isActive: false,
      isRecommended: true,
      backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'
    }
  ];

  const categories = ['All', 'Anxiety', 'Sleep', 'Confidence', 'Meditation', 'Energy', 'Focus'];

  const filteredPrograms = selectedCategory === 'All' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  const activeProgram = programs.find(p => p.isActive);
  const recommendedPrograms = programs.filter(p => p.isRecommended && !p.isActive);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Advanced': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced blurred overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50 backdrop-blur-md"></div>
        
        <div className="relative z-10">
          {/* Header with enhanced styling */}
          <header className="bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/80 transition-all duration-300">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h1 className="text-xl font-semibold text-gray-900">Wellness Programs</h1>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Current Program with enhanced styling */}
            {activeProgram && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-white mb-4 drop-shadow-lg">Your Current Program</h2>
                <Card 
                  className="border-0 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${activeProgram.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-transparent"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2 text-white drop-shadow-lg">{activeProgram.title}</CardTitle>
                        <p className="text-green-100 drop-shadow-md">{activeProgram.description}</p>
                      </div>
                      <Badge className="bg-green-500 text-white shadow-lg border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm text-green-100">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="drop-shadow-md">{activeProgram.duration}</span>
                          </div>
                          <Badge className={`${getDifficultyColor(activeProgram.difficulty)} shadow-md`}>
                            {activeProgram.difficulty}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span className="drop-shadow-md">{activeProgram.participants.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                          <div className="flex justify-between text-sm mb-2 text-white">
                            <span className="drop-shadow-md">Progress</span>
                            <span className="drop-shadow-md">{activeProgram.completedModules}/{activeProgram.modules} modules</span>
                          </div>
                          <Progress 
                            value={(activeProgram.completedModules / activeProgram.modules) * 100} 
                            className="h-3 bg-white/30"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end items-center">
                        <Button className="bg-white text-green-700 hover:bg-green-50 shadow-lg font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-300">
                          Continue Program
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recommended Programs with enhanced styling */}
            {recommendedPrograms.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-white mb-4 drop-shadow-lg">Recommended for You</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedPrograms.map((program) => (
                    <Card 
                      key={program.id} 
                      className="border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                      style={{
                        backgroundImage: `url(${program.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/70 to-transparent"></div>
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-white drop-shadow-lg">{program.title}</CardTitle>
                          <Badge className="bg-blue-500 text-white shadow-lg border-0">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        </div>
                        <p className="text-blue-100 text-sm drop-shadow-md">{program.description}</p>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4 text-sm text-blue-100">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span className="drop-shadow-md">{program.duration}</span>
                            </div>
                            <Badge className={`${getDifficultyColor(program.difficulty)} shadow-md`}>
                              {program.difficulty}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-blue-100">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="drop-shadow-md">{program.rating}</span>
                            </div>
                            <span className="drop-shadow-md">{program.modules} modules</span>
                          </div>
                          <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 shadow-lg font-semibold transform hover:scale-105 transition-all duration-300">
                            Start Program
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Programs with enhanced styling */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-white drop-shadow-lg">All Programs</h2>
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category 
                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg border-0" 
                        : "bg-white/90 text-gray-900 border-white/50 hover:bg-white shadow-md"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <Card 
                    key={program.id} 
                    className="border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                    style={{
                      backgroundImage: `url(${program.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/70 to-transparent"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-white drop-shadow-lg">{program.title}</CardTitle>
                        <div className="flex flex-col space-y-1">
                          {program.isActive && (
                            <Badge className="bg-green-500 text-white shadow-lg border-0">Active</Badge>
                          )}
                          {program.isRecommended && !program.isActive && (
                            <Badge className="bg-blue-500 text-white shadow-lg border-0">Recommended</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-200 text-sm drop-shadow-md">{program.description}</p>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-200">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="drop-shadow-md">{program.duration}</span>
                          </div>
                          <Badge className={`${getDifficultyColor(program.difficulty)} shadow-md`}>
                            {program.difficulty}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-200">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="drop-shadow-md">{program.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span className="drop-shadow-md">{program.participants.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-200 drop-shadow-md">
                          {program.modules} modules
                        </div>
                        
                        {program.isActive ? (
                          <Button className="w-full bg-white/90 text-gray-800 hover:bg-white shadow-lg font-semibold transform hover:scale-105 transition-all duration-300" variant="outline">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        ) : (
                          <Button className="w-full bg-white text-gray-800 hover:bg-gray-50 shadow-lg font-semibold transform hover:scale-105 transition-all duration-300">
                            Start Program
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Programs;