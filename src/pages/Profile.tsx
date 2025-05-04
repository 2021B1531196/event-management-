import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Camera, MapPin, Calendar, Users } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'events' | 'settings'>('profile');
  
  // Mock data for user events
  const userEvents = [
    {
      id: '1',
      title: 'Web Development Workshop',
      date: '2025-05-15',
      attendees: 42,
      role: 'host'
    },
    {
      id: '2',
      title: 'Digital Marketing Conference',
      date: '2025-06-20',
      attendees: 156,
      role: 'attendee'
    },
    {
      id: '3',
      title: 'Product Design Meetup',
      date: '2025-07-10',
      attendees: 28,
      role: 'attendee'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">You must be logged in to view this page</h1>
        <p className="text-gray-600">Please sign in to access your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800"></div>
          <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
            <div className="relative">
              <img
                src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
                alt={user?.name}
                className="h-24 w-24 rounded-full border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-1 rounded-full">
                <Camera size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-6 px-4 sm:px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-1 text-center font-medium text-sm border-b-2 ${
                activeTab === 'profile'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`flex-1 py-4 px-1 text-center font-medium text-sm border-b-2 ${
                activeTab === 'events'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('events')}
            >
              My Events
            </button>
            <button
              className={`flex-1 py-4 px-1 text-center font-medium text-sm border-b-2 ${
                activeTab === 'settings'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-2">
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="font-medium">Full Name</span>
                    </div>
                    <p className="text-gray-900">{user?.name}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Mail className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="font-medium">Email</span>
                    </div>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="font-medium">Location</span>
                    </div>
                    <p className="text-gray-900">Not specified</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="font-medium">Joined</span>
                    </div>
                    <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Bio</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">No bio provided yet.</p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                      Technology
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                      Education
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                      Business
                    </span>
                    <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-200">
                      + Add more
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'events' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">My Events</h2>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-secondary">
                      Past Events
                    </button>
                    <button className="btn btn-sm btn-primary">
                      Upcoming Events
                    </button>
                  </div>
                </div>
                
                {userEvents.length > 0 ? (
                  <div className="space-y-4">
                    {userEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar size={16} className="mr-1" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <Users size={16} className="ml-3 mr-1" />
                            <span>{event.attendees} attendees</span>
                          </div>
                        </div>
                        <div className="ml-4 flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.role === 'host' 
                              ? 'bg-primary-100 text-primary-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {event.role === 'host' ? 'Hosting' : 'Attending'}
                          </span>
                          <button className="ml-3 btn btn-sm btn-secondary">View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No events yet</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't hosted or registered for any events yet.
                    </p>
                    <button className="btn btn-md btn-primary">Browse Events</button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                      <label htmlFor="username" className="form-label block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="form-input"
                        defaultValue={user?.name}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label block mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        defaultValue={user?.email}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="form-label block mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="form-input"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    
                    <button className="btn btn-md btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                      <label htmlFor="current-password" className="form-label block mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="form-label block mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="form-label block mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="form-input"
                      />
                    </div>
                    
                    <button className="btn btn-md btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails about event updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Reminder Notifications</p>
                        <p className="text-sm text-gray-500">Receive reminders before your events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Receive promotional emails and newsletters</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <button className="btn btn-md btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;