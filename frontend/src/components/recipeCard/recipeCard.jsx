import React, { useState } from "react";
import "./recipeCard.css";

const RecipeCard = ({ recipe }) => {
  const [image, setImage] = useState(recipe.images[0].image_url);
  console.log(recipe.images[1]);
  const handleImageClick = (index) => {
    setImage(recipe.images[index].image_url);
  };

  return (
    <div className="recipe-card">
      <h1 className="recipe-title">{recipe.name}</h1>
      <p className="recipe-details">Cuisine: {recipe.cuisine}</p>
      <p className="recipe-details">Created by: {recipe.user}</p>
      <div className="image-container">
        <img src={image} className="recipe-image " alt="" srcset="" />
        {recipe.images.map((image, index) => (
          <>
            <div
              className="circle"
              onClick={() => handleImageClick(index)}></div>
          </>
        ))}
      </div>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeCard;
