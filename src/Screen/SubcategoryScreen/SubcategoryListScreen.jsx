import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import SubcategoryList from "../../Componants/Subcategory/SubcategoryList";


const SubcategoryListScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <SubcategoryList />
    </div>
  );
};

export default SubcategoryListScreen;
