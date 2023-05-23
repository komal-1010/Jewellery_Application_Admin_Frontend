import React, { useState, useReducer, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { useLocation, useNavigate } from "react-router-dom";
import { alphanumeric, IMG_URL, onlynumeric, tostmsg } from "../../MIS/Global";
import { customermastersave } from "../../API/CustomerModel";

function CustomerComp() {
  const [custid, setCustid] = useState();
  const [custname, setCustname] = useState("");
  const [mobileno, setMobileno] = useState();
  const [wmob, setWmob] = useState();
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");

  const location = useLocation();
  const from = location?.state;

  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
  useEffect(() => {
    let res = from;
    // alert(JSON.stringify(res));
    if (res) {
      res = from.from;
      // alert(JSON.stringify(res));

      if (res.toString().length > 0) {
        setCustid(res.custid);
        setCustname(res.custname);
        setAddress(res.address.toString());
        setMobileno(res.mob);
        setWmob(res.wmob);
        setGender(res.gender.toString());
        let dob1=new Date(res.dob)
        let day=dob1.getDate();
        if(day.toString().length==1){
          day=`0${day}`;
        }
        let month=dob1.getMonth()+1;
        // alert(month.toString().length)
        if(month.toString().length==1){
          month=`0${month}`;
        }
        let year=dob1.getFullYear();
         
        setDob(`${year}-${month}-${day}`);
      }
    }
  }, []);

  const Gender = [
    { label: "Male", id: "Male" },
    { label: "Female", id: "Female" },
    { label: "Other", id: "Other" },
  ];
  
  let data = {
    custid: custid,
    custname: custname,
    address: address,
    mob: mobileno,
    wmob:wmob,
    gender: gender,
    dob:dob, //`${dob.getFullYear()}-${dob.getMonth()+1}-${dob.getDate()}`,
  };
  const navigate = useNavigate();
  const styles = theme => ({
    multilineColor:{
        color:'red'
    }
});

  return (
    <div className="main-content">
      <AlertMessageComp
    type={alertdata.type}
    msg={alertdata.msg}
    vertical={alertdata.vertical}
    horizontal={alertdata.horizontal}
    setOpen={setAlertopen}
    open={alertopen}
  />
      <main>
        <Grid container spacing={0} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={12}>
            {/* <h1
              className="dash-title"
              style={{ paddingBottom: "10px", color: "lightblue" }}
            >
              Customer Profile
            </h1> */}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "white",
            paddingRight: "10px",
            paddingBottom: "10px",
            // marginLeft: 0.01,
            margin: 2,
            width: "98%",
          }}
        >
          <Grid item md={12} xs={8} sm={6}>
            <h2> Customer Master</h2>
          </Grid>

          <Grid item md={4} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="Customer Name"
              fullWidth
              value={custname}
              size="small"
              style={{ width: "100%" }}
              onChange={async (e) => {
                let retdt = await alphanumeric(e);
                setCustname(retdt);
              }}
            />
          </Grid>

          <Grid item md={4} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              inputProps={{ maxLength: 10 }}
              label="Mobile Number"
              fullWidth
              value={mobileno}
              size="small"
              style={{ width: "100%" }}
              onChange={async (e) => {
                let retdt = await onlynumeric(e);
                setMobileno(retdt);
              }}
            />
          </Grid>

          <Grid item md={4} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              inputProps={{ maxLength: 10 }}
              label="WhatsApp Number"
              fullWidth
              value={wmob}
              size="small"
              style={{ width: "100%" }}
              onChange={async (e) => {
                let retdt = await onlynumeric(e);
                setWmob(retdt);
              }}
            />
          </Grid>

          <Grid item md={6} xs={8} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              value={gender}
              onChange={(e, newvalue) => {
                setGender(newvalue.label);
              }}
              fullWidth
              options={Gender}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Gender" />}
            />
          </Grid>

          <Grid item md={6} xs={8} sm={6}>
            <TextField
              type="date"
              id="outlined-basic"
              label="Date of birth"
              fullWidth
              value={dob}
              size="small"
              inputLabelProps={{shrink:true}}
              style={{ width: "100%" }}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </Grid>

          <Grid item md={12} xs={8} sm={6}>
            <TextareaAutosize
              onChange={async (e) => {
                let retdt = await alphanumeric(e);
                setAddress(retdt);
              }}
              aria-label="minimum height"
              minRows={3}
              fullWidth
              value={address}
              placeholder="Address"
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
                    const profile = await customermastersave(data);
                    // alert(JSON.stringify(profile));
                    let rettostmsg = tostmsg(profile);
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if (profile.code == 100) {
                    }
                    if (profile.code == 200) {
                      setTimeout(() => {                
                        navigate("/customertbl", { replace: false })                  
                        
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

export default CustomerComp;
