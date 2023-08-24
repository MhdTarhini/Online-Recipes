import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "./outletpage.css";
import RecipeCard from "../components/recipeCard/recipeCard";

const OutletPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="outlet-page">
      <Navbar onSearch={(results) => setSearchResults(results)} />
      <div className="homepage">
        <Sidebar />
        <div className="main-page">
          {searchResults.length === 0 ? (
            <Outlet />
          ) : (
            <div className="home">
              {searchResults.map((recipe) => (
                <RecipeCard recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutletPage;
