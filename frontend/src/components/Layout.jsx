import React from "react";
import Navbar from "./Navbar"; // Updated import
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main content below navbar */}
      <main className="pt-28 px-4">
        <Outlet />
      </main>
    </div>
  );
}
