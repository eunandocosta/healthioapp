import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, selectedRecipe, setSelectedRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
