import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Clock, Users, Loader, Utensils, AlertCircle, Search } from 'lucide-react';
import { RecipeGenerationInput, Recipe } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { generateRecipe } from '../../services/recipeService';

const RecipeGenerator: React.FC = () => {
  const [input, setInput] = useState<RecipeGenerationInput>({
    diet: 'both',
    mealType: 'dinner',
    spiceLevel: 'medium',
    cookTime: 60,
    ingredients: []
  });
  
  const [ingredientInput, setIngredientInput] = useState('');
  const [generatingStatus, setGeneratingStatus] = useState<'idle' | 'generating' | 'complete'>('idle');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleInputChange = (key: keyof RecipeGenerationInput, value: any) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };
  
  const handleAddIngredient = () => {
    if (!ingredientInput.trim()) return;
    
    setInput(prev => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), ingredientInput.trim()]
    }));
    setIngredientInput('');
  };
  
  const handleRemoveIngredient = (ingredient: string) => {
    setInput(prev => ({
      ...prev,
      ingredients: prev.ingredients?.filter(ing => ing !== ingredient) || []
    }));
  };
  
  const handleGenerate = async () => {
    setError(null);
    setGeneratingStatus('generating');
    
    try {
      const recipe = await generateRecipe(input);
      setGeneratedRecipe(recipe);
      setGeneratingStatus('complete');
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      setGeneratingStatus('idle');
    }
  };
  
  const handleTryAgain = () => {
    setGeneratingStatus('idle');
    setGeneratedRecipe(null);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          AI Recipe Generator
        </h1>
        <p className="text-lg text-gray-600">
          Generate authentic South Indian recipes tailored to your preferences
        </p>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {generatingStatus === 'idle' ? (
          <motion.div
            key="generator-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diet Preference</label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={input.diet === 'veg' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('diet', 'veg')}
                  >
                    Vegetarian
                  </Button>
                  <Button
                    variant={input.diet === 'non-veg' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('diet', 'non-veg')}
                  >
                    Non-Vegetarian
                  </Button>
                  <Button
                    variant={input.diet === 'both' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('diet', 'both')}
                  >
                    Either
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={input.mealType === 'breakfast' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('mealType', 'breakfast')}
                  >
                    Breakfast
                  </Button>
                  <Button
                    variant={input.mealType === 'lunch' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('mealType', 'lunch')}
                  >
                    Lunch
                  </Button>
                  <Button
                    variant={input.mealType === 'dinner' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('mealType', 'dinner')}
                  >
                    Dinner
                  </Button>
                  <Button
                    variant={input.mealType === 'snack' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('mealType', 'snack')}
                  >
                    Snack
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level</label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={input.spiceLevel === 'mild' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('spiceLevel', 'mild')}
                  >
                    Mild
                  </Button>
                  <Button
                    variant={input.spiceLevel === 'medium' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('spiceLevel', 'medium')}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={input.spiceLevel === 'spicy' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('spiceLevel', 'spicy')}
                  >
                    Spicy
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Cook Time</label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={input.cookTime === 30 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('cookTime', 30)}
                  >
                    30 minutes
                  </Button>
                  <Button
                    variant={input.cookTime === 60 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('cookTime', 60)}
                  >
                    1 hour
                  </Button>
                  <Button
                    variant={input.cookTime === 120 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('cookTime', 120)}
                  >
                    2+ hours
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Ingredients (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  placeholder="Enter ingredient..."
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
                  fullWidth
                  leftIcon={<Search size={16} />}
                />
                <Button
                  variant="outline"
                  onClick={handleAddIngredient}
                >
                  Add
                </Button>
              </div>
              
              {input.ingredients && input.ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {input.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                    >
                      {ingredient}
                      <button
                        onClick={() => handleRemoveIngredient(ingredient)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 flex items-center">
                <AlertCircle size={20} className="mr-2" />
                {error}
              </div>
            )}
            
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGenerate}
                leftIcon={<ChefHat size={20} />}
              >
                Generate Recipe
              </Button>
            </div>
          </motion.div>
        ) : generatingStatus === 'generating' ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader size={96} className="text-primary-500" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ChefHat size={40} className="text-primary-700" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cooking up something special...</h3>
            <p className="text-gray-600">Our AI chef is creating a delicious South Indian recipe just for you!</p>
            
            <div className="mt-8 max-w-md mx-auto">
              <div className="space-y-3">
                <motion.div 
                  className="h-4 bg-gray-200 rounded"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.div 
                  className="h-4 bg-gray-200 rounded"
                  animate={{ width: ['0%', '80%'] }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.div 
                  className="h-4 bg-gray-200 rounded"
                  animate={{ width: ['0%', '90%'] }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="recipe-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {generatedRecipe && (
              <>
                <div className="relative">
                  <img 
                    src={generatedRecipe.imageUrl} 
                    alt={generatedRecipe.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <h2 className="text-3xl font-display font-bold text-white mb-2">
                        {generatedRecipe.title}
                      </h2>
                      <p className="text-white/90">{generatedRecipe.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                      <Clock size={18} className="text-primary-500 mr-2" />
                      <div>
                        <div className="text-xs text-gray-500">Cook Time</div>
                        <div className="font-medium">{generatedRecipe.cookTime} mins</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                      <Users size={18} className="text-primary-500 mr-2" />
                      <div>
                        <div className="text-xs text-gray-500">Servings</div>
                        <div className="font-medium">{generatedRecipe.servings}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                      <Utensils size={18} className="text-primary-500 mr-2" />
                      <div>
                        <div className="text-xs text-gray-500">Difficulty</div>
                        <div className="font-medium">{generatedRecipe.difficulty}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-6">
                    <div className="w-full sm:w-1/2 bg-secondary-50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-500 mb-1">Ingredients Price</div>
                      <div className="text-2xl font-semibold text-primary-600">₹{generatedRecipe.ingredientsPrice}</div>
                    </div>
                    
                    <div className="w-full sm:w-1/2 bg-primary-50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-500 mb-1">Ready-Made Price</div>
                      <div className="text-2xl font-semibold text-primary-600">₹{generatedRecipe.readyMadePrice}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-4">
                    <Button
                      variant="outline"
                      onClick={handleTryAgain}
                    >
                      Generate Another Recipe
                    </Button>
                    
                    <Button
                      variant="primary"
                      onClick={() => window.location.href = `/recipe/${generatedRecipe.id}`}
                    >
                      View Full Recipe
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeGenerator;