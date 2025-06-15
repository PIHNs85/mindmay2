import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      question: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      question: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      question: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      question: "How would you rate your overall sleep quality?",
      options: [
        { value: 3, label: "Very poor" },
        { value: 2, label: "Poor" },
        { value: 1, label: "Good" },
        { value: 0, label: "Very good" }
      ]
    },
    {
      question: "How often do you feel overwhelmed by daily stress?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "Sometimes" },
        { value: 2, label: "Often" },
        { value: 3, label: "Always" }
      ]
    },
    {
      question: "What is your primary goal for mental wellness?",
      options: [
        { value: 0, label: "Reduce anxiety" },
        { value: 1, label: "Improve sleep" },
        { value: 2, label: "Manage stress" },
        { value: 3, label: "Build confidence" }
      ]
    }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate results and navigate to results
        const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
        navigate('/assessment-results', { state: { score: totalScore, answers: newAnswers } });
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-indigo-900/60 backdrop-blur-md"></div>
      
      <div className="w-full max-w-3xl relative z-10">
        <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="space-y-4">
              <CardTitle className="text-3xl text-center font-bold drop-shadow-lg">Wellness Assessment</CardTitle>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="relative">
                  <Progress value={progress} className="w-full h-4 bg-white/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full opacity-80" 
                       style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-8 text-gray-900 leading-relaxed text-center">
                {questions[currentQuestion].question}
              </h3>
              
              <RadioGroup 
                value={selectedAnswer?.toString()} 
                onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                className="space-y-4"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`group relative flex items-center space-x-4 p-6 rounded-2xl transition-all duration-300 cursor-pointer border-3 ${
                      selectedAnswer === option.value 
                        ? 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-500 shadow-xl transform scale-[1.02] ring-2 ring-blue-300' 
                        : 'bg-white/80 border-gray-300 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 hover:shadow-lg hover:scale-[1.01]'
                    }`}
                    onClick={() => setSelectedAnswer(option.value)}
                  >
                    <div className="relative">
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={`option-${index}`}
                        className={`w-6 h-6 border-3 transition-all duration-300 ${
                          selectedAnswer === option.value 
                            ? 'border-blue-600 bg-blue-600 shadow-lg' 
                            : 'border-gray-400 group-hover:border-blue-500'
                        }`}
                      />
                    </div>
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="text-lg text-gray-900 font-medium cursor-pointer flex-1 leading-relaxed"
                    >
                      {option.label}
                    </Label>
                    {selectedAnswer === option.value && (
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      selectedAnswer === option.value 
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
                        : 'group-hover:bg-gradient-to-r group-hover:from-blue-500/5 group-hover:to-indigo-500/5'
                    }`}></div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-8">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="bg-white/90 text-gray-900 border-gray-300 hover:bg-white shadow-lg px-8 py-4 text-lg font-semibold rounded-xl disabled:opacity-50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg px-8 py-4 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;