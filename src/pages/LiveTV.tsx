
import React from 'react';
import Navbar from '../components/Navbar';
import ContentCard from '../components/ContentCard';
import { mockLiveTV } from '../data/mockData';

const LiveTV = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 lg:px-12 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Live TV</h1>
          <p className="text-gray-400 text-lg">Watch live channels and streaming events</p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center mb-8">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-red-500 font-semibold">LIVE NOW</span>
        </div>

        {/* Live TV Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {mockLiveTV.map((channel) => (
            <ContentCard key={channel.id} item={channel} />
          ))}
        </div>

        {/* Schedule Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">TV Schedule</h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="space-y-4">
              {mockLiveTV.map((channel, index) => (
                <div key={channel.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={channel.thumbnail}
                      alt={channel.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-white font-medium">{channel.title}</h3>
                      <p className="text-gray-400 text-sm">{channel.genre.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {new Date(Date.now() + index * 3600000).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="text-gray-400 text-sm">60 min</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
