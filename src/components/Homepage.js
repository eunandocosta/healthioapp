import React from "react";
import { Routes, Route } from 'react-router-dom';
import Nav from "./Nav";
import Diet from "./Diet";
import Recipes from "./Recipes";
import RecipeDetail from "./recipe-components/RecipeDetail";

const Homepage = (props) => {
  return (
    <div className="container">
      <Nav setUser={props.setUser} />
      <Routes>
        <Route path="/diet" element={<Diet />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  )
};

export default Homepage;
