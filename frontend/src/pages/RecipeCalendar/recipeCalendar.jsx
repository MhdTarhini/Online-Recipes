import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./recipeCalendar.css";

function RecipeCalendar() {
  const [date, setDate] = useState(new Date());
  const [recipes, setRecipes] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);

    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;

    console.log(formattedDate);
  };

  return (
    <div className="calendar-container">
      <h1>Recipe Calendar</h1>
      <div className="calendar-plan">
        <Calendar onChange={handleDateChange} value={date} />
        <div className="recipe-list"></div>
      </div>
    </div>
  );
}

export default RecipeCalendar;
