import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import ProfileComp from "../../Componants/Banner/BannerComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import BannerComp from "../../Componants/Banner/BannerComp";
import CategoryList from "../../Componants/Category/CategoryList";


const CategoryListScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <CategoryList />
    </div>
  );
};

export default CategoryListScreen;
