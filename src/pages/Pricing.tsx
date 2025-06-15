import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Crown, Sparkles, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "10 AI text replies/day",
        "2 min voice call/day", 
        "3 min audiobook preview",
        "2 brain puzzle levels/day",
        "1 trial exercise/day"
      ],
      isPopular: false,
      color: "from-gray-500 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      buttonText: "Get Started Free"
    },
    {
      name: "Advanced Plan", 
      price: "$4.99",
      period: "month",
      description: "Great for regular users",
      features: [
        "20 AI messages/day",
        "10 min call/day",
        "10 hrs audiobook/month", 
        "Unlimited brain puzzles",
        "3 exercises/day"
      ],
      isPopular: false,
      color: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      buttonText: "Choose Advanced"
    },
    {
      name: "Pro Plan",
      price: "$11.99", 
      period: "month",
      description: "Advanced wellness features",
      features: [
        "60 AI texts/day",
        "30 min call/day",
        "Unlimited audiobooks",
        "Unlimited puzzles",
        "3 exercises/day"
      ],
      isPopular: false,
      color: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-pink-50",
      buttonText: "Choose Pro"
    },
    {
      name: "Premium Plan",
      price: "$14.99",
      period: "month", 
      description: "Most popular choice",
      features: [
        "Unlimited text",
        "1 hr call/day",
        "Unlimited audiobooks",
        "8 exercises/day",
        "Priority support"
      ],
      isPopular: true,
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      buttonText: "Start Premium"
    },
    {
      name: "Ultra Plan",
      price: "$19.99",
      period: "month",
      description: "Complete wellness solution", 
      features: [
        "Unlimited everything",
        "Priority processing",
        "Extra AI voice options",
        "Personal wellness coach",
        "24/7 crisis support"
      ],
      isPopular: false,
      color: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      buttonText: "Go Ultra"
    }
  ];

  return (
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
            {/* Enhanced Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50">
                <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
                <span className="text-sm font-bold text-green-700">Choose Your Perfect Plan</span>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Choose Your{' '}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Wellness Plan
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
                Start your mental wellness journey with a plan that fits your needs. 
                Upgrade or downgrade anytime with our flexible pricing.
              </p>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-700">No commitment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-700">Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-700">30-day guarantee</span>
                </div>
              </div>
            </div>

            {/* Enhanced Plans Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-500 hover:scale-105 ${
                  plan.isPopular 
                    ? 'ring-4 ring-green-400 shadow-2xl shadow-green-500/25 transform scale-105' 
                    : 'shadow-xl hover:shadow-2xl'
                } bg-gradient-to-br ${plan.bgGradient} border-0`}>
                  
                  {/* Popular badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                        <Crown className="w-4 h-4" />
                        <span>Most Popular</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative elements */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${plan.color} opacity-10 rounded-full -translate-y-10 translate-x-10`}></div>
                  
                  <CardHeader className="text-center relative z-10 pb-4">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center shadow-lg mb-4`}>
                      {plan.name === "Free Plan" && <Zap className="w-8 h-8 text-white" />}
                      {plan.name === "Advanced Plan" && <Star className="w-8 h-8 text-white" />}
                      {plan.name === "Pro Plan" && <Crown className="w-8 h-8 text-white" />}
                      {plan.name === "Premium Plan" && <Sparkles className="w-8 h-8 text-white" />}
                      {plan.name === "Ultra Plan" && <Crown className="w-8 h-8 text-white" />}
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 font-medium">/{plan.period}</span>
                      </div>
                      <CardDescription className="text-gray-700 font-medium">{plan.description}</CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className={`w-5 h-5 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center shadow-md`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-800 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className={`w-full h-12 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      plan.isPopular
                        ? `bg-gradient-to-r ${plan.color} hover:shadow-green-500/25 text-white`
                        : plan.name === "Free Plan"
                        ? "bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
                        : `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg`
                    }`}>
                      <span className="flex items-center space-x-2">
                        <span>{plan.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Features Comparison */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Evidence-Based Therapeutic Approaches
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
                  Our AI is trained on proven therapeutic methods including Cognitive Behavioral Therapy (CBT), 
                  Dialectical Behavior Therapy (DBT), and Mindfulness-Based Stress Reduction (MBSR).
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">CBT Techniques</h3>
                    <p className="text-gray-700 font-medium">Restructure negative thought patterns with proven cognitive methods</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">DBT Skills</h3>
                    <p className="text-gray-700 font-medium">Master emotional regulation and distress tolerance techniques</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">MBSR Practice</h3>
                    <p className="text-gray-700 font-medium">Develop mindfulness and present-moment awareness skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Pricing;