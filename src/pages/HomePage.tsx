import React, { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import HowItWorks from '../components/home/HowItWorks';
import FeaturesSection from '../components/home/FeaturesSection';
import { Recipe } from '../types';
import { getPopularRecipes } from '../services/recipeService';

const HomePage: React.FC = () => {
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getPopularRecipes();
        setPopularRecipes(recipes);
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);
  
  return (
    <div>
      <HeroSection />
      
      {!loading && popularRecipes.length > 0 && (
        <FeaturedRecipes recipes={popularRecipes} />
      )}
      
      <HowItWorks />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;