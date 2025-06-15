import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, SkipBack, SkipForward, BookOpen, Clock, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Audiobook {
  id: string;
  title: string;
  author: string;
  narrator: string;
  duration: string;
  category: string;
  rating: number;
  description: string;
  progress: number;
  isCompleted: boolean;
}

const Audiobooks = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audiobooks: Audiobook[] = [
    {
      id: '1',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      narrator: 'Eckhart Tolle',
      duration: '7h 37m',
      category: 'Mindfulness',
      rating: 4.8,
      description: 'A guide to spiritual enlightenment and living in the present moment.',
      progress: 65,
      isCompleted: false
    },
    {
      id: '2',
      title: 'Mindfulness for Beginners',
      author: 'Jon Kabat-Zinn',
      narrator: 'Jon Kabat-Zinn',
      duration: '5h 12m',
      category: 'Meditation',
      rating: 4.7,
      description: 'An introduction to mindfulness meditation and its benefits.',
      progress: 100,
      isCompleted: true
    },
    {
      id: '3',
      title: 'The Anxiety and Phobia Workbook',
      author: 'Edmund Bourne',
      narrator: 'Mike Lenz',
      duration: '12h 30m',
      category: 'Anxiety',
      rating: 4.6,
      description: 'Evidence-based strategies for overcoming anxiety and phobias.',
      progress: 30,
      isCompleted: false
    },
    {
      id: '4',
      title: 'Sleep Stories for Adults',
      author: 'Various Authors',
      narrator: 'Calming Voices',
      duration: '8h 45m',
      category: 'Sleep',
      rating: 4.9,
      description: 'Soothing bedtime stories designed to help you fall asleep.',
      progress: 0,
      isCompleted: false
    },
    {
      id: '5',
      title: 'The Happiness Project',
      author: 'Gretchen Rubin',
      narrator: 'Gretchen Rubin',
      duration: '9h 18m',
      category: 'Self-Help',
      rating: 4.5,
      description: 'A year-long experiment in discovering what really makes us happy.',
      progress: 45,
      isCompleted: false
    }
  ];

  const categories = ['All', 'Mindfulness', 'Meditation', 'Anxiety', 'Sleep', 'Self-Help'];

  const filteredAudiobooks = selectedCategory === 'All' 
    ? audiobooks 
    : audiobooks.filter(book => book.category === selectedCategory);

  const togglePlayback = (bookId: string) => {
    if (currentlyPlaying === bookId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(bookId);
      setIsPlaying(true);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-green-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-red-900/40 backdrop-blur-md"></div>
      
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
                <h1 className="text-xl font-semibold text-gray-900">Audiobook Library</h1>
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
                    ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md" 
                    : "bg-white/90 text-gray-900 border-white/50 hover:bg-white shadow-md"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Currently Playing with enhanced styling */}
          {currentlyPlaying && (
            <Card className="mb-8 bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {audiobooks.find(book => book.id === currentlyPlaying)?.title}
                      </h3>
                      <p className="text-gray-700">
                        {audiobooks.find(book => book.id === currentlyPlaying)?.author}
                      </p>
                      <Progress value={audiobooks.find(book => book.id === currentlyPlaying)?.progress || 0} className="w-64 mt-2" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="shadow-md">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => togglePlayback(currentlyPlaying)} className="bg-blue-600 hover:bg-blue-700 shadow-md">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" className="shadow-md">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Audiobooks Grid with enhanced styling */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAudiobooks.map((audiobook) => (
              <Card key={audiobook.id} className="hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-lg border-0 ring-1 ring-white/20 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 text-gray-900">{audiobook.title}</CardTitle>
                      <p className="text-sm text-gray-700 font-medium">by {audiobook.author}</p>
                      <p className="text-xs text-gray-600">Narrated by {audiobook.narrator}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="border-gray-300 text-gray-700">{audiobook.category}</Badge>
                        {audiobook.isCompleted && (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-700 text-sm mb-4 font-medium">{audiobook.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 font-medium">{audiobook.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(audiobook.rating)}
                        <span className="text-gray-700 font-medium">({audiobook.rating})</span>
                      </div>
                    </div>
                    
                    {audiobook.progress > 0 && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span className="font-medium">Progress</span>
                          <span className="font-medium">{audiobook.progress}%</span>
                        </div>
                        <Progress value={audiobook.progress} />
                      </div>
                    )}
                    
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-md"
                      onClick={() => togglePlayback(audiobook.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {audiobook.progress > 0 ? 'Continue' : 'Start'} Listening
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audiobooks;