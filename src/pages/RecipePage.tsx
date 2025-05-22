import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import RecipeDetail from '../components/recipe/RecipeDetail';
import { Recipe } from '../types';
import { getRecipeById } from '../services/recipeService';

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const fetchedRecipe = await getRecipeById(id);
        
        if (fetchedRecipe) {
          setRecipe(fetchedRecipe);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size={40} className="animate-spin text-primary-500" />
      </div>
    );
  }
  
  if (error || !recipe) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {error || 'Recipe not found'}
        </h2>
        <p className="text-gray-600">
          The recipe you're looking for might have been removed or doesn't exist.
        </p>
      </div>
    );
  }
  
  return <RecipeDetail recipe={recipe} />;
};

export default RecipePage;