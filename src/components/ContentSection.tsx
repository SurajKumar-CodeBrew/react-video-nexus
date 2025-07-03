
import React from 'react';
import ContentCard from './ContentCard';

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  year: number;
  rating: number;
  genre: string[];
  type: 'movie' | 'series' | 'live';
}

interface ContentSectionProps {
  title: string;
  items: ContentItem[];
  type: string;
}

const ContentSection = ({ title, items, type }: ContentSectionProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        {title}
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ContentSection;
