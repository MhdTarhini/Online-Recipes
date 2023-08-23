import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar flex column">
      <div
        className="side-item"
        onClick={() => {
          navigate("/user");
        }}>
        Home
      </div>
      <div
        className="new-recipe side-item"
        onClick={() => {
          navigate("recipe");
        }}>
        New Recipe
      </div>
      <div
        className="Shop-list side-item"
        onClick={() => {
          navigate("user/recipe");
        }}>
        Shop List
      </div>
      <div
        className="calendar side-item"
        onClick={() => {
          navigate("user/recipe");
        }}>
        Calendar
      </div>
    </div>
  );
}

export default Sidebar;
