import React, { useState } from 'react';
import EventCard from './EventCard';
import { mockEvents } from '../data/mockEvents';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';

const UpcomingEvents: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', ...new Set(mockEvents.map(event => event.category))];
  
  const filteredEvents = activeCategory === 'all' 
    ? mockEvents
    : mockEvents.filter(event => event.category === activeCategory);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover events that match your interests and fit your schedule
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.slice(0, 6).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UpcomingEvents;