import React, { useState, useReducer, useEffect } from "react";
import "../../CSS/Base.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";


import ProductTbl from "../../Table/ProductTbl";
import { Link } from "react-router-dom";
function Productlist() {
  const Gender = [
    { label: "Male", id: "Male" },
    { label: "Female", id: "Female" },
    { label: "Other", id: "Other" },
  ];

  return (
    <div className="main-content">
      <main>
        <Grid container spacing={0} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={12}>
            {/* <h1 className="dash-title">Product List</h1> */}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "white",
            paddingRight: "20px",
            paddingBottom: "20px",
            marginLeft: 0.01,
            width: "99.8%",
          }}
        >
          <Grid item md={12} xs={4} sm={6}>
            <Link to="/Product">
              <Button variant="contained" style={{ float: "right" }}>
                Add
              </Button>
            </Link>
          </Grid>

          <Grid item md={12} xs={12} sm={12}>
            <h2>Product Table</h2>
            <ProductTbl/>
          </Grid>

          
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: 2, backgroundColor: "white" }}
        >
          {/* <Grid item xs={12} sm={12} md={12}>
            <p
              className="dash-title"
              style={{
                paddingBottom: "10px",
                float: "right",
                padding: "10px",
                alignItems: "center",
              }}
            >
              Developed by Matrix Infosolutions
            </p>
          </Grid> */}
        </Grid>
      </main>
    </div>
  );
}

export default Productlist;

