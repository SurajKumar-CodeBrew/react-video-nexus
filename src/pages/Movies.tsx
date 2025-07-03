
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ContentCard from '../components/ContentCard';
import { mockMovies } from '../data/mockData';

const Movies = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const genres = ['all', 'Action', 'Sci-Fi', 'Drama', 'Comedy', 'Thriller', 'Romance'];

  const filteredMovies = mockMovies
    .filter(movie => filter === 'all' || movie.genre.includes(filter))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 lg:px-12 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Movies</h1>
          <p className="text-gray-400 text-lg">Discover amazing movies from all genres</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setFilter(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === genre
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 outline-none"
          >
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredMovies.map((movie) => (
            <ContentCard key={movie.id} item={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
