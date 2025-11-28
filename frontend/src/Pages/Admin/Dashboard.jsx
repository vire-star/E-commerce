// src/pages/admin/Dashboard.jsx
import React from "react";

import Sidebar from "@/components/Other/Sidebar";

import { Outlet } from "react-router-dom";

const Dashboard = () => {
  // Summary data
  
  return (
   <div className="flex w-full ">
    <Sidebar/>



    <Outlet/>
   </div>
  );
};



export default Dashboard;
