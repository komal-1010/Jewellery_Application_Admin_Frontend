import React from "react";
import CustomerList from "../../Componants/Customer/CustomerList";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import Smslist from "../../Componants/SMS/Smslist";
import "../../CSS/Base.css";


const SmsTblScreen = () => {
  return (
    <div>
      {/* <Sidebar/> */}
      <SidebarComp/>
      <NavbarComp />
      <Smslist/>
      {/* <CustomerL/> */}
    </div>
  );
};

export default SmsTblScreen;
