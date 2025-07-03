
import React, { useState } from 'react';
import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  year: number;
  rating: number;
  genre: string[];
  type: 'movie' | 'series' | 'live';
}

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard = ({ item }: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/watch/${item.id}`} className="block">
      <div
        className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-800">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
            <span className="text-white text-xs font-medium">{item.rating}</span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 left-2">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              item.type === 'movie' ? 'bg-blue-600 text-white' :
              item.type === 'series' ? 'bg-green-600 text-white' :
              'bg-red-600 text-white'
            }`}>
              {item.type.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content Info */}
        <div className="mt-3">
          <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
            {item.title}
          </h3>
          <div className="flex items-center mt-1 text-xs text-gray-400">
            <span>{item.year}</span>
            <span className="mx-2">•</span>
            <span>{item.genre[0]}</span>
          </div>
        </div>

        {/* Hover Card */}
        {isHovered && (
          <div className="absolute top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 transform translate-y-[-100%] opacity-0 group-hover:opacity-100 group-hover:translate-y-[-105%] transition-all duration-300 z-20 border border-gray-700">
            <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
            <div className="flex items-center text-xs text-gray-300 mb-2">
              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
              <span className="mr-3">{item.rating}</span>
              <span>{item.year}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {item.genre.slice(0, 2).map((g) => (
                <span key={g} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ContentCard;
