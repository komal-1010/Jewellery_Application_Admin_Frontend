import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import ProfileTbl from "../../Table/BannerListtbl";

const ProfileTblScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <ProfileTbl />
    </div>
  );
};

export default ProfileTblScreen;
