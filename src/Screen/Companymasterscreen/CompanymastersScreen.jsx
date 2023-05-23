import React from "react";
import CompanymasterComp from "../../Componants/Companymaster/CompanymasterComp";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";


const CompanymasterScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <CompanymasterComp/>
    </div>
  );
};

export default CompanymasterScreen;
