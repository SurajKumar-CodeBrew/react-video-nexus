
import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Maximize, Star, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import ContentCard from '../components/ContentCard';
import { mockMovies, mockSeries, mockLiveTV } from '../data/mockData';

const Watch = () => {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Find the content item
  const allContent = [...mockMovies, ...mockSeries, ...mockLiveTV];
  const item = allContent.find(content => content.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Content not found</h1>
          <Link to="/" className="text-red-500 hover:text-red-400">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  // Get related content
  const relatedContent = allContent
    .filter(content => 
      content.id !== item.id && 
      content.genre.some(genre => item.genre.includes(genre))
    )
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Video Player Section */}
      <div className="pt-16">
        {/* Back Button */}
        <div className="px-4 md:px-8 lg:px-12 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Video Player */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="w-full h-[50vh] md:h-[70vh] object-cover"
            poster={item.thumbnail}
            onTimeUpdate={handleProgress}
            onEnded={() => setIsPlaying(false)}
          >
            {/* Demo video source - in real app, this would be the actual video URL */}
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="w-full p-6">
              {/* Progress Bar */}
              <div className="w-full bg-gray-600 h-1 rounded-full mb-4">
                <div
                  className="bg-red-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white fill-current" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                <button
                  onClick={handleFullscreen}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Play Button Center */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <Play className="w-10 h-10 text-white fill-current" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-4xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {item.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-300 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{item.rating}</span>
                </div>
                <span>{item.year}</span>
                <div className="flex space-x-2">
                  {item.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
            <p className="text-gray-300 leading-relaxed">
              {item.type === 'movie' 
                ? `An amazing ${item.genre.join(', ').toLowerCase()} movie that will keep you on the edge of your seat. With stunning visuals and incredible storytelling, this ${item.year} masterpiece has earned a rating of ${item.rating} stars.`
                : item.type === 'series'
                ? `A captivating ${item.genre.join(', ').toLowerCase()} series that explores complex themes and characters. This ${item.year} series has been praised by critics and audiences alike, earning an impressive ${item.rating} star rating.`
                : `Experience live ${item.genre.join(', ').toLowerCase()} content streaming 24/7. This channel offers the best in live entertainment with a ${item.rating} star viewer rating.`
              }
            </p>
          </div>

          {/* Cast & Crew (Mock) */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Cast & Crew</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Director: John Smith', 'Lead Actor: Jane Doe', 'Producer: Mike Johnson', 'Writer: Sarah Wilson'].map((credit, index) => (
                <div key={index} className="text-gray-300">
                  <div className="font-medium">{credit.split(': ')[1]}</div>
                  <div className="text-sm text-gray-500">{credit.split(': ')[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <div className="px-4 md:px-8 lg:px-12 pb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            More Like This
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {relatedContent.map((content) => (
              <ContentCard key={content.id} item={content} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;
