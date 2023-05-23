import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import SubcategoryComp from "../../Componants/Subcategory/SubcategoryComp";
const SubcatrgoryScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <SubcategoryComp />
    </div>
  );
};

export default SubcatrgoryScreen;
