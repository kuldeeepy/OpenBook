import React from "react";
import Navbar from "../Navbar/Nav";
import Footer from "../Footer/Footer";
// import Home from "../../pages/Home/Home";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
