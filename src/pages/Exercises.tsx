import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Users, ArrowLeft, Heart, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ExercisePlayer } from "@/components/exercises/ExercisePlayer";

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Mindfulness' | 'Breathing' | 'Anxiety' | 'Sleep' | 'Focus';
  participants: number;
  icon: typeof Heart;
}

const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [startedExercise, setStartedExercise] = useState<string | null>(null);
  const [playerOpen, setPlayerOpen] = useState<Exercise | null>(null);

  const exercises: Exercise[] = [
    {
      id: '1',
      title: '4-7-8 Breathing',
      description: 'A powerful breathing technique to reduce anxiety and promote relaxation.',
      duration: '5 min',
      difficulty: 'Beginner',
      category: 'Breathing',
      participants: 1,
      icon: Heart
    },
    {
      id: '2',
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation technique to release tension throughout your body.',
      duration: '15 min',
      difficulty: 'Intermediate',
      category: 'Mindfulness',
      participants: 1,
      icon: Brain
    },
    {
      id: '3',
      title: 'Anxiety Relief Visualization',
      description: 'Guided imagery to calm anxious thoughts and create inner peace.',
      duration: '10 min',
      difficulty: 'Beginner',
      category: 'Anxiety',
      participants: 1,
      icon: Zap
    },
    {
      id: '4',
      title: 'Sleep Preparation Routine',
      description: 'Wind down sequence to prepare your mind and body for restful sleep.',
      duration: '20 min',
      difficulty: 'Beginner',
      category: 'Sleep',
      participants: 1,
      icon: Heart
    },
    {
      id: '5',
      title: 'Focus Enhancement',
      description: 'Concentration exercises to improve mental clarity and attention.',
      duration: '12 min',
      difficulty: 'Advanced',
      category: 'Focus',
      participants: 1,
      icon: Brain
    }
  ];

  const categories = ['All', 'Mindfulness', 'Breathing', 'Anxiety', 'Sleep', 'Focus'];

  const filteredExercises = selectedCategory === 'All' 
    ? exercises 
    : exercises.filter(exercise => exercise.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startExercise = (exerciseId: string) => {
    setStartedExercise(exerciseId);
    // Simulate exercise completion after 3 seconds
    setTimeout(() => {
      setStartedExercise(null);
    }, 3000);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-teal-900/30 to-blue-900/40 backdrop-blur-md"></div>
      
      <div className="relative z-10">
        {/* Header with enhanced contrast */}
        <header className="bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/80">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">Exercise Library</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filters with enhanced styling */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white mb-4 drop-shadow-lg">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md" 
                    : "bg-white/90 text-gray-900 border-white/50 hover:bg-white shadow-md"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Exercise Grid with enhanced styling */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => {
              const IconComponent = exercise.icon;
              const isStarted = startedExercise === exercise.id;
              
              return (
                <Card key={exercise.id} className="hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-lg border-0 ring-1 ring-white/20 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shadow-md">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-900">{exercise.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getDifficultyColor(exercise.difficulty)}>
                              {exercise.difficulty}
                            </Badge>
                            <Badge variant="outline" className="border-gray-300 text-gray-700">{exercise.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 mb-4 font-medium">{exercise.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{exercise.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{exercise.participants} person</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md"
                      onClick={() => setPlayerOpen(exercise)}
                      disabled={isStarted}
                    >
                      {isStarted ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Starting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Play className="w-4 h-4" />
                          <span>Start Exercise</span>
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {playerOpen && (
            <ExercisePlayer
              id={playerOpen.id}
              title={playerOpen.title}
              description={playerOpen.description}
              duration={playerOpen.duration.replace(" min", "")}
              onClose={() => setPlayerOpen(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
