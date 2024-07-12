import React, { useState } from "react";
import { FormControl, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5002/recipes?query=${query}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar receitas");
      }
      const data = await response.json();
      setRecipes(data.results);
      setError("");
    } catch (error) {
      setError(error.message);
      setRecipes([]);
    }
  };

  const mapRecipes = (recipes) => (
    <ul style={{ width: '80%', display: 'flex', flexWrap: 'wrap', listStyleType: 'none' }}>
      {recipes.map((recipe, index) => (
        <li key={index} className="card-hover"
          style={{ width: 'calc(25% - 10px)', margin: '5px', transition: 'transform 0.3s ease-in-out', cursor: 'pointer' }}>
          <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
            <img src={recipe.image} alt={recipe.title}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
              onError={(e) => { e.target.parentNode.style.display = 'none'; }} />
            <h2 style={{ fontSize: '1rem', textAlign: 'center', color: '#3E9A81' }}>{recipe.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <div style={{ display: 'flex', width: '100%', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
        <FormControl fullWidth sx={{ width: '50%', display: 'flex' }}>
          <TextField
            label="Alimento"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: '100%', '& .MuiOutlinedInput-root': { width: '100%' } }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchRecipes}
          sx={{ backgroundColor: '#3E9A81', height: '100%', "&:hover": { backgroundColor: '#54C6A8' } }}
        >
          Buscar
        </Button>
      </div>
      <p>Digite um alimento que estará na refeição em inglês</p>
      <h1 style={{ padding: '0px 20px', color: '#3E9A81', borderBottom: '3px solid #3E9A81', textAlign: 'center' }}>
        Receitas
      </h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mapRecipes(recipes)}
    </div>
  );
};

export default Recipes;
