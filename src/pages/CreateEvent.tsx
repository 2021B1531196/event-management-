import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, Image, Users } from 'lucide-react';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: 'Virtual',
    coverImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: '0',
    maxAttendees: '100',
    featured: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Create new event
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      startTime: new Date(`${formData.startDate}T${formData.startTime}`).toISOString(),
      endTime: new Date(`${formData.endDate}T${formData.endTime}`).toISOString(),
      location: formData.location,
      coverImage: formData.coverImage,
      price: parseFloat(formData.price),
      featured: formData.featured,
      attendees: 1,
      organizer: {
        id: user?.id || '',
        name: user?.name || '',
        role: 'Host',
        avatar: user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`
      }
    };
    
    // In a real app, this would be an API call
    // For now, just navigate to the events page
    navigate('/events');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create an Event</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="form-label block mb-1">
                    Event Title <span className="text-accent-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input w-full"
                    placeholder="Give your event a catchy title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="form-label block mb-1">
                    Description <span className="text-accent-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="form-input w-full"
                    placeholder="Tell people what your event is about"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="form-label block mb-1">
                    Category <span className="text-accent-600">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select w-full"
                    required
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health & Wellness</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Arts">Arts & Culture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Date and Time */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Date and Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <Calendar className="text-gray-400 mr-1 h-4 w-4" />
                    <label htmlFor="startDate" className="form-label">
                      Start Date <span className="text-accent-600">*</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Clock className="text-gray-400 mr-1 h-4 w-4" />
                    <label htmlFor="startTime" className="form-label">
                      Start Time <span className="text-accent-600">*</span>
                    </label>
                  </div>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="form-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Calendar className="text-gray-400 mr-1 h-4 w-4" />
                    <label htmlFor="endDate" className="form-label">
                      End Date <span className="text-accent-600">*</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Clock className="text-gray-400 mr-1 h-4 w-4" />
                    <label htmlFor="endTime" className="form-label">
                      End Time <span className="text-accent-600">*</span>
                    </label>
                  </div>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="form-input w-full"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Location and Image */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location and Visuals</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <MapPin className="text-gray-400 mr-1 h-4 w-4" />
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input w-full"
                    placeholder="e.g., Virtual, Zoom, Google Meet"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Image className="text-gray-400 mr-1 h-4 w-4" />
                    <label htmlFor="coverImage" className="form-label">
                      Cover Image URL
                    </label>
                  </div>
                  <input
                    type="text"
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="form-input w-full"
                    placeholder="Image URL for your event cover"
                  />
                  {formData.coverImage && (
                    <div className="mt-2 relative rounded-md overflow-hidden h-40">
                      <img 
                        src={formData.coverImage} 
                        alt="Event cover preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Additional Settings */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <label htmlFor="price" className="form-label">
                      Price ($)
                    </label>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input w-full"
                    min="0"
                    step="0.01"
                    placeholder="0 for free events"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Users className="text-gray-400 mr-1 h-4 w-4" />
                    <label htmlFor="maxAttendees" className="form-label">
                      Maximum Attendees
                    </label>
                  </div>
                  <input
                    type="number"
                    id="maxAttendees"
                    name="maxAttendees"
                    value={formData.maxAttendees}
                    onChange={handleChange}
                    className="form-input w-full"
                    min="1"
                    placeholder="Leave empty for unlimited"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      className="form-checkbox"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                      Feature this event on the homepage (premium feature)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="btn btn-lg btn-primary w-full md:w-auto"
                disabled={!isAuthenticated}
              >
                Create Event
              </button>
              
              {!isAuthenticated && (
                <p className="mt-2 text-sm text-accent-600">
                  You must be logged in to create events
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;