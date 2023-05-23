import React from "react";
import CustomerList from "../../Componants/Customer/CustomerList";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";


const CustomerTblScreen = () => {
  return (
    <div>
      {/* <Sidebar/> */}
      <SidebarComp/>
      <NavbarComp />
      <CustomerList/>
      {/* <CustomerL/> */}
    </div>
  );
};

export default CustomerTblScreen;
