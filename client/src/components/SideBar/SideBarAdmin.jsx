import React from "react";
import NavlinkSidebar from "../Navlink/NavlinkSidebar";

export default function SideBarAdmin() {
  return (
    <>
      {/* Vehicles */}
      <li>
        <NavlinkSidebar to="/vehicles" text="Vehicles" />
      </li>
    </>
  );
}
