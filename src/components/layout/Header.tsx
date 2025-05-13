import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, PlusCircle, User, Search } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-purple-700 dark:text-purple-400"
        >
          <Calendar className="h-7 w-7" />
          <span className="hidden sm:inline">EventHub</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/events" 
            className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Explore Events
          </Link>
          <Link 
            to="/create-event" 
            className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Create Event
          </Link>
          <Link 
            to="/dashboard" 
            className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Dashboard
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <ThemeToggle />
          <Link 
            to="/profile" 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-800 dark:text-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            to="/events" 
            className="flex items-center py-2 text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Explore Events
          </Link>
          <Link 
            to="/create-event" 
            className="flex items-center py-2 text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Event
          </Link>
          <Link 
            to="/dashboard" 
            className="flex items-center py-2 text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <User className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center py-2 text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </Link>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <ThemeToggle />
            <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;