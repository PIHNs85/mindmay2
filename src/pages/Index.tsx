
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import HeroSlideshow from '@/components/HeroSlideshow';
import ServicesShowcase from '@/components/ServicesShowcase';
import Testimonials from '@/components/Testimonials';
import MediaBanners from '@/components/MediaBanners';
import ImageGallery from '@/components/ImageGallery';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

console.log('[LOG][Index.tsx]: Index page component rendered');

const DebugBanner = () => (
  <div style={{ background: "#fde68a", color: "#78350f", fontWeight: "bold", padding: "8px", zIndex: 9999 }}>
    [Index.tsx] Top of / page (if you see this, main page is rendering)
  </div>
);

const Index = () => {
  return (
    <PageTransition>
      <DebugBanner />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10">
          <Navigation />
          
          {/* Hero Slideshow Section with enhanced styling */}
          <section className="pt-20 pb-8 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <HeroSlideshow />
            </div>
          </section>
          
          <Hero />
          <ServicesShowcase />
          <Testimonials />
          <MediaBanners />
          <ImageGallery />
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
