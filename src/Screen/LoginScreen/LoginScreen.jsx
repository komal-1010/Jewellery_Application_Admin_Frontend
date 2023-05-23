import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import LoginComp from "../../Componants/Login/LoginComp";

const LoginScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <LoginComp />
    </div>
  );
};

export default LoginScreen;
