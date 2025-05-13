import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventList from '../components/events/EventList';
import { dummyEvents } from '../data/events';
import { Calendar, Filter, Search, X } from 'lucide-react';
import { Event } from '../types';

const EventsPage = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({
    start: '',
    end: ''
  });

  // Initialize with query params if available
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories([category]);
    }
    
    // Load events from API (using dummy data for now)
    setEvents(dummyEvents);
  }, [searchParams]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = [...events];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event => 
        selectedCategories.includes(event.category.toLowerCase())
      );
    }
    
    // Apply date range filter
    if (dateRange.start) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.rawDate);
        const startDate = new Date(dateRange.start);
        return eventDate >= startDate;
      });
    }
    
    if (dateRange.end) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.rawDate);
        const endDate = new Date(dateRange.end);
        return eventDate <= endDate;
      });
    }
    
    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategories, dateRange]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setDateRange({ start: '', end: '' });
  };

  const categories = [
    'conference', 
    'workshop', 
    'concert', 
    'sports', 
    'networking',
    'festival'
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Events
          </h1>
          <p className="text-purple-200 max-w-2xl">
            Browse through thousands of events happening around you. Use filters to find exactly what you're looking for.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {(selectedCategories.length > 0 || dateRange.start || dateRange.end) && (
                <span className="ml-1 flex items-center justify-center w-5 h-5 bg-purple-600 text-white text-xs rounded-full">
                  {selectedCategories.length + (dateRange.start ? 1 : 0) + (dateRange.end ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
          
          {/* Filters Panel */}
          {isFiltersOpen && (
            <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedCategories.includes(category)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        } transition-colors`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Date Range</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">From</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input 
                          type="date" 
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">To</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input 
                          type="date"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button 
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredEvents.length} Events Found
            </h2>
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
              <select 
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
              >
                <option value="date">Date (Upcoming)</option>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>
          </div>
          
          <EventList events={filteredEvents} />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;