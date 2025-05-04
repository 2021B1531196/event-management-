import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Users, Calendar, Clock, MapPin } from 'lucide-react';
import { Event } from '../types/event';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`}>
      <div className="card overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={event.coverImage} 
            alt={event.title} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {event.featured && (
            <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-bold px-2 py-1">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{event.title}</h3>
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary-100 text-primary-800">
              {event.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {event.description}
          </p>
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <span>{format(new Date(event.startTime), 'EEEE, MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-gray-400" />
              <span>{format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-gray-400" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src={event.organizer.avatar} 
                alt={event.organizer.name} 
                className="h-6 w-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-700">{event.organizer.name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users size={16} className="mr-1" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;