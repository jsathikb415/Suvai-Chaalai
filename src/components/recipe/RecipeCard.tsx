import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../../types';
import Badge from '../ui/Badge';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, featured = false }) => {
  return (
    <motion.div 
      className={`bg-white rounded-lg overflow-hidden shadow-recipe ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Link to={`/recipe/${recipe.id}`}>
        <div className="relative">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title}
            className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
          />
          <div className="absolute top-2 right-2">
            <Badge 
              variant={recipe.isVegetarian ? 'success' : 'danger'}
              className="uppercase font-semibold"
            >
              {recipe.isVegetarian ? 'Veg' : 'Non-Veg'}
            </Badge>
          </div>
          
          {recipe.isPopular && (
            <div className="absolute top-2 left-2">
              <Badge variant="primary" className="uppercase font-semibold">
                Popular
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-semibold text-gray-800 ${featured ? 'text-xl' : 'text-lg'}`}>
              {recipe.title}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <div className="flex items-center mr-4">
              <Clock size={16} className="mr-1" />
              <span>{recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center mr-4">
              <Users size={16} className="mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center">
              <ChefHat size={16} className="mr-1" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div>
              <div className="text-sm text-gray-500">Ingredients</div>
              <div className="font-semibold text-primary-600">₹{recipe.ingredientsPrice}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Ready-Made</div>
              <div className="font-semibold text-primary-600">₹{recipe.readyMadePrice}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;