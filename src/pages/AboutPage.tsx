import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ChefHat, Users, Clock, Coffee } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          About Suvai Chaalai
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Bringing the authentic flavors of South India to your kitchen
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Our Story
          </h2>
          
          <p className="text-gray-600 mb-4">
            Suvai Chaalai was born out of a passion for South Indian cuisine and a desire to make it accessible to everyone, especially bachelors who often struggle with cooking or finding authentic food.
          </p>
          
          <p className="text-gray-600 mb-4">
            Our founder, a former software engineer who struggled to cook during his bachelor days, realized that many students and working professionals face the same challenge. They either end up eating unhealthy fast food or spending too much on dining out.
          </p>
          
          <p className="text-gray-600">
            We built Suvai Chaalai to solve this problem by combining AI-powered recipe generation with a convenient food ordering platform, all focused on the rich and diverse flavors of South India.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary-100 rounded-full"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-secondary-100 rounded-full"></div>
          
          <img 
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" 
            alt="South Indian Food" 
            className="rounded-lg shadow-xl relative z-10"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
          What Makes Us Special
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <ChefHat size={24} className="text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Recipes</h3>
            <p className="text-gray-600">
              Our AI generates authentic South Indian recipes tailored to your preferences.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Users size={24} className="text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bachelor-Focused</h3>
            <p className="text-gray-600">
              Designed specifically for students and working professionals with busy lifestyles.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Clock size={24} className="text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dual Options</h3>
            <p className="text-gray-600">
              Choose between buying ingredients to cook or ordering ready-made food.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Coffee size={24} className="text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentic Flavors</h3>
            <p className="text-gray-600">
              Experience the true taste of South India with our curated recipes.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-primary-50 rounded-lg p-8 mb-16"
      >
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6 text-center">
          Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <MapPin size={20} className="text-primary-500 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Address</h3>
              <p className="text-gray-600">South Ukkadam, Coimbatore</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail size={20} className="text-primary-500 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Email</h3>
              <a href="mailto:suvaichaalai@gmail.com" className="text-gray-600 hover:text-primary-500">
                suvaichaalai@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone size={20} className="text-primary-500 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = 'mailto:suvaichaalai@gmail.com'}
          >
            Get in Touch
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
          Join Our Culinary Journey
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Whether you're a student, a working professional, or just someone who loves South Indian food, Suvai Chaalai is here to make your culinary journey delightful and hassle-free.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutPage;