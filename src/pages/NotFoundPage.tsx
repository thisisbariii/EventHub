import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full px-6 py-12 bg-white dark:bg-gray-800 shadow-xl rounded-xl text-center">
        <Calendar className="h-16 w-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
        
        <h1 className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;