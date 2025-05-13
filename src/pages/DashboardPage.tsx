import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit, Trash2, Users, BarChart2, Eye, PlusCircle } from 'lucide-react';
import { dummyEvents } from '../data/events';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('myEvents');
  const [events, setEvents] = useState(dummyEvents.slice(0, 5));
  
  const handleDeleteEvent = (id: string) => {
    // In a real app, call API to delete
    setEvents(events.filter(event => event.id !== id));
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your events and track performance
            </p>
          </div>
          
          <Link
            to="/create-event"
            className="flex items-center justify-center px-4 py-2 mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Event
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto hide-scrollbar">
              {[
                { id: 'myEvents', label: 'My Events' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'attendees', label: 'Attendees' },
                { id: 'tickets', label: 'Tickets' },
                { id: 'settings', label: 'Settings' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
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
        </div>
        
        {/* Dashboard Content */}
        {activeTab === 'myEvents' && (
          <div className="space-y-8">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Total Events', value: '12', icon: <Calendar className="h-8 w-8 text-purple-500" /> },
                { title: 'Total Attendees', value: '1,245', icon: <Users className="h-8 w-8 text-teal-500" /> },
                { title: 'This Month\'s Revenue', value: '$4,320', icon: <BarChart2 className="h-8 w-8 text-pink-500" /> }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Events Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Events</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Event
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Attendees
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-md object-cover" 
                                src={event.image} 
                                alt={event.title} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {event.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {event.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {event.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {event.attendees} / {event.attendees + event.availability}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          ${event.isFree ? '0' : event.price * event.attendees}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              to={`/events/${event.id}`}
                              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                            <Link
                              to={`/edit-event/${event.id}`}
                              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {events.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      You haven't created any events yet.
                    </p>
                    <Link
                      to="/create-event"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                    >
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Create Your First Event
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h2>
            
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
              <p className="text-gray-500 dark:text-gray-400">Analytics charts and graphs would appear here</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Performing Events</h3>
                <div className="space-y-3">
                  {events.slice(0, 3).map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-5">
                          {index + 1}.
                        </span>
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                          {event.title}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {event.attendees} attendees
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue by Category</h3>
                <div className="space-y-3">
                  {['Conference', 'Workshop', 'Concert', 'Networking', 'Festival'].map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ${Math.floor(Math.random() * 5000) + 500}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {(activeTab === 'attendees' || activeTab === 'tickets' || activeTab === 'settings') && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {activeTab === 'attendees' && 'Attendees Management'}
              {activeTab === 'tickets' && 'Tickets Management'}
              {activeTab === 'settings' && 'Account Settings'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              This section is under construction. Check back soon for more features!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;