import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Music, Trophy, Users, Briefcase, Sparkles } from 'lucide-react';

const categories = [
  {
    name: 'Conferences',
    icon: <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    description: 'Industry gatherings and professional meetups',
    color: 'bg-blue-500',
    link: '/events?category=conference'
  },
  {
    name: 'Workshops',
    icon: <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    description: 'Hands-on learning experiences',
    color: 'bg-green-500',
    link: '/events?category=workshop'
  },
  {
    name: 'Concerts',
    icon: <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    description: 'Live music performances and shows',
    color: 'bg-purple-500',
    link: '/events?category=concert'
  },
  {
    name: 'Sports',
    icon: <Trophy className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    description: 'Competitions, games, and athletic events',
    color: 'bg-red-500',
    link: '/events?category=sports'
  },
  {
    name: 'Networking',
    icon: <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    description: 'Connect with professionals in your field',
    color: 'bg-indigo-500',
    link: '/events?category=networking'
  },
  {
    name: 'Festivals',
    icon: <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    description: 'Celebrations and cultural events',
    color: 'bg-yellow-500',
    link: '/events?category=festival'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Events by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Browse through our diverse selection of categories to find events that match your interests
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;