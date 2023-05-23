import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import CategoryComp from "../../Componants/Category/CategoryComp";
const CategoryScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <CategoryComp />
    </div>
  );
};

export default CategoryScreen;
