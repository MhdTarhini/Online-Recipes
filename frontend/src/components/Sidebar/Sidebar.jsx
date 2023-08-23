import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar flex column">
      <div className="new-recipe side-item">recipe</div>
      <div className="Shop-list side-item">Shop List</div>
      <div className="calendar side-item">Calendar</div>
    </div>
  );
}

export default Sidebar;
