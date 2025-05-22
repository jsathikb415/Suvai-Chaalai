import React from 'react';
import RecipeGenerator from '../components/recipe/RecipeGenerator';

const GeneratorPage: React.FC = () => {
  return (
    <div className="py-8">
      <RecipeGenerator />
    </div>
  );
};

export default GeneratorPage;