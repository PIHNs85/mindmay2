import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-mindmate-text-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-mindmate-green rounded-full">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MindMate AI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your compassionate AI companion for mental wellness. 
              Supporting thousands on their journey to better mental health.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-mindmate-green rounded-full flex items-center justify-center hover:bg-mindmate-green-light transition-colors cursor-pointer">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-mindmate-green rounded-full flex items-center justify-center hover:bg-mindmate-green-light transition-colors cursor-pointer">
                <span className="text-xs font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-mindmate-green rounded-full flex items-center justify-center hover:bg-mindmate-green-light transition-colors cursor-pointer">
                <span className="text-xs font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/ai-chat" className="text-gray-300 hover:text-mindmate-green transition-colors">AI Chat Therapy</Link></li>
              <li><Link to="/ai-calls" className="text-gray-300 hover:text-mindmate-green transition-colors">AI Voice Calls</Link></li>
              <li><Link to="/brain-training" className="text-gray-300 hover:text-mindmate-green transition-colors">Brain Training</Link></li>
              <li><Link to="/sleep-aid" className="text-gray-300 hover:text-mindmate-green transition-colors">Sleep & Relaxation</Link></li>
              <li><Link to="/exercises" className="text-gray-300 hover:text-mindmate-green transition-colors">Therapeutic Exercises</Link></li>
              <li><Link to="/progress" className="text-gray-300 hover:text-mindmate-green transition-colors">Progress Tracking</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-300 hover:text-mindmate-green transition-colors">FAQ</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-mindmate-green transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-mindmate-green transition-colors">Contact Us</Link></li>
              <li><Link to="/crisis" className="text-gray-300 hover:text-mindmate-green transition-colors">Crisis Support</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-mindmate-green transition-colors">Community</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-mindmate-green transition-colors">Mental Health Resources</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-mindmate-green" />
                <span className="text-gray-300">hello@mindmateai.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-mindmate-green" />
                <span className="text-gray-300">1-800-MINDMATE</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-mindmate-green" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="font-medium mb-3">Stay Updated</h4>
              <div className="flex space-x-2">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:border-mindmate-green focus:outline-none" />
                <button className="bg-mindmate-green hover:bg-mindmate-green-dark px-4 py-2 rounded-lg transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-300">
              <Link to="/privacy" className="hover:text-mindmate-green transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-mindmate-green transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-mindmate-green transition-colors">Medical Disclaimer</Link>
              <Link to="/cookies" className="hover:text-mindmate-green transition-colors">Cookie Policy</Link>
            </div>
            <div className="text-sm text-gray-400">© 2025 MindMate AI. All rights reserved.</div>
          </div>

          {/* Important Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-mindmate-green">Important:</strong> MindMate AI is designed to support your mental wellness journey 
                but is not a replacement for professional mental health care. If you're experiencing a mental health crisis, 
                please contact emergency services or a mental health professional immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;