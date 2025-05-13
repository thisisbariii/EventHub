import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Event } from '../../types';
import CategoryBadge from './CategoryBadge';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const {
    id,
    title,
    date,
    time,
    location,
    image,
    category,
    attendees,
    isFree,
    price
  } = event;

  return (
    <Link
      to={`/events/${id}`}
      className={`group relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      <div 
        className={`relative overflow-hidden ${
          featured ? 'md:w-2/5 aspect-auto' : 'aspect-[16/9]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-20">
          <CategoryBadge category={category} />
        </div>
        {!featured && (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h3 className="text-white text-xl font-bold line-clamp-1">{title}</h3>
          </div>
        )}
      </div>

      <div 
        className={`flex flex-col p-5 ${
          featured ? 'md:w-3/5 md:p-6' : ''
        }`}
      >
        {featured && (
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
        )}

        <div className="mt-auto space-y-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{date}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{time}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{location}</span>
          </div>
          
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">{attendees} attending</span>
            </div>
            
            <div className="font-medium">
              {isFree ? (
                <span className="text-green-600 dark:text-green-400">Free</span>
              ) : (
                <span className="text-purple-600 dark:text-purple-400">${price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/5 dark:group-hover:bg-purple-500/10 transition-colors duration-300" />
    </Link>
  );
};

export default EventCard;