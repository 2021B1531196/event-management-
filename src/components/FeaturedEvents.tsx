import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { Event } from '../types/event';
import { mockEvents } from '../data/mockEvents';

const FeaturedEvents: React.FC = () => {
  // Filter featured events
  const featuredEvents = mockEvents.filter(event => event.featured).slice(0, 3);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join these popular upcoming events from top creators and organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/events" className="btn btn-lg btn-primary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;