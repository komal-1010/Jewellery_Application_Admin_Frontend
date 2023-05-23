import React, { useState, useReducer, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { alphanumeric, onlynumeric, tostmsg } from "../../MIS/Global";
import { Backdrop, InputAdornment } from "@mui/material";
import { loginsave } from "../../API/Loginmaster";
import "../Login/login.css";
import { AccountCircle, Https } from "@mui/icons-material";
import img from "../../Images/Logos.png";
import { padding } from "@mui/system";
import { UserContext } from "../../API/UserContext";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import LockIcon from "@mui/icons-material/Lock";

function LoginComp() {
  const [logid, setLogid] = useState();
  const [mobileno, setMobileno] = useState();
  const [password, setPassword] = useState();
  const [refid, setRefid] = useState(0);
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);

  let data = {
    logid: logid,
    mob: mobileno,
    passwd: password,
    role: "admin",
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  // let { logindata, setLogindata } = useContext(UserContext);
  const { updatelogindata, setRedirect, redirect } = useContext(UserContext);

  const navigate = useNavigate();
  const styles = (theme) => ({
    multilineColor: {
      color: "red",
    },
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <AlertMessageComp
        type={alertdata.type}
        msg={alertdata.msg}
        vertical={alertdata.vertical}
        horizontal={alertdata.horizontal}
        setOpen={setAlertopen}
        open={alertopen}
      />

      <div className="body">
        <div
          style={{
            // width:"30vw",
            boxShadow: "2px 2px 3px 2px rgba(12,12,12,0.5)",
            background: "rgba(255, 255, 255, 0.2)",
            padding: "15px",
          }}
        >
          <Grid
            classname="login"
            container
            spacing={2}
            sx={{ width: "300px", opacity: 1 }}
          >
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={img} />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0000FF",
              }}
            >
              <h1>Login</h1>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                label="Mobile Number"
                fullWidth
                value={mobileno}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 10 }}
                onChange={async (e) => {
                  let retdt = await onlynumeric(e);
                  setMobileno(retdt);
                }}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E05194",
            }}
          >
            <Button
              sx={{ color: "#FFF", background: "#0000FF" }}
              variant="contained"
              type="button"
              onClick={() => {
                (async () => {
                  try {
                    const login = await loginsave(data);
                    let logindata = login;
                    // updatelogindata(logindata)
                    sessionStorage.setItem("loginid", login.data[0].logid);
                    // setLogindata(login);
                    // alert(JSON.stringify(profile));
                    let rettostmsg = tostmsg(login);
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if (login.code == 100) {
                    }
                    if (login.code == 200) {
                      setRedirect("/banner");
                      // setLogindata(login);

                      setTimeout(() => {
                        navigate("/bannerlist", { replace: false });
                      }, 500);
                    }
                  } catch (e) {}
                })();
              }}
            >
              Login
            </Button>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default LoginComp;
