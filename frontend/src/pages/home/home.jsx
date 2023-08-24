import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import RecipeCard from "../../components/recipeCard/recipeCard";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
function Home() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [data, setData] = useState([]);
  const [isliked, setIsLiked] = useState([]);

  const handleData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get_recipes");
      const allRecipes = await response.data.data;
      setData(allRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIsliked = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user_likes");
      setIsLiked(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleData();
    fetchIsliked();
  }, []);

  return (
    <div className="home">
      {data.map((recipe) => (
        <RecipeCard
          recipe={recipe}
          isLiked={isliked.includes(recipe.id) ? true : false}
        />
      ))}
    </div>
  );
}

export default Home;
