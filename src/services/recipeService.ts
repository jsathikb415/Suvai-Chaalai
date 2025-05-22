import { Recipe, RecipeGenerationInput } from '../types';
import { mockRecipes } from '../data/mockRecipes';

// Function to get all recipes
export const getAllRecipes = async (): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecipes);
    }, 500);
  });
};

// Function to get recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipe = mockRecipes.find(recipe => recipe.id === id) || null;
      resolve(recipe);
    }, 300);
  });
};

// Function to get recipes by category
export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipes = mockRecipes.filter(recipe => recipe.category === category);
      resolve(recipes);
    }, 300);
  });
};

// Function to get popular recipes
export const getPopularRecipes = async (): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipes = mockRecipes.filter(recipe => recipe.isPopular);
      resolve(recipes);
    }, 300);
  });
};

// Function to generate a recipe using AI (mocked)
export const generateRecipe = async (input: RecipeGenerationInput): Promise<Recipe> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter recipes based on input criteria
      const filteredRecipes = mockRecipes.filter(recipe => {
        // Diet preference
        if (input.diet === 'veg' && !recipe.isVegetarian) return false;
        if (input.diet === 'non-veg' && recipe.isVegetarian) return false;
        
        // Cook time
        if (input.cookTime && recipe.cookTime > input.cookTime) return false;
        
        // Ingredients match (if specified)
        if (input.ingredients && input.ingredients.length > 0) {
          const hasMatchingIngredients = input.ingredients.some(searchIngredient =>
            recipe.ingredients.some(recipeIngredient =>
              recipeIngredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
            )
          );
          if (!hasMatchingIngredients) return false;
        }
        
        return true;
      });
      
      if (filteredRecipes.length === 0) {
        // If no matches found, return a recipe that matches at least the diet preference
        const dietMatches = mockRecipes.filter(recipe => {
          if (input.diet === 'veg') return recipe.isVegetarian;
          if (input.diet === 'non-veg') return !recipe.isVegetarian;
          return true;
        });
        
        const randomIndex = Math.floor(Math.random() * dietMatches.length);
        resolve({
          ...dietMatches[randomIndex],
          id: `generated-${Date.now()}`
        });
      } else {
        const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
        resolve({
          ...filteredRecipes[randomIndex],
          id: `generated-${Date.now()}`
        });
      }
    }, 2000);
  });
};

// Function to search recipes
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      const recipes = mockRecipes.filter(
        recipe => 
          recipe.title.toLowerCase().includes(lowercaseQuery) || 
          recipe.description.toLowerCase().includes(lowercaseQuery) ||
          recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowercaseQuery))
      );
      resolve(recipes);
    }, 300);
  });
};