import React, { useEffect, useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import { NavLink } from "react-router-dom";
import SideBarStaff from "./SideBarStaff";
import NavlinkSidebar from "../Navlink/NavlinkSidebar";

export default function Sidebar() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("role")));
  }, []);

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {/* dashboard */}
            <li>
              <NavlinkSidebar to="/dashboard" text="Dashboard" />
            </li>

            {/* Vehicles */}
            <li>
              <NavlinkSidebar to="/vehicles" text="Vehicles" />
            </li>

            {/* booking */}
            <li>
              <NavlinkSidebar to="/booking" text="Booking" />
            </li>

            {role === "admin" ? <SideBarAdmin /> : <SideBarStaff />}
          </ul>
        </div>
      </aside>
    </>
  );
}
