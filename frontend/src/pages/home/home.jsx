import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import RecipeCard from "../../components/recipeCard/recipeCard";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
function Home() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [data, setData] = useState([]);

  const handleData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get_recipes");
      const allRecipes = await response.data.data;
      setData(allRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="home">
      {data.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
}

export default Home;
