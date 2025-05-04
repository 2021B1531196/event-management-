import React from 'react';
import { Globe, Users, Video, Calendar, MessageSquare, ShieldCheck } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: 'Global Reach',
      description: 'Connect with attendees from around the world without geographical limitations.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: 'Networking',
      description: 'Build your professional network through interactive sessions and discussions.'
    },
    {
      icon: <Video className="h-8 w-8 text-primary-600" />,
      title: 'HD Streaming',
      description: 'High-quality video streaming for a seamless viewing experience.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-600" />,
      title: 'Easy Scheduling',
      description: 'Create and manage events with our intuitive scheduling tools.'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-600" />,
      title: 'Live Interaction',
      description: 'Engage with speakers and attendees through chat, Q&A, and polls.'
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary-600" />,
      title: 'Secure Platform',
      description: 'Your data and conversations are protected with enterprise-grade security.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Eventify</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides everything you need to host successful virtual events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg 
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="rounded-full bg-primary-100 p-3 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;