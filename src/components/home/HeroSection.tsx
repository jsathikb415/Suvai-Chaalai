import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ChefHat } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg')] bg-cover bg-center opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
                Discover the Magic of <span className="text-yellow-300">South Indian</span> Cuisine
              </h1>
              
              <p className="text-lg text-white opacity-90 mb-8">
                Generate recipes, learn cooking, and order delicious South Indian food - all in one place. Perfect for students and working professionals.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  leftIcon={<ChefHat size={20} />}
                  onClick={() => navigate('/generator')}
                  className="shadow-xl"
                >
                  Generate Recipe
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  leftIcon={<Search size={20} />}
                  onClick={() => navigate('/recipes')}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                >
                  Browse Recipes
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-yellow-400 rounded-full opacity-50 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary-400 rounded-full opacity-40 animate-bounce-slow"></div>
              
              <div className="bg-white p-6 rounded-lg shadow-2xl transform rotate-3">
                <img 
                  src="https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg" 
                  alt="South Indian Food" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">Chicken Chettinad</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">30 mins</span>
                  <span className="text-gray-600">4 servings</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Ingredients</div>
                    <div className="font-semibold text-primary-600">₹347</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Ready-Made</div>
                    <div className="font-semibold text-primary-600">₹500</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl -rotate-6">
                <img 
                  src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg" 
                  alt="South Indian Food" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">Masala Dosa</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">45 mins</span>
                  <span className="text-gray-600">4 servings</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Ingredients</div>
                    <div className="font-semibold text-primary-600">₹177</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Ready-Made</div>
                    <div className="font-semibold text-primary-600">₹350</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;