import React, { createContext, useState, useContext, useEffect } from 'react';
import { dummyEvents } from '../data/events';
import { Event } from '../types';

interface EventContextType {
  events: Event[];
  featuredEvents: Event[];
  trendingEvents: Event[];
  upcomingEvents: Event[];
  getEventById: (id: string) => Event | undefined;
  searchEvents: (term: string) => Event[];
  filterEvents: (filter: EventFilter) => Event[];
}

interface EventFilter {
  category?: string[];
  date?: {
    start?: string;
    end?: string;
  };
  price?: {
    min?: number;
    max?: number;
  };
  location?: string;
  isFree?: boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // In a real app, fetch from API
    setEvents(dummyEvents);
    
    // Set featured events (for example, some with highest attendance)
    const featured = [...dummyEvents].sort((a, b) => b.attendees - a.attendees).slice(0, 5);
    setFeaturedEvents(featured);
    
    // Set trending events (for demonstration, just random selection)
    const trending = [...dummyEvents].sort(() => 0.5 - Math.random()).slice(0, 6);
    setTrendingEvents(trending);
    
    // Set upcoming events (normally would be sorted by date)
    const upcoming = [...dummyEvents].slice(0, 8);
    setUpcomingEvents(upcoming);
  }, []);
  
  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };
  
  const searchEvents = (term: string) => {
    if (!term) return events;
    
    const lowercaseTerm = term.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(lowercaseTerm) ||
      event.description.toLowerCase().includes(lowercaseTerm) ||
      event.location.toLowerCase().includes(lowercaseTerm) ||
      event.category.toLowerCase().includes(lowercaseTerm)
    );
  };
  
  const filterEvents = (filter: EventFilter) => {
    return events.filter(event => {
      // Filter by category
      if (filter.category && filter.category.length > 0) {
        if (!filter.category.includes(event.category.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by date range
      if (filter.date?.start) {
        const startDate = new Date(filter.date.start);
        const eventDate = new Date(event.rawDate);
        if (eventDate < startDate) {
          return false;
        }
      }
      
      if (filter.date?.end) {
        const endDate = new Date(filter.date.end);
        const eventDate = new Date(event.rawDate);
        if (eventDate > endDate) {
          return false;
        }
      }
      
      // Filter by price range
      if (filter.price?.min !== undefined && !event.isFree) {
        if (event.price < filter.price.min) {
          return false;
        }
      }
      
      if (filter.price?.max !== undefined && !event.isFree) {
        if (event.price > filter.price.max) {
          return false;
        }
      }
      
      // Filter by free events
      if (filter.isFree !== undefined) {
        if (filter.isFree !== event.isFree) {
          return false;
        }
      }
      
      // Filter by location
      if (filter.location) {
        if (!event.location.toLowerCase().includes(filter.location.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  return (
    <EventContext.Provider value={{
      events,
      featuredEvents,
      trendingEvents,
      upcomingEvents,
      getEventById,
      searchEvents,
      filterEvents
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};