import React, { useContext, useState } from "react";
import axios from "axios";
import "./addRecipes.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const AddRecipes = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");

  const [images, setImages] = useState([]);
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
  ]);

  const handleImageInputChange = (event) => {
    setImages([...images, event.target.files[0]]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: 0 }]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cuisine", cuisine);
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.ingredient);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    });
    images.forEach((image, index) => {
      formData.append("images[]", image);
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add_recipe",
        formData
      );

      console.log("Response from server:", response.data);
      if (response.data.status == "success") {
        navigate("/user");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div className="add-recipes-container">
      <h2 className="add-recipes-header">Upload Recipe</h2>
      <div className="add-recipes-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cuisine:
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </label>
        <br />
        <label>Images:</label>
        <input
          type="file"
          onChange={handleImageInputChange}
          accept="image/*"
          multiple
        />
        <div className="selected-images">
          {images.map((image, index) => (
            <p key={index}>{image.name}</p>
          ))}
        </div>

        <br />
        <label className="add-recipes-ingredients">Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div className="add-recipes-ingredient" key={index}>
            <input
              type="text"
              placeholder="Ingredient"
              value={ingredient.ingredient}
              onChange={(e) =>
                handleIngredientChange(index, "ingredient", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
            />
            <button
              type="button"
              className="add-recipes-remove-button"
              onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-recipes-add-button"
          onClick={addIngredient}>
          +
        </button>
        <br />
        <div className="add-recipes-buttons">
          <button onClick={handleSubmit}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipes;
