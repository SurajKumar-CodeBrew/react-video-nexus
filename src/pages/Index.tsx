
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContentSection from '../components/ContentSection';
import { mockMovies, mockSeries, mockLiveTV } from '../data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <div className="px-4 md:px-8 lg:px-12 pb-20">
        <ContentSection 
          title="Trending Now" 
          items={mockMovies.slice(0, 8)} 
          type="trending"
        />
        <ContentSection 
          title="Popular Movies" 
          items={mockMovies.slice(8, 16)} 
          type="movies"
        />
        <ContentSection 
          title="Latest Series" 
          items={mockSeries.slice(0, 8)} 
          type="series"
        />
        <ContentSection 
          title="Live TV" 
          items={mockLiveTV} 
          type="live"
        />
      </div>
    </div>
  );
};

export default Index;
