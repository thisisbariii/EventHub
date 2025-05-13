import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <Calendar className="h-6 w-6 text-purple-400" />
              <span>EventHub</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Discover, create, and manage events that matter to you. Join our community of event enthusiasts today.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Find Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-purple-400 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events?category=conferences" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Conferences
                </Link>
              </li>
              <li>
                <Link to="/events?category=workshops" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/events?category=concerts" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Concerts
                </Link>
              </li>
              <li>
                <Link to="/events?category=sports" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/events?category=networking" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Networking
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <div>
            &copy; {currentYear} EventHub. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            Made with ❤️ for event lovers everywhere
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;