import React, { useState, useEffect } from 'react';

const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1400&h=600&fit=crop",
    title: "Italy: Where Every Street Feels Like a Story",
    description: "From the golden sunsets over Tuscany to the buzzing piazzas of Rome, Italy is a country where art, history, and passion collide. This article explores what makes Italy timeless and the everyday magic hidden in its simplest moments."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1400&h=600&fit=crop",
    title: "Discover the Heart of Europe",
    description: "Explore the breathtaking landscapes and rich cultural heritage of Europe's most enchanting destinations. From alpine peaks to Mediterranean shores, every journey tells a story."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=600&fit=crop",
    title: "Adventure Awaits in Nature's Paradise",
    description: "Immerse yourself in the beauty of untouched wilderness and vibrant cities. Experience the perfect blend of adventure, culture, and unforgettable memories."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <img
            src={carouselData[currentSlide].image}
            alt={carouselData[currentSlide].title}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="absolute pb-6 inset-0 flex flex-col justify-end px-12 lg:px-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-5xl text-white mb-3 leading-tight transition-all duration-1000" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                {carouselData[currentSlide].title}
              </h1>
              <p className="text-white/90 text-md leading-relaxed transition-all duration-1000 mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {carouselData[currentSlide].description}
              </p>
            </div>
          </div>

          {/* Navigation Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
