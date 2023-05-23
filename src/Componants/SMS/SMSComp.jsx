import React, { useState, useReducer, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation, useNavigate } from "react-router-dom";
import {  tostmsg } from "../../MIS/Global";
import { smsmastersave } from "../../API/SmsModel.";

function SMSComp() {
  const [smsid, setSmsid] = useState();
  const [sms, setSms] = useState("");
  const [smstype, setSmstype] = useState("");
  const location = useLocation();
  const from = location?.state;
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
  useEffect(() => {
    
    let res=from;
    // alert(JSON.stringify(res));
    if(res){
      res=from.from;
      // alert(JSON.stringify(res));
    if (res.toString().length > 0) {
      setSmsid(res.smsid);
      setSms(res.sms);
      setSmstype(res.smstype.toString());
    }
    }
  }, []);
  const navigate = useNavigate();
  const styles = theme => ({
    multilineColor:{
        color:'red'
    }
});
  const smstyp =[
    { label: "Diwali" },
    { label: "Holi"},
    { label: "Chrismas"},
    { label: "Eid"},
    { label: "Rakshabandhan"},
    { label: "Independece day"},
    { label: "Ganesh Chaturti"},
    { label: "Navratri"},
    { label: "Dussehra"},
    { label: "Birthday"},
    { label: "Anniversary"},
  ];
  let data = {
    smsid:smsid,
    sms:sms,
    smstype:smstype,
  };
  return (
    <div className="main-content">
      <main>
        <Grid container spacing={0} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={12}>
            {/* <h1
              className="dash-title"
              style={{ paddingBottom: "10px", color: "lightblue" }}
            >
            SMS
            </h1> */}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{
            backgroundColor: "white",
            paddingRight: "10px",
            paddingBottom: "10px",
            margin:2,
            width: "98%",
          }}>
        <Grid item md={12} xs={8} sm={6} >
          <h2>SMS Master</h2>
        </Grid>


<Grid item md={6} xs={8} sm={6} >
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      size = "small"
      value = {smstype}
      onChange={(e,newvalue) => {
        setSmstype(newvalue.label);
      }}
      fullWidth
      options={smstyp}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="SMS Type" />}
    />
  </Grid>

      <Grid item md={12} xs={8} sm={6} >
          <TextareaAutosize
          onChange={async(e)=>{
            let retdt=e.target.value;
            setSms(retdt);
          }} 
      aria-label="minimum height"
      minRows={3}
      fullWidth  value={sms}
      placeholder="SMS"
      style={{ width: "100%" }}
    />
      </Grid>

        <Grid item md={12} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    const profile = await smsmastersave(data);
                    // alert(JSON.stringify(profile));
                    let rettostmsg = tostmsg(profile);
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if(profile.code == 100){
                    }
                    if(profile.code == 200)
                    {
                      setTimeout(() => {                
                        navigate("/smslist", { replace: false })                  
                        
                      },500);
                    }
                  } catch (e) {}
                })();
              }}
            >
              SUBMIT
            </Button>
          </Grid>
          </Grid> 
          <Grid
          container
          spacing={2}
          sx={{ marginTop: 2, backgroundColor: "white", }}
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

export default SMSComp;
  
