import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ShoppingCart, CreditCard, ChevronRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Generate Recipe',
      description: 'Use our AI-powered recipe generator to discover delicious South Indian dishes based on your preferences.',
      icon: <ChefHat size={40} className="text-primary-500" />,
      color: 'bg-primary-50'
    },
    {
      id: 2,
      title: 'Choose Your Option',
      description: 'Buy ingredients to cook yourself or order the prepared dish - both at affordable prices.',
      icon: <ShoppingCart size={40} className="text-secondary-500" />,
      color: 'bg-secondary-50'
    },
    {
      id: 3,
      title: 'Checkout & Enjoy',
      description: 'Pay securely, apply any discount coupons, and enjoy your delicious South Indian meal!',
      icon: <CreditCard size={40} className="text-accent-500" />,
      color: 'bg-accent-50'
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-4">
            How Suvai Chaalai Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to discover, cook, and enjoy authentic South Indian cuisine without any hassle.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`${step.color} rounded-lg p-8 relative`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute top-0 right-0 bg-white rounded-full w-12 h-12 flex items-center justify-center -mt-4 -mr-4 shadow-lg">
                <span className="text-primary-500 font-semibold">{step.id}</span>
              </div>
              
              <div className="mb-6">{step.icon}</div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ChevronRight size={24} className="text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;