import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyEvents } from '../data/events';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingEvents = dummyEvents.slice(0, 3);
  const pastEvents = dummyEvents.slice(4, 6);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: "Event enthusiast and networking professional. I love attending tech conferences and music festivals equally!"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, send to API
    setIsEditing(false);
    // Show success message
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="relative h-40 bg-gradient-to-r from-purple-600 to-indigo-600">
              <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative px-6 py-6 md:px-8 -mt-16">
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="relative inline-block">
                    <img
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                          className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-purple-500 w-full"
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {profile.name}
                        </h1>
                      )}
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4 mr-1" />
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={profile.email}
                              onChange={handleChange}
                              className="text-sm bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-purple-500"
                            />
                          ) : (
                            <span className="text-sm">{profile.email}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Phone className="h-4 w-4 mr-1" />
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={profile.phone}
                              onChange={handleChange}
                              className="text-sm bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-purple-500"
                            />
                          ) : (
                            <span className="text-sm">{profile.phone}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-1" />
                          {isEditing ? (
                            <input
                              type="text"
                              name="location"
                              value={profile.location}
                              onChange={handleChange}
                              className="text-sm bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-purple-500"
                            />
                          ) : (
                            <span className="text-sm">{profile.location}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">Member since April 2023</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      {isEditing ? (
                        <button
                          onClick={handleSave}
                          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 dark:text-gray-300"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Events Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                {[
                  { id: 'upcoming', label: 'Upcoming Events' },
                  { id: 'past', label: 'Past Events' },
                  { id: 'saved', label: 'Saved Events' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              {activeTab === 'upcoming' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    You're attending these upcoming events
                  </h3>
                  
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <Link
                        key={event.id}
                        to={`/events/${event.id}`}
                        className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        
                        <div className="ml-4 flex-1">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {event.title}
                          </h4>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {event.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                          Confirmed
                        </span>
                      </Link>
                    ))}
                    
                    {upcomingEvents.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">
                          You haven't registered for any upcoming events.
                        </p>
                        <Link
                          to="/events"
                          className="inline-flex items-center px-4 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                          Find Events
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'past' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Events you've attended
                  </h3>
                  
                  <div className="space-y-4">
                    {pastEvents.map(event => (
                      <Link
                        key={event.id}
                        to={`/events/${event.id}`}
                        className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 grayscale"
                        />
                        
                        <div className="ml-4 flex-1">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {event.title}
                          </h4>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {event.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          Attended
                        </span>
                      </Link>
                    ))}
                    
                    {pastEvents.length === 0 && (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">
                          You haven't attended any events yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'saved' && (
                <div className="text-center py-8">
                  <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't saved any events yet.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Save events you're interested in to view them later.
                  </p>
                  <Link
                    to="/events"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Explore Events
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;