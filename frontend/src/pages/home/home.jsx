import React, { useState } from "react";
import "./home.css";
import RecipeCard from "../../components/recipeCard/recipeCard";
function Home() {
  const demoRecipe = {
    name: "Delicious Pasta",
    cuisine: "Italian",
    user: "John Doe",
    images: [
      {
        image_url:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      },
      {
        image_url:
          "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
      },
      {
        image_url:
          "https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg",
      },
    ],
    ingredients: [
      { name: "Pasta", quantity: "200g" },
      { name: "Tomatoes", quantity: "2" },
      { name: "Basil", quantity: "A handful" },
      { name: "Olive Oil", quantity: "2 tbsp" },
    ],
    comment: [
      { name: "moe", content: "hello world" },
      { name: "moe2", content: "hello 3world" },
      { name: "moe3", content: "hello32 world" },
      { name: "moe4", content: "hello 2world" },
    ],
  };
  const allRecipe = [demoRecipe, demoRecipe, demoRecipe, demoRecipe];
  return (
    <div className="home">
      {allRecipe.map((ele) => (
        <RecipeCard recipe={ele} />
      ))}
    </div>
  );
}

export default Home;
