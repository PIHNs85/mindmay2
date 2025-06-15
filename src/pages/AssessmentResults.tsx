import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Target, Brain, Heart } from 'lucide-react';

const AssessmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, answers } = location.state || { score: 0, answers: [] };

  // Calculate wellness score (lower is better, invert for display)
  const maxScore = 21; // 7 questions × 3 max points
  const wellnessScore = Math.max(0, 100 - (score / maxScore) * 100);

  const getRecommendedProgram = (score: number) => {
    if (score <= 7) {
      return {
        name: "Wellness Maintenance",
        description: "You're doing well! Focus on maintaining your mental wellness with daily practices.",
        icon: CheckCircle,
        color: "text-green-600",
        focus: ["Daily check-ins", "Mindfulness", "Sleep optimization"]
      };
    } else if (score <= 14) {
      return {
        name: "Stress & Anxiety Management", 
        description: "Let's work on managing stress and building coping strategies.",
        icon: Target,
        color: "text-yellow-600",
        focus: ["Breathing exercises", "CBT techniques", "Stress reduction"]
      };
    } else {
      return {
        name: "Intensive Support",
        description: "We recommend comprehensive support with regular check-ins and professional guidance.",
        icon: Heart,
        color: "text-red-600", 
        focus: ["Daily AI support", "Crisis resources", "Professional referrals"]
      };
    }
  };

  const recommendedProgram = getRecommendedProgram(score);

  const handleStartJourney = () => {
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-blue-900/40 to-teal-900/50 backdrop-blur-md"></div>
      
      <div className="w-full max-w-2xl space-y-6 relative z-10">
        {/* Wellness Score with enhanced styling */}
        <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gray-900 font-bold">Your Wellness Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-4 drop-shadow-sm">
                {Math.round(wellnessScore)}
              </div>
              <Progress value={wellnessScore} className="w-full mb-4 h-3" />
              <p className="text-gray-700 font-medium">
                {wellnessScore >= 80 ? "Excellent mental wellness!" :
                 wellnessScore >= 60 ? "Good foundation with room for growth" :
                 wellnessScore >= 40 ? "Some areas need attention" : 
                 "Let's work together to improve your wellness"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Program with enhanced styling */}
        <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <recommendedProgram.icon className={`w-6 h-6 ${recommendedProgram.color}`} />
              <span>Recommended Program</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{recommendedProgram.name}</h3>
              <p className="text-gray-700 mb-4 font-medium">{recommendedProgram.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-gray-900">Program Focus Areas:</h4>
              <ul className="space-y-2">
                {recommendedProgram.focus.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights with enhanced styling */}
        <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Brain className="w-6 h-6 text-blue-600" />
              <span>Key Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {score <= 3 && (
                <p className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700 font-medium">You show strong emotional resilience and good coping strategies.</span>
                </p>
              )}
              {score > 3 && score <= 7 && (
                <p className="flex items-start space-x-2">
                  <Target className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <span className="text-gray-700 font-medium">You have a solid foundation but could benefit from stress management techniques.</span>
                </p>
              )}
              {score > 7 && (
                <p className="flex items-start space-x-2">
                  <Heart className="w-5 h-5 text-red-600 mt-0.5" />
                  <span className="text-gray-700 font-medium">You're experiencing significant stress. Daily support and coping strategies will help.</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Button with enhanced styling */}
        <div className="text-center">
          <Button 
            onClick={handleStartJourney}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Your Wellness Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;