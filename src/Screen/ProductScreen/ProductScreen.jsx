import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import ProductComp from "../../Componants/Product/ProductComp";

const ProductScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <ProductComp />
    </div>
  );
};

export default ProductScreen;
