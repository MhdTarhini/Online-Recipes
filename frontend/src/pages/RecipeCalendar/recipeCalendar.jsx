import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./recipeCalendar.css";
import axios from "axios";
import RecipeCard from "../../components/recipeCard/recipeCard";

function RecipeCalendar() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [remove, setRemove] = useState(false);

  const handleDateChange = (newDate) => {
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;

    setDate(formattedDate);
  };

  const getCalendarRecipes = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get_plan/${date}`
      );
      const Plans = await response.data.plan;
      setData(Plans);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const RemoveCalendarRecipe = async (recipeId) => {
    const data = new FormData();
    data.append("recipe_id", recipeId);
    data.append("date", date);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/delete_plan`,
        data
      );
      setRemove(!remove);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCalendarRecipes();
  }, [date, remove]);
  return (
    <div className="calendar-container">
      <h1>Recipe Calendar</h1>
      <div>
        <Calendar
          className="calendar-plan-date"
          onChange={handleDateChange}
          value={date}
        />
        {data.length === 0 ? (
          <div className="shop-list-empty">Your calendar list is empty.</div>
        ) : (
          data.map((recipe) => (
            <div className="shop-list-item" key={recipe.recipe.id}>
              <div className="shop-list-item-content">
                <div className="shop-list-item-title">{recipe.recipe.name}</div>
                <div className="shop-list-item-cuisine">
                  Cuisine: {recipe.recipe.cuisine}
                </div>
                <div className="shop-list-item-ingredients">
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
                <button onClick={() => RemoveCalendarRecipe(recipe.recipe.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeCalendar;
