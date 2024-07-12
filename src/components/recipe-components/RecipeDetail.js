import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(recipe);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5002/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar detalhes da receita');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className='loading-container'>
        <div className="loading-spinner">
          <div className='loading-logo'> 
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
      {recipe ? (
        <div style={{ padding: "20px", width: "80%", display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" gutterBottom>
            {recipe.title}
          </Typography>
          <img src={recipe.image} alt={recipe.title} style={{ borderRadius: "10px", width: "50%", alignSelf: "center" }} />
          <Typography variant="h6" gutterBottom>
            Ingredientes:
          </Typography>
          <ul>
            {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.original}
              </li>
            ))}
          </ul>
          <Typography variant="h6" gutterBottom>
            Instruções:
          </Typography>
          <ol style={{width: "100%"}}>
            {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
              recipe.analyzedInstructions[0].steps.map((step, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {step.step}
                </li>
              ))
            ) : (
              <Typography>Instruções não disponíveis.</Typography>
            )}
          </ol>
        </div>
      ) : (
        <Typography>Nenhuma receita encontrada</Typography>
      )}
    </div>
  );
};

export default RecipeDetail;
