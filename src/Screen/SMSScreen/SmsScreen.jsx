import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import SMSComp from "../../Componants/SMS/SMSComp";

const SmsScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <SMSComp />
    </div>
  );
};

export default SmsScreen;
