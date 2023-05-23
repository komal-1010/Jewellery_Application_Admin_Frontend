import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import ProfileComp from "../../Componants/Banner/BannerComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import BannerComp from "../../Componants/Banner/BannerComp";

const BannerScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <BannerComp />
    </div>
  );
};

export default BannerScreen;
