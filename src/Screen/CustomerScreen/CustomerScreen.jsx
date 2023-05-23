import React from "react";
import CustomerComp from "../../Componants/Customer/CustomerComp";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import Productlist from "../../Componants/Product/Productlist";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import ProductTbl from "../../Table/ProductTbl";


const CustomerScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <CustomerComp />
      {/* <Comp/> */}
      {/* <companymaster/> */}
    </div>
  );
};

export default CustomerScreen;
