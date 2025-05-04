import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-primary-600">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Virtual event"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 mix-blend-multiply" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Virtual Events</span>
            <span className="block text-secondary-300">For Real Connections</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-secondary-100 sm:max-w-3xl">
            Host and join interactive online events from anywhere in the world. 
            Connect with like-minded people and grow your network.
          </p>
          
          <div className="mt-10 max-w-xl mx-auto">
            <div className="flex items-center justify-center px-4">
              <div className="w-full max-w-lg glass rounded-full">
                <div className="flex items-center px-3 py-2">
                  <Search className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for events..."
                    className="ml-2 w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/events" className="btn btn-lg btn-secondary font-semibold">
                Explore Events
              </Link>
              <Link to="/create-event" className="btn btn-lg btn-accent font-semibold">
                Host an Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;