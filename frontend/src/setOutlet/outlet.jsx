import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "./outletpage.css";

const OutletPage = () => {
  return (
    <div className="outlet-page">
      <Navbar />
      <div className="homepage">
        <Sidebar />
        <div className="main-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OutletPage;
