import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import EnquiryComp from "../../Componants/Enquiry/EnquiryComp";
const EnquiryScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <EnquiryComp />
    </div>
  );
};

export default EnquiryScreen;
