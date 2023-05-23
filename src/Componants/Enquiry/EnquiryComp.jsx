import React, { useState, useReducer, useEffect } from "react";
import "../../CSS/Base.css";
import Grid from "@mui/material/Grid";
import EnquiryTbl from "../../Table/EnquiryTbl";

function EnquiryComp() {
  return (
    <div className="main-content">
      <main>
        <Grid container spacing={0} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={12}>
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
        <Grid item md={12} xs={12} sm={12}>
            <h2>Enquiry Table</h2>
            <EnquiryTbl/>
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
export default EnquiryComp;








