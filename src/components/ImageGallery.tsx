
import React from 'react';

const ImageGallery = () => {
  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop",
      caption: "Find peace of mind.",
      description: "Discover tranquility through guided meditation and mindfulness practices."
    },
    {
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop",
      caption: "Your daily check-in companion.",
      description: "Start each day with personalized mental wellness guidance and support."
    },
    {
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=400&fit=crop",
      caption: "Rewire your thinking — gently.",
      description: "Transform negative thought patterns with evidence-based cognitive techniques."
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
      caption: "Embrace clarity and focus.",
      description: "Build mental resilience through brain training and therapeutic exercises."
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop",
      caption: "Sleep better, feel restored.",
      description: "Experience deeper rest with calming sleep stories and relaxation techniques."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-mindmate-text-dark mb-4">
            Your Journey to Wellness
          </h2>
          <p className="text-xl text-mindmate-text-light max-w-3xl mx-auto">
            Experience the transformative power of AI-guided mental health support 
            through our comprehensive wellness platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl therapeutic-shadow hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {item.caption}
                  </h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-mindmate-gradient rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Mental Health?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who've found peace, clarity, and growth with MindMate AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-mindmate-green px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                Start Your Free Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-mindmate-green transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
