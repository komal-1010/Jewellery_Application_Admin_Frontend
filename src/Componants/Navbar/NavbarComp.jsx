import React, { useContext, useEffect } from "react";
import "../../CSS/Base.css";
import Tooltip from '@mui/material/Tooltip';
import { UserContext } from "../../API/UserContext";
import { loginsave } from "../../API/Loginmaster";



const NavbarComp = () => {
  // const {logindata} = useContext(UserContext);
  const loginid=sessionStorage.getItem("loginid")
  if(loginid<=0){window.location.href="/";}

  
  return (
    <div className="main-content">
      <header>
        
        {/* <div className="search-wrapper">
          <span className="ti-search"></span>
          {/* <input type="search" placeholder="Search" /> */}
        {/* </div>  */}
        <div style={{display:"flex",justifyContent:"flex-end",width:"100%",paddingRight:"15px"}}>
        <Tooltip title="Logout">

          <a className="ti-power-off" href="/" 
          onClick={() => {
          
              sessionStorage.setItem("loginid",0);     
          }}
             style={{fontSize:"25px"}}></a></Tooltip>
        </div>
      </header>
    </div>
  );
};

export default NavbarComp;
