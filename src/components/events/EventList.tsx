import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types';

interface EventListProps {
  events: Event[];
  title?: string;
  showFeatured?: boolean;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  title, 
  showFeatured = false 
}) => {
  // If showFeatured is true, display the first event as featured
  const featuredEvent = showFeatured && events.length > 0 ? events[0] : null;
  const regularEvents = showFeatured && events.length > 0 ? events.slice(1) : events;

  return (
    <section className="py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      )}
      
      <div className="space-y-8">
        {featuredEvent && (
          <div className="mb-10">
            <EventCard event={featuredEvent} featured={true} />
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No events found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;