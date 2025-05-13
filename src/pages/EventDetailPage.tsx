import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Ticket, Share2, Heart, ChevronLeft, ArrowRight } from 'lucide-react';
import { dummyEvents } from '../data/events';
import CategoryBadge from '../components/events/CategoryBadge';
import { Event } from '../types';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  useEffect(() => {
    // In a real app, fetch from API
    const foundEvent = dummyEvents.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
      // Set document title
      document.title = `${foundEvent.title} | EventHub`;
    }
    
    // Scroll to top when event changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!event) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
      {/* Event Header */}
      <div 
        className="relative bg-purple-900 text-white py-16"
        style={{
          background: `linear-gradient(rgba(91, 33, 182, 0.9), rgba(91, 33, 182, 0.9)), url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4">
          <Link 
            to="/events" 
            className="inline-flex items-center text-purple-200 hover:text-white mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to events
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4">
                <CategoryBadge category={event.category} />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-y-3 gap-x-6 text-purple-200">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col md:items-end">
              <div className="flex gap-3 mb-5">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2.5 rounded-full ${
                    isLiked 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  } transition-colors`}
                  aria-label={isLiked ? "Unlike event" : "Like event"}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button 
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Share event"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg">
                <div className="text-sm text-purple-200 mb-1">Ticket price:</div>
                <div className="text-2xl font-bold">
                  {event.isFree ? 'Free' : `$${event.price}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {['details', 'schedule', 'speakers', 'location', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`px-5 py-4 font-medium whitespace-nowrap capitalize ${
                  activeTab === tab
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {activeTab === 'details' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  About This Event
                </h2>
                
                <div className="prose max-w-none dark:prose-invert prose-purple">
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.description}
                  </p>
                  
                  <h3>What You'll Experience</h3>
                  <ul>
                    <li>Professional networking opportunities with industry leaders</li>
                    <li>Hands-on workshops led by experts in the field</li>
                    <li>Exclusive access to new product demonstrations</li>
                    <li>Catered lunch and refreshments throughout the day</li>
                    <li>Certificate of attendance to add to your portfolio</li>
                  </ul>
                  
                  <h3>Who Should Attend</h3>
                  <p>
                    This event is perfect for professionals looking to expand their knowledge, 
                    network with peers, and stay updated on the latest industry trends. Whether 
                    you're a seasoned expert or just starting your career, there's something valuable 
                    for everyone.
                  </p>
                  
                  <h3>Additional Information</h3>
                  <p>
                    Please arrive 15 minutes early for registration. Bring your ticket (digital or printed) 
                    and a valid ID. Limited parking is available at the venue.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'schedule' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Event Schedule
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      time: '09:00 AM - 10:00 AM',
                      title: 'Registration & Networking Breakfast',
                      description: 'Get your badge, enjoy breakfast, and network with other attendees.'
                    },
                    {
                      time: '10:00 AM - 11:30 AM',
                      title: 'Keynote Presentation',
                      description: 'Opening remarks and keynote speech from our featured speaker.',
                      speaker: 'Sarah Johnson'
                    },
                    {
                      time: '11:45 AM - 12:45 PM',
                      title: 'Panel Discussion',
                      description: 'Industry experts discuss current trends and future directions.',
                      speaker: 'Various Panelists'
                    },
                    {
                      time: '01:00 PM - 02:00 PM',
                      title: 'Lunch Break',
                      description: 'Catered lunch with networking opportunities.'
                    },
                    {
                      time: '02:15 PM - 03:45 PM',
                      title: 'Interactive Workshops',
                      description: 'Choose from three specialized workshops focused on different aspects of the industry.',
                      speaker: 'Workshop Leaders'
                    },
                    {
                      time: '04:00 PM - 05:00 PM',
                      title: 'Closing Session & Networking',
                      description: 'Final thoughts, Q&A session, and farewell networking.'
                    }
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-purple-500 dark:border-purple-600 pl-4">
                      <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                        {item.time}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        {item.description}
                      </p>
                      {item.speaker && (
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          Presenter: {item.speaker}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'speakers' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Event Speakers
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Sarah Johnson',
                      role: 'Keynote Speaker',
                      bio: 'Sarah is a renowned expert in the field with over 15 years of experience.',
                      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    },
                    {
                      name: 'Michael Chen',
                      role: 'Industry Expert',
                      bio: 'Michael brings invaluable insights from his work with leading global organizations.',
                      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    },
                    {
                      name: 'Emily Rodriguez',
                      role: 'Workshop Leader',
                      bio: 'Emily specializes in innovative approaches to solving complex industry challenges.',
                      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    },
                    {
                      name: 'David Patel',
                      role: 'Panel Moderator',
                      bio: 'David has moderated discussions at over 50 major industry events worldwide.',
                      image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    }
                  ].map((speaker, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {speaker.name}
                        </h3>
                        <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                          {speaker.role}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {speaker.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'location' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Event Location
                </h2>
                
                <div className="mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4">
                    {/* Placeholder for map - in real app use Google Maps or similar */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                      Interactive Map Would Appear Here
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {event.location}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    123 Conference Center Way<br />
                    San Francisco, CA 94103
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Getting There</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        The venue is easily accessible by public transportation. The nearest subway 
                        station is Montgomery St, just a 5-minute walk away. Limited parking is available 
                        at the venue for $20 per day.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Nearby Accommodations</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        We've partnered with several nearby hotels to offer special rates for event attendees. 
                        Use code EVENT2025 when booking at any of the following hotels:
                      </p>
                      <ul className="text-gray-600 dark:text-gray-400 text-sm mt-2 list-disc list-inside">
                        <li>Grand Hotel (0.2 miles)</li>
                        <li>City Center Suites (0.4 miles)</li>
                        <li>Bayside Inn (0.7 miles)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Attendee Reviews
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      name: 'Alex Thompson',
                      rating: 5,
                      comment: 'This was one of the best organized events I\'ve attended. The speakers were excellent and the networking opportunities were invaluable.',
                      date: '2 days ago',
                      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    },
                    {
                      name: 'Maria Garcia',
                      rating: 4,
                      comment: 'Great content and speakers. The venue was a bit crowded but overall it was a worthwhile experience. Would recommend to colleagues.',
                      date: '1 week ago',
                      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    },
                    {
                      name: 'James Wilson',
                      rating: 5,
                      comment: 'Absolutely fantastic event! The workshops were hands-on and I learned so much that I can apply to my work immediately.',
                      date: '2 weeks ago',
                      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={review.image} 
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {review.name}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {review.date}
                            </span>
                          </div>
                          
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-5 h-5 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                }`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <button className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 flex items-center">
                    See all reviews
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Reserve Your Spot
              </h3>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Price:</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {event.isFree ? 'Free' : `$${event.price}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Availability:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {event.availability} spots left
                  </span>
                </div>
              </div>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center mb-4 transition-colors">
                <Ticket className="mr-2 h-5 w-5" />
                Register Now
              </button>
              
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Fast & secure checkout. No account necessary.
              </p>
            </div>
            
            {/* Organizer Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Event Organizer
              </h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Tech Innovations Inc"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Tech Innovations Inc
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Event Organizer
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Tech Innovations Inc specializes in creating engaging events that bring together industry professionals and thought leaders.
              </p>
              
              <Link 
                to="/organizer/tech-innovations"
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 text-sm flex items-center"
              >
                View organizer profile
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Similar Events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Similar Events
              </h3>
              
              <div className="space-y-4">
                {dummyEvents.slice(0, 3).map(similarEvent => (
                  <Link 
                    key={similarEvent.id}
                    to={`/events/${similarEvent.id}`}
                    className="flex gap-3 group"
                  >
                    <img 
                      src={similarEvent.image} 
                      alt={similarEvent.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {similarEvent.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {similarEvent.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;