import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, ChefHat } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-display font-semibold text-white">Suvai Chaalai</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered South Indian Cuisine Recipe Generator and food ordering platform for bachelors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500">Home</Link>
              </li>
              <li>
                <Link to="/generator" className="text-gray-400 hover:text-primary-500">Recipe Generator</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-400 hover:text-primary-500">Recipes</Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-primary-500">Games</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recipes</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recipes?category=Breakfast" className="text-gray-400 hover:text-primary-500">Breakfast</Link>
              </li>
              <li>
                <Link to="/recipes?category=Lunch" className="text-gray-400 hover:text-primary-500">Lunch</Link>
              </li>
              <li>
                <Link to="/recipes?category=Dinner" className="text-gray-400 hover:text-primary-500">Dinner</Link>
              </li>
              <li>
                <Link to="/recipes?category=Snack" className="text-gray-400 hover:text-primary-500">Snacks</Link>
              </li>
              <li>
                <Link to="/recipes?category=Dessert" className="text-gray-400 hover:text-primary-500">Desserts</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">South Ukkadam, Coimbatore</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-500 mr-2 flex-shrink-0" />
                <a href="mailto:suvaichaalai@gmail.com" className="text-gray-400 hover:text-primary-500">
                  suvaichaalai@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Suvai Chaalai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;