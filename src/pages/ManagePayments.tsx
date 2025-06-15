import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Calendar, DollarSign, Settings, ArrowLeft, Check, Star, Crown, Sparkles, Zap, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isCurrentPlan: boolean;
  isPopular: boolean;
  color: string;
  bgGradient: string;
  icon: React.ElementType;
}

const ManagePayments = () => {
  const [currentPlan] = useState('premium');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '$0',
      period: 'forever',
      features: [
        '10 AI text replies/day',
        '2 min voice call/day',
        '3 min audiobook preview',
        '2 brain puzzle levels/day',
        '1 trial exercise/day'
      ],
      isCurrentPlan: false,
      isPopular: false,
      color: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-50 to-gray-100',
      icon: Shield
    },
    {
      id: 'advanced',
      name: 'Advanced Plan',
      price: '$4.99',
      period: 'month',
      features: [
        '20 AI messages/day',
        '10 min call/day',
        '10 hrs audiobook/month',
        'Unlimited brain puzzles',
        '3 exercises/day'
      ],
      isCurrentPlan: false,
      isPopular: false,
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      icon: Star
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$11.99',
      period: 'month',
      features: [
        '60 AI texts/day',
        '30 min call/day',
        'Unlimited audiobooks',
        'Unlimited puzzles',
        '3 exercises/day'
      ],
      isCurrentPlan: false,
      isPopular: false,
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-pink-50',
      icon: Zap
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$14.99',
      period: 'month',
      features: [
        'Unlimited text',
        '1 hr call/day',
        'Unlimited audiobooks',
        '8 exercises/day',
        'Priority support'
      ],
      isCurrentPlan: true,
      isPopular: true,
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      icon: Crown
    },
    {
      id: 'ultra',
      name: 'Ultra Plan',
      price: '$19.99',
      period: 'month',
      features: [
        'Unlimited everything',
        'Priority processing',
        'Extra AI voice options',
        'Personal wellness coach',
        '24/7 crisis support'
      ],
      isCurrentPlan: false,
      isPopular: false,
      color: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      icon: Heart
    }
  ];

  const handleUpgrade = (planId: string) => {
    console.log(`Upgrading to ${planId}`);
    // Stripe checkout integration would go here
  };

  const handleDowngrade = (planId: string) => {
    console.log(`Downgrading to ${planId}`);
    // Stripe checkout integration would go here
  };

  const handleCancelSubscription = () => {
    setShowCancelConfirm(false);
    console.log('Cancelling subscription');
    // Stripe cancellation integration would go here
  };

  const currentPlanData = plans.find(p => p.isCurrentPlan);
  const usagePercentage = 75; // Mock usage data

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced blurred overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/40 to-indigo-900/50 backdrop-blur-md"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-lg border-b border-white/30 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/80 transition-all duration-300">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Manage Subscription</h1>
                    <p className="text-sm text-gray-600 font-medium">Billing and plan management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Current Subscription */}
          <Card className="mb-8 bg-gradient-to-br from-white/95 via-green-50/30 to-emerald-50/30 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <span>Current Subscription</span>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Plan Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Plan Details</h3>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-md">
                    <div className="flex items-center space-x-3 mb-4">
                      {currentPlanData && <currentPlanData.icon className="w-8 h-8 text-green-600" />}
                      <div>
                        <Badge className="bg-green-100 text-green-800 border-green-300 font-bold text-lg px-4 py-2">
                          {currentPlanData?.name}
                        </Badge>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-3xl font-bold text-gray-900">{currentPlanData?.price}</span>
                          <span className="text-gray-600 font-medium">/{currentPlanData?.period}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Usage Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-700">Monthly Usage</span>
                        <span className="text-gray-900">{usagePercentage}%</span>
                      </div>
                      <div className="relative">
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${usagePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">Great usage! You're getting excellent value.</p>
                    </div>
                  </div>
                </div>
                
                {/* Billing Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Billing Information</h3>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-md space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Next billing</p>
                        <p className="font-bold text-gray-900">January 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Payment method</p>
                        <p className="font-bold text-gray-900">•••• •••• •••• 4242</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Amount</p>
                        <p className="font-bold text-gray-900">$14.99/month</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/90 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-md font-semibold"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Update Payment Method
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/90 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-md font-semibold"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Change Billing Date
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full bg-red-600 hover:bg-red-700 shadow-md font-semibold"
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Available Plans */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Available Plans</h2>
              <p className="text-lg text-white/90 font-medium drop-shadow-md">Upgrade or switch to a plan that fits your needs</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {plans.map((plan) => {
                const IconComponent = plan.icon;
                return (
                  <Card key={plan.id} className={`relative overflow-hidden transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl bg-gradient-to-br ${plan.bgGradient} border-0 ${
                    plan.isCurrentPlan ? 'ring-4 ring-green-400 transform scale-105' : ''
                  }`}>
                    
                    {plan.isCurrentPlan && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          <Crown className="w-4 h-4 mr-1" />
                          Current Plan
                        </Badge>
                      </div>
                    )}
                    
                    {plan.isPopular && !plan.isCurrentPlan && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    {/* Decorative elements */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${plan.color} opacity-10 rounded-full -translate-y-10 translate-x-10`}></div>
                    
                    <CardHeader className="text-center relative z-10 pb-4">
                      <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center shadow-lg mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                      
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 font-medium">/{plan.period}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 relative z-10">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3 text-sm">
                            <div className={`w-5 h-5 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center shadow-md`}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-800 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.isCurrentPlan ? (
                        <Button disabled className="w-full h-12 rounded-xl font-bold bg-gray-200 text-gray-500">
                          Current Plan
                        </Button>
                      ) : plan.id === 'free' ? (
                        <Button 
                          variant="outline" 
                          className="w-full h-12 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => handleDowngrade(plan.id)}
                        >
                          Downgrade
                        </Button>
                      ) : (
                        <Button 
                          className={`w-full h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r ${plan.color} text-white`}
                          onClick={() => handleUpgrade(plan.id)}
                        >
                          {parseInt(plan.price.replace('$', '')) > 14.99 ? 'Upgrade' : 'Switch Plan'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Enhanced Billing History */}
          <Card className="bg-gradient-to-br from-white/95 via-blue-50/30 to-purple-50/30 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span>Billing History</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {[
                  { date: 'December 15, 2023', amount: '$14.99', status: 'Paid' },
                  { date: 'November 15, 2023', amount: '$14.99', status: 'Paid' },
                  { date: 'October 15, 2023', amount: '$14.99', status: 'Paid' }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Premium Plan</div>
                        <div className="text-sm text-gray-600 font-medium">{invoice.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">{invoice.amount}</div>
                      <Badge className="bg-green-100 text-green-800 border-green-300 font-bold">
                        <Check className="w-3 h-3 mr-1" />
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-2 ring-white/30">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Cancel Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 text-center font-medium leading-relaxed">
                We're sad to see you go! Are you sure you want to cancel your Premium subscription? 
                You'll lose access to premium features at the end of your billing period.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium">
                  <strong>What you'll lose:</strong> Unlimited AI conversations, priority support, 
                  advanced features, and personalized wellness programs.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  Keep Subscription
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700 font-semibold"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManagePayments;