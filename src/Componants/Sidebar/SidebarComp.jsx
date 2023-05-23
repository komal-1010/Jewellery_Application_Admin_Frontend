import { Tooltip } from "@mui/material";
import { border } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/Base.css";
import  logo from "../../Images/whitelogo.png";



const SidebarComp = () => {
  return (
    <>
      <input type="checkbox" id="sidebar-toggle" />
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            {/* <span className= style={{ fontSize: "25px" }}></span> */}
            <img src={logo} alt="" width={150}style={{ paddingTop : "10px"}} />
            
            {/* <span style={{ padding: "8px", fontSize: "20px" }}></span> */}
          </div>
          <label for="sidebar-toggle" className="ti-menu-alt"></label>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <span>GENERAL</span>
            </li>
            {/* <li>
              <Link to="/companymaster" >
                <span className="ti-face-smile"></span>
                <span>Companymaster</span>
              </Link>
            </li> */}
            <li >
              <Link to="/bannerlist" >
                <span className="ti-panel" ></span>
                <span>Banner</span>
              </Link>
            </li>
            <li>
              <Link to="/categorylist" >
                <span className="ti-layout-grid2"></span>
                <span>Category</span>
              </Link>
            </li>
            <li>
              <Link to="/productlist" >
                <span className="ti-shopping-cart"></span>
                <span>Product</span>
              </Link>
            </li>
            <li>
              <Link to="/companymastertbl" state={{ from: [] }}>
                <span className="ti-location-pin"></span>
                <span>Company Master</span>
              </Link>
            </li>
           
            <li>
            <Link to="/enquiry" state={{ from: [] }}>
              
                <span className="ti-comment-alt"></span>
                <span>Enquiry</span>
                </Link>
              
            </li>
            <li>
            <Link to="/customertbl" state={{ from: [] }}>
              
                <span className="ti-user"></span>
                <span>Customer</span>
                </Link>
              
            </li>

            <li>
            <Link to="/Smslist" state={{ from: [] }}>
              
                <span className="ti-email"></span>
                <span>SMS</span>
                </Link>
              
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarComp;
