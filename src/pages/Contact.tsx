import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageCircle, Sparkles, Star, Send, Heart, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      info: "support@mindmate.ai",
      description: "We typically respond within 24 hours",
      color: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Phone,
      title: "Crisis Hotline",
      info: "1-800-MINDMATE",
      description: "24/7 emergency mental health support",
      color: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-50"
    },
    {
      icon: MapPin,
      title: "Office Location",
      info: "San Francisco, CA",
      description: "Visit us by appointment only",
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      info: "Available in app",
      description: "Instant support through our AI assistant",
      color: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50"
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
                <Heart className="w-5 h-5 text-green-600 animate-pulse" />
                <span className="text-sm font-bold text-green-700">We're Here to Help</span>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Contact{' '}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Us
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
                We're here to help with your mental wellness journey. Reach out to us anytime 
                for support, questions, or feedback.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Enhanced Contact Form */}
              <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
                
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900 font-bold">Send us a message</CardTitle>
                      <p className="text-gray-600 font-medium">We'll get back to you within 24 hours</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-gray-900 font-bold">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          className="bg-white border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl h-12 font-medium shadow-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-gray-900 font-bold">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                          className="bg-white border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl h-12 font-medium shadow-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="subject" className="text-gray-900 font-bold">Subject</Label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        placeholder="How can we help?" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        required 
                        className="bg-white border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl h-12 font-medium shadow-sm"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-gray-900 font-bold">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Tell us more about your inquiry..." 
                        rows={5} 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        className="bg-white border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-200 rounded-xl font-medium shadow-sm resize-none"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white h-14 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                      <span className="flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Enhanced Contact Information */}
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <Card key={index} className={`group bg-gradient-to-br ${contact.bgGradient} shadow-xl hover:shadow-2xl border-0 transition-all duration-300 hover:scale-105 overflow-hidden`}>
                    {/* Decorative elements */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${contact.color} opacity-10 rounded-full -translate-y-8 translate-x-8`}></div>
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <contact.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 text-lg">{contact.title}</h3>
                          <p className="text-lg font-bold text-gray-800 mb-1">{contact.info}</p>
                          <p className="text-sm text-gray-700 font-medium">{contact.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced FAQ Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 shadow-lg border border-green-200/50 mb-6">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-green-700">Frequently Asked Questions</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Common Questions About MindMate AI
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Is MindMate AI a replacement for therapy?</h3>
                    <p className="text-gray-700 font-medium">No, MindMate AI is designed to complement, not replace, professional mental health care. Always consult with a licensed therapist for serious mental health concerns.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">How secure is my data?</h3>
                    <p className="text-gray-700 font-medium">We use end-to-end encryption and are HIPAA compliant. Your conversations and personal data are never shared with third parties.</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200/50 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Can I cancel my subscription anytime?</h3>
                    <p className="text-gray-700 font-medium">Yes, you can cancel your subscription at any time through your account settings. You'll continue to have access until the end of your billing period.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200/50 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">What if I'm in crisis?</h3>
                    <p className="text-gray-700 font-medium">If you're in immediate danger, please contact emergency services. MindMate AI can detect crisis keywords and will provide emergency resources when needed.</p>
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

export default Contact;