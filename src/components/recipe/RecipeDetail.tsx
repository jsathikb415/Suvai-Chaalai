import React, { useState } from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { Clock, Users, ChefHat, ShoppingCart, Heart } from 'lucide-react';
import { Recipe } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useCartStore } from '../../store/cartStore';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const { addItem } = useCartStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleAddToCart = (type: 'ingredients' | 'readyMade') => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/recipe/${recipe.id}` } });
      return;
    }
    
    addItem({
      id: `${recipe.id}-${type}-${Date.now()}`,
      recipeId: recipe.id,
      recipeName: recipe.title,
      imageUrl: recipe.imageUrl,
      type,
      price: type === 'ingredients' ? recipe.ingredientsPrice : recipe.readyMadePrice,
      quantity: 1
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <motion.div 
            className="bg-white rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-semibold text-gray-800">{recipe.title}</h1>
                <Badge 
                  variant={recipe.isVegetarian ? 'success' : 'danger'}
                  size="md"
                  className="uppercase font-semibold"
                >
                  {recipe.isVegetarian ? 'Veg' : 'Non-Veg'}
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-6">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Clock size={18} className="text-primary-500 mr-2" />
                  <div>
                    <div className="text-xs text-gray-500">Cook Time</div>
                    <div className="font-medium">{recipe.cookTime} mins</div>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Users size={18} className="text-primary-500 mr-2" />
                  <div>
                    <div className="text-xs text-gray-500">Servings</div>
                    <div className="font-medium">{recipe.servings}</div>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <ChefHat size={18} className="text-primary-500 mr-2" />
                  <div>
                    <div className="text-xs text-gray-500">Difficulty</div>
                    <div className="font-medium">{recipe.difficulty}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-6">
                <div className="w-full sm:w-1/2 bg-secondary-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Ingredients Price</div>
                  <div className="text-2xl font-semibold text-primary-600">₹{recipe.ingredientsPrice}</div>
                  <Button 
                    variant="secondary" 
                    fullWidth 
                    className="mt-3"
                    leftIcon={<ShoppingCart size={16} />}
                    onClick={() => handleAddToCart('ingredients')}
                  >
                    Buy Ingredients
                  </Button>
                </div>
                
                <div className="w-full sm:w-1/2 bg-primary-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Ready-Made Price</div>
                  <div className="text-2xl font-semibold text-primary-600">₹{recipe.readyMadePrice}</div>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    className="mt-3"
                    leftIcon={<ShoppingCart size={16} />}
                    onClick={() => handleAddToCart('readyMade')}
                  >
                    Order Food
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  leftIcon={<Heart size={16} />}
                >
                  Save Recipe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Tutorial</h2>
              <div className="aspect-w-16 aspect-h-9">
                <YouTube
                  videoId={recipe.youtubeId}
                  className="w-full h-full"
                  opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                      autoplay: 0,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'ingredients'
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-primary-500'
                  }`}
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredients
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'instructions'
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-primary-500'
                  }`}
                  onClick={() => setActiveTab('instructions')}
                >
                  Instructions
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {activeTab === 'ingredients' ? (
                <div>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <span className="font-medium">{ingredient.name}</span>
                          <span className="text-gray-500 ml-2">({ingredient.quantity})</span>
                        </div>
                        <span className="text-primary-600 font-medium">₹{ingredient.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <ol className="space-y-4 list-decimal pl-5">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;