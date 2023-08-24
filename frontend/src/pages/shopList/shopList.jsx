import React, { useDebugValue, useEffect, useState } from "react";
import "./shopList.css";
import axios from "axios";

function ShopList() {
  const [data, setData] = useState([]);

  const getList = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get_list`);
      const lists = await response.data.data.items;
      setData(lists);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/remove_item/${recipeId}`
      );
      const lists = await response.data.data.items;
      setData(lists);
    } catch (error) {
      console.error(error);
    }
    setData(data.filter((recipe) => recipe.id !== recipeId));
  };

  useEffect(() => {
    getList();
  }, []);
  console.log(data);
  return (
    <div className="shop-list-container">
      <h2 className="shop-list-header">Shopping List</h2>
      {data.length === 0 ? (
        <div className="shop-list-empty">Your shopping list is empty.</div>
      ) : (
        data.map((recipe) => (
          <div className="shop-list-item" key={recipe.recipe.id}>
            <div className="shop-list-item-content">
              <div className="shop-list-item-title">{recipe.recipe.name}</div>
              <div className="shop-list-item-cuisine">
                Cuisine: {recipe.recipe.cuisine}
              </div>
              <div className="shop-list-item-ingredients">
                <strong>Ingredients:</strong>
                <ul>
                  {recipe.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.ingredient.name} -{" "}
                      {ingredient.ingredient.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="shop-list-item-actions">
              <button onClick={() => handleRemoveRecipe(recipe.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShopList;
