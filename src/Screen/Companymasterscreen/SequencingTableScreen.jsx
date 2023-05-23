import React from "react";
import NavbarComp from "../../Componants/Navbar/NavbarComp";
import SequancingComp from "../../Componants/Sequencing/SequancingComp";
import SidebarComp from "../../Componants/Sidebar/SidebarComp";
import "../../CSS/Base.css";
import SequencingTable from "../../Table/SequencingTable";

const SequencingTableScreen = () => {
  return (
    <div>
      <SidebarComp />
      <NavbarComp />
      <SequencingTable />
    </div>
  );
};

export default SequencingTableScreen;
