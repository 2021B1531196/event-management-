import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedEvents from '../components/FeaturedEvents';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import UpcomingEvents from '../components/UpcomingEvents';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedEvents />
      <Benefits />
      
      <section className="py-16 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7173026/pexels-photo-7173026.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Virtual event"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary-600 mix-blend-multiply" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to host your first event?</h2>
          <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
            Get started in minutes and connect with attendees from around the world.
          </p>
          <div className="mt-8">
            <Link to="/create-event" className="btn btn-lg btn-accent">
              Host an Event
            </Link>
          </div>
        </div>
      </section>
      
      <UpcomingEvents />
      <Testimonials />
    </div>
  );
};

export default Home;