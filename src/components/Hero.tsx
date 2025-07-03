
import React, { useState, useEffect } from 'react';
import { Play, Video } from 'lucide-react';
import { mockFeatured } from '../data/mockData';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockFeatured.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentItem = mockFeatured[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentItem.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
              {currentItem.type}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            {currentItem.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
            {currentItem.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
              <Play className="w-5 h-5 mr-2 fill-current" />
              Play Now
            </button>
            
            <button className="flex items-center justify-center px-8 py-3 bg-gray-800/50 text-white font-semibold rounded-lg border border-gray-600 hover:bg-gray-700/50 transition-all duration-200 backdrop-blur-sm">
              <Video className="w-5 h-5 mr-2" />
              Watch Trailer
            </button>
          </div>

          {/* Rating and Info */}
          <div className="flex items-center mt-6 space-x-6 text-sm text-gray-300">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{currentItem.rating}</span>
            </div>
            <span>{currentItem.year}</span>
            <span className="px-2 py-1 border border-gray-600 rounded text-xs">
              {currentItem.ageRating}
            </span>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-4 md:left-8 lg:left-12 flex space-x-2">
        {mockFeatured.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
