import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  Shield, 
  Zap, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  MessageCircle,
  Phone,
  Moon,
  Target,
  BarChart,
  Users,
  Clock,
  Award,
  TrendingUp,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

const LearnMore = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Therapy",
      description: "24/7 conversational support with empathetic AI trained in CBT, DBT, and mindfulness techniques",
      benefits: ["Instant access", "Personalized responses", "Crisis detection", "Progress tracking"]
    },
    {
      icon: Phone,
      title: "AI Voice Calls",
      description: "Natural voice conversations with real-time emotional understanding and therapeutic guidance",
      benefits: ["Human-like interaction", "Voice emotion analysis", "Personalized sessions", "Low latency"]
    },
    {
      icon: Brain,
      title: "Brain Training",
      description: "Scientifically-designed cognitive exercises to improve memory, focus, and mental agility",
      benefits: ["Progressive difficulty", "Performance analytics", "Daily challenges", "Cognitive improvement"]
    },
    {
      icon: Moon,
      title: "Sleep & Relaxation",
      description: "Curated library of sleep stories, meditations, and soundscapes for better rest",
      benefits: ["Sleep quality improvement", "Stress reduction", "Guided meditations", "Calming soundscapes"]
    },
    {
      icon: Target,
      title: "Therapeutic Exercises",
      description: "Evidence-based activities for anxiety, depression, trauma recovery, and personal growth",
      benefits: ["CBT worksheets", "Breathing exercises", "Mindfulness practices", "Trauma-informed care"]
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Comprehensive analytics and insights into your mental health journey and improvements",
      benefits: ["Mood tracking", "Goal setting", "Progress visualization", "Personalized insights"]
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access support whenever you need it, day or night"
    },
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "HIPAA-compliant with end-to-end encryption"
    },
    {
      icon: Users,
      title: "Personalized Care",
      description: "AI that learns and adapts to your unique needs"
    },
    {
      icon: Award,
      title: "Evidence-Based",
      description: "Built on proven therapeutic methodologies"
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Track your progress with detailed analytics"
    },
    {
      icon: Globe,
      title: "Accessible Anywhere",
      description: "Available on all devices, wherever you are"
    }
  ];

  const competitors = [
    {
      name: "MindMate AI",
      price: "$14.99/month",
      features: [
        "Unlimited AI chat & voice calls",
        "24/7 crisis support",
        "Brain training games",
        "Sleep stories & meditations",
        "Progress tracking",
        "Therapeutic exercises",
        "HIPAA compliant",
        "Evidence-based approach"
      ],
      highlight: true
    },
    {
      name: "Abby.gg",
      price: "$19.99/month",
      features: [
        "Limited chat sessions",
        "Basic mood tracking",
        "Generic responses",
        "No voice calls",
        "Limited exercises",
        "Basic analytics",
        "Standard security",
        "Limited availability"
      ],
      highlight: false
    },
    {
      name: "Traditional Therapy",
      price: "$150-300/session",
      features: [
        "Weekly appointments only",
        "Limited availability",
        "No 24/7 support",
        "No digital tools",
        "No progress tracking",
        "High cost barrier",
        "Waiting lists",
        "Location dependent"
      ],
      highlight: false
    }
  ];

  const helpWith = [
    { condition: "Anxiety & Panic", description: "Manage anxiety attacks and reduce daily worry" },
    { condition: "Depression", description: "Combat negative thoughts and improve mood" },
    { condition: "Sleep Issues", description: "Develop healthy sleep patterns and routines" },
    { condition: "Stress Management", description: "Learn effective coping strategies for daily stress" },
    { condition: "Trauma Recovery", description: "Process traumatic experiences safely" },
    { condition: "Relationship Issues", description: "Improve communication and emotional intelligence" },
    { condition: "Work Burnout", description: "Prevent and recover from professional exhaustion" },
    { condition: "Self-Esteem", description: "Build confidence and self-worth" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          
          <div className="pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Hero Section */}
              <div className="text-center mb-20 space-y-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50">
                  <Brain className="w-5 h-5 text-green-600 animate-pulse" />
                  <span className="text-sm font-bold text-green-700">Revolutionary AI Mental Health Platform</span>
                  <Sparkles className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                  The Future of{' '}
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mental Wellness
                  </span>
                </h1>
                
                <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
                  MindMate AI combines cutting-edge artificial intelligence with evidence-based therapeutic approaches 
                  to provide personalized, accessible, and effective mental health support for everyone.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                      <Zap className="w-6 h-6 mr-3" />
                      Start Your Free Journey
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <div className="flex items-center space-x-4 text-gray-700">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center border-3 border-white shadow-lg">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-gray-900">1,300+</span>
                      <p className="text-sm font-medium">users transformed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-20">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Comprehensive Mental Health Solutions
                  </h2>
                  <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                    Our platform offers a complete suite of AI-powered tools designed to support every aspect of your mental wellness journey.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full -translate-y-10 translate-x-10"></div>
                      
                      <CardHeader className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <p className="text-gray-700 mb-6 font-medium leading-relaxed">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mb-20">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Why Choose MindMate AI?
                  </h2>
                  <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                    Experience the advantages of AI-powered mental health support that's always available, completely private, and scientifically proven.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <benefit.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                      <p className="text-gray-700 font-medium leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Help With */}
              <div className="mb-20">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Conditions We Help With
                  </h2>
                  <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                    Our AI is trained to provide support for a wide range of mental health challenges and life situations.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {helpWith.map((item, index) => (
                    <div key={index} className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.condition}</h3>
                      <p className="text-gray-700 text-sm font-medium leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Table */}
              <div className="mb-20">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    How We Compare
                  </h2>
                  <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                    See why MindMate AI offers the best value and most comprehensive mental health support available.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {competitors.map((competitor, index) => (
                    <Card key={index} className={`relative overflow-hidden transition-all duration-300 ${
                      competitor.highlight 
                        ? 'ring-4 ring-green-400 shadow-2xl shadow-green-500/25 transform scale-105' 
                        : 'shadow-lg hover:shadow-xl'
                    } border-0`}>
                      {competitor.highlight && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                            <Star className="w-4 h-4 mr-1" />
                            Best Value
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className={`text-center ${competitor.highlight ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gray-50'}`}>
                        <CardTitle className="text-2xl font-bold text-gray-900">{competitor.name}</CardTitle>
                        <div className="text-3xl font-bold text-gray-900 mt-2">{competitor.price}</div>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <ul className="space-y-3">
                          {competitor.features.map((feature, i) => (
                            <li key={i} className="flex items-center space-x-3">
                              <CheckCircle className={`w-5 h-5 ${competitor.highlight ? 'text-green-500' : 'text-gray-400'}`} />
                              <span className="text-gray-700 font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {competitor.highlight && (
                          <Link to="/signup" className="block mt-6">
                            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                              Choose This Plan
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
                  <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
                    Ready to Transform Your Mental Health?
                  </h2>
                  <p className="text-xl mb-8 opacity-90 drop-shadow-md max-w-3xl mx-auto">
                    Join thousands who've found peace, clarity, and growth with MindMate AI. 
                    Start your journey today with our free trial.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/signup">
                      <Button className="bg-white text-green-600 hover:bg-green-50 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                        <Heart className="w-6 h-6 mr-3" />
                        Start Free Trial
                      </Button>
                    </Link>
                    <Link to="/pricing">
                      <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default LearnMore;