
import React, { useState } from 'react';
import { User, Settings, Heart, Clock, Download, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';
import ContentCard from '../components/ContentCard';
import { mockMovies, mockSeries } from '../data/mockData';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('watchlist');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'Premium',
    joinedDate: 'January 2024'
  };

  // Mock user's content
  const watchlist = [...mockMovies.slice(0, 4), ...mockSeries.slice(0, 4)];
  const recentlyWatched = [...mockMovies.slice(4, 8), ...mockSeries.slice(4, 8)];
  const favorites = [...mockMovies.slice(8, 12), ...mockSeries.slice(2, 4)];

  const tabs = [
    { id: 'watchlist', label: 'My Watchlist', icon: Clock, content: watchlist },
    { id: 'recent', label: 'Recently Watched', icon: Clock, content: recentlyWatched },
    { id: 'favorites', label: 'Favorites', icon: Heart, content: favorites },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-8 lg:px-12 pb-20">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-12">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {user.name}
            </h1>
            <p className="text-gray-400 mb-4">{user.email}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div>
                <span className="text-gray-500">Plan: </span>
                <span className="text-yellow-400 font-semibold">{user.plan}</span>
              </div>
              <div>
                <span className="text-gray-500">Member since: </span>
                <span>{user.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="text-2xl font-bold text-white mb-1">42</div>
            <div className="text-gray-400 text-sm">Movies Watched</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="text-2xl font-bold text-white mb-1">18</div>
            <div className="text-gray-400 text-sm">Series Completed</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="text-2xl font-bold text-white mb-1">156h</div>
            <div className="text-gray-400 text-sm">Hours Watched</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
            <div className="text-2xl font-bold text-white mb-1">23</div>
            <div className="text-gray-400 text-sm">Favorites</div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {tabs.find(tab => tab.id === activeTab)?.content.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>

        {/* Account Settings */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Subscription */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Subscription</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Plan</span>
                  <span className="text-yellow-400 font-medium">{user.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Billing</span>
                  <span className="text-white">Feb 15, 2024</span>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Auto-play next episode</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Download quality</span>
                  <select className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email notifications</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
