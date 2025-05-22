import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Loader } from 'lucide-react';
import RecipeCard from '../components/recipe/RecipeCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Recipe } from '../types';
import { getAllRecipes, searchRecipes } from '../services/recipeService';

const RecipesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  
  // Get unique categories from recipes
  const categories = [...new Set(recipes.map(recipe => recipe.category))];
  
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const allRecipes = await getAllRecipes();
        setRecipes(allRecipes);
        
        // Check if category filter is applied from URL params
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [searchParams]);
  
  useEffect(() => {
    // Apply filters
    let result = [...recipes];
    
    // Category filter
    if (selectedCategory) {
      result = result.filter(recipe => recipe.category === selectedCategory);
    }
    
    // Diet filter
    if (dietFilter === 'veg') {
      result = result.filter(recipe => recipe.isVegetarian);
    } else if (dietFilter === 'non-veg') {
      result = result.filter(recipe => !recipe.isVegetarian);
    }
    
    // Search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        recipe => 
          recipe.title.toLowerCase().includes(lowerSearchTerm) ||
          recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    setFilteredRecipes(result);
  }, [recipes, selectedCategory, dietFilter, searchTerm]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      return;
    }
    
    setLoading(true);
    try {
      const results = await searchRecipes(searchTerm);
      setFilteredRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    
    // Update URL params
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Explore South Indian Recipes
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover a world of authentic South Indian flavors, from crispy dosas to spicy curries
        </p>
      </motion.div>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              leftIcon={<Search size={16} />}
            />
          </div>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </form>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Filter size={18} className="text-gray-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryClick(null)}
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Diet Type</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={dietFilter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDietFilter('all')}
            >
              All
            </Button>
            <Button
              variant={dietFilter === 'veg' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDietFilter('veg')}
            >
              Vegetarian
            </Button>
            <Button
              variant={dietFilter === 'non-veg' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDietFilter('non-veg')}
            >
              Non-Vegetarian
            </Button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader size={40} className="animate-spin text-primary-500" />
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find more recipes.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;