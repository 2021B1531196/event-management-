import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowRight } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(mockEvents[0]);
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(() => {
    // Find event by id
    const foundEvent = mockEvents.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
    
    // Check if user is registered
    const registrations = JSON.parse(localStorage.getItem('registrations') || '{}');
    setIsRegistered(registrations[id as string] === true);
  }, [id]);
  
  const handleRegister = () => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }
    
    // Save registration to local storage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '{}');
    registrations[id as string] = true;
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    setIsRegistered(true);
  };

  if (!event) {
    return <div className="max-w-7xl mx-auto px-4 py-12">Event not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="relative h-96 bg-primary-900">
        <img 
          src={event.coverImage} 
          alt={event.title} 
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
          <div className="pb-12 text-white">
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white">
                {event.category}
              </span>
              {event.featured && (
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-500 text-white">
                  Featured
                </span>
              )}
            </div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{event.title}</h1>
            <div className="mt-4 flex flex-wrap items-center text-sm">
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="mr-2 h-5 w-5 text-primary-300" />
                <span>{format(new Date(event.startTime), 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Clock className="mr-2 h-5 w-5 text-primary-300" />
                <span>
                  {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
                </span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <MapPin className="mr-2 h-5 w-5 text-primary-300" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <Users className="mr-2 h-5 w-5 text-primary-300" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this event</h2>
              <p>{event.description}</p>
              <p>
                Join us for an engaging session where industry experts will share insights on the latest trends and best practices.
                This event is perfect for professionals looking to expand their knowledge and network with peers.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What you'll learn</h3>
              <ul>
                <li>Understanding the fundamentals of the topic</li>
                <li>Practical strategies and techniques</li>
                <li>Real-world case studies and applications</li>
                <li>Future trends and opportunities in the field</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Who should attend</h3>
              <ul>
                <li>Professionals in related fields</li>
                <li>Students and academics</li>
                <li>Enthusiasts and hobbyists</li>
                <li>Anyone looking to expand their knowledge</li>
              </ul>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event schedule</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Session {item}: {['Introduction', 'Main Discussion', 'Q&A and Networking'][item - 1]}
                        </h3>
                        <p className="text-gray-500">Speaker: {['John Smith', 'Emily Chen', 'David Wilson'][item - 1]}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                        {format(
                          new Date(new Date(event.startTime).getTime() + (item - 1) * 60 * 60 * 1000), 
                          'h:mm a'
                        )} - {format(
                          new Date(new Date(event.startTime).getTime() + item * 60 * 60 * 1000), 
                          'h:mm a'
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {[
                        'A welcoming introduction to the topic and overview of what will be covered.',
                        'Deep dive into the core concepts with practical examples and demonstrations.',
                        'Open discussion with the audience, addressing questions and sharing additional resources.'
                      ][item - 1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Register for this event</p>
                      <p className="text-sm text-gray-500">Secure your spot now</p>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </div>
                  </div>
                  
                  {isRegistered ? (
                    <div className="mb-6">
                      <div className="bg-success-50 text-success-700 px-4 py-3 rounded-md text-sm flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        You're registered for this event
                      </div>
                      
                      <Link 
                        to={`/events/${id}/room`}
                        className="mt-4 btn btn-lg btn-primary w-full flex items-center justify-center"
                      >
                        Enter Event Room <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleRegister}
                      className="btn btn-lg btn-primary w-full mb-4"
                      disabled={!isAuthenticated}
                    >
                      {isAuthenticated ? 'Register Now' : 'Login to Register'}
                    </button>
                  )}
                  
                  {!isAuthenticated && (
                    <p className="text-sm text-gray-500 text-center mb-4">
                      <Link to="/login" className="text-primary-600 hover:text-primary-700">
                        Sign in
                      </Link> or{' '}
                      <Link to="/register" className="text-primary-600 hover:text-primary-700">
                        create an account
                      </Link> to register for events
                    </p>
                  )}
                  
                  <div className="flex space-x-2">
                    <button className="btn btn-md btn-secondary flex-1 flex items-center justify-center">
                      <Heart className="mr-2 h-5 w-5" /> Save
                    </button>
                    <button className="btn btn-md btn-secondary flex-1 flex items-center justify-center">
                      <Share2 className="mr-2 h-5 w-5" /> Share
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Host</h4>
                  <div className="flex items-center">
                    <img 
                      src={event.organizer.avatar} 
                      alt={event.organizer.name} 
                      className="h-10 w-10 rounded-full" 
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{event.organizer.name}</p>
                      <p className="text-sm text-gray-500">{event.organizer.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;