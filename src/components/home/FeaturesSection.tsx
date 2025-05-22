import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Gamepad2, ShoppingBag, Clock, Tag, Users } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Utensils size={24} className="text-primary-500" />,
      title: 'AI Recipe Generator',
      description: 'Discover 150+ South Indian recipes tailored to your preferences.'
    },
    {
      icon: <ShoppingBag size={24} className="text-primary-500" />,
      title: 'Dual Pricing',
      description: 'Choose between buying ingredients or ready-made food at transparent prices.'
    },
    {
      icon: <Gamepad2 size={24} className="text-primary-500" />,
      title: 'Fun Mini-Games',
      description: 'Play games to earn discount coupons and save on your orders.'
    },
    {
      icon: <Clock size={24} className="text-primary-500" />,
      title: 'Quick Recipes',
      description: 'Find recipes that fit your schedule with estimated cooking times.'
    },
    {
      icon: <Tag size={24} className="text-primary-500" />,
      title: 'Special Discounts',
      description: 'Get exclusive discounts and offers for regular customers.'
    },
    {
      icon: <Users size={24} className="text-primary-500" />,
      title: 'Bachelor-Friendly',
      description: 'Recipes and portions designed specifically for bachelors and students.'
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-4">
            Features You'll Love
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've designed Suvai Chaalai with features that make cooking and ordering South Indian cuisine enjoyable and hassle-free.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;