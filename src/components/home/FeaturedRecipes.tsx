import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types';
import RecipeCard from '../recipe/RecipeCard';

interface FeaturedRecipesProps {
  recipes: Recipe[];
}

const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ recipes }) => {
  // Get first 5 recipes for featured section
  const featuredRecipes = recipes.slice(0, 5);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-display font-semibold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Popular Recipes
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/recipes" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RecipeCard recipe={recipe} featured={index === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;