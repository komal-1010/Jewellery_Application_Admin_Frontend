import React from "react";
import CompanymasterComp from "../../Componants/Companymaster/CompanymasterComp";
import CompanymasterList from "../../Componants/Companymaster/CompanymasterList";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";


const CompanymasterListScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <CompanymasterList/>
    </div>
  );
};

export default CompanymasterListScreen;
