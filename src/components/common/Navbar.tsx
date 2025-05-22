import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, ChefHat, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../firebase/auth';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const cartItemsCount = useCartStore(state => state.getTotalItems());
  
  const handleSignOut = async () => {
    await signOut();
    setCurrentUser(null);
    navigate('/');
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-display font-semibold text-gray-900">Suvai Chaalai</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500">Home</Link>
            <Link to="/generator" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500">Recipe Generator</Link>
            <Link to="/recipes" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500">Recipes</Link>
            <Link to="/games" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500">Games</Link>
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500">About</Link>
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary-500" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center focus:outline-none">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt={currentUser.displayName || 'User'} 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 font-medium">
                          {currentUser.displayName?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link 
                      to={currentUser.isAdmin ? "/admin" : "/dashboard"} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {currentUser.isAdmin ? "Admin Dashboard" : "Dashboard"}
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary-500" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link to="/login">
                  <Button variant="primary" size="sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/generator" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Recipe Generator
              </Link>
              <Link 
                to="/recipes" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link 
                to="/games" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {currentUser ? (
                <>
                  <Link 
                    to={currentUser.isAdmin ? "/admin" : "/dashboard"}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    {currentUser.isAdmin ? "Admin Dashboard" : "Dashboard"}
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;