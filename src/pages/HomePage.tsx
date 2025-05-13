
import Hero from '../components/home/Hero';
import EventList from '../components/events/EventList';
import { Link } from 'react-router-dom';
import { dummyEvents } from '../data/events';
import { ChevronRight, CalendarCheck, MapPin, Users, Zap, Award, Layers, Search, Calendar } from 'lucide-react';

const HomePage = () => {
  // For demonstration purposes, use dummy data
  const upcomingEvents = dummyEvents.slice(0, 6);
  const trendingEvents = [...dummyEvents].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Categories Section */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discover Events by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through our diverse selection of categories to find events that match your interests
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Conferences', 'Workshops', 'Concerts', 'Sports', 'Networking', 'Festivals'].map((category) => (
              <Link
                key={category}
                to={`/events?category=${category.toLowerCase()}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  {category === 'Conferences' && <Layers className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                  {category === 'Workshops' && <CalendarCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                  {category === 'Concerts' && <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                  {category === 'Sports' && <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                  {category === 'Networking' && <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                  {category === 'Festivals' && <MapPin className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Featured Events */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <Link 
              to="/events" 
              className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              View all
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <EventList events={upcomingEvents} showFeatured={true} />
        </section>
        
        {/* How It Works */}
        <section className="py-20 bg-purple-50 dark:bg-gray-800/30 rounded-3xl mb-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How EventHub Works
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Whether you're organizing an event or looking to attend one, we make the process seamless and enjoyable
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Discover Events',
                  description: 'Browse through thousands of events happening near you or around the world.',
                  icon: <Search className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                },
                {
                  title: 'Join & Engage',
                  description: 'Register for events, connect with attendees, and engage with event content.',
                  icon: <Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                },
                {
                  title: 'Create & Manage',
                  description: 'Easily create and manage your own events with our comprehensive tools.',
                  icon: <Calendar className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Trending Events */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
            <Link 
              to="/events?sort=trending" 
              className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              View all
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <EventList events={trendingEvents} />
        </section>
        
        {/* Call to Action */}
        <section className="rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 z-0" />
          <div className="absolute inset-0 opacity-20 z-10">
            <img 
              src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Event background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-20 py-16 px-8 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Your Own Event?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of successful event organizers on our platform and bring your ideas to life.
            </p>
            <Link
              to="/create-event"
              className="inline-block bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
            >
              Create Event Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;