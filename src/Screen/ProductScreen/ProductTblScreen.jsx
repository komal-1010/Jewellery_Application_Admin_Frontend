import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import Productlist from "../../Componants/Product/Productlist";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import ProductTbl from "../../Table/ProductTbl";


const ProductTblScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <Productlist />
      {/* <Comp/> */}
      {/* <companymaster/> */}
    </div>
  );
};

export default ProductTblScreen;
