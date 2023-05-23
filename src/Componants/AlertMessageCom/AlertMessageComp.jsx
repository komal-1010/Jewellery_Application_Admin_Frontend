import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessageComp(props) {
  const handleClick = () => {
    props.setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  useEffect(() => {
    //handleClick();
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: `${props.vertical}`,
          horizontal: `${props.horizontal}`,
        }}
      >
        {props.type == "success" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {props.msg}
          </Alert>
        ) : props.type == "warning" ? (
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {props.msg}
          </Alert>
        ) : props.type == "info" ? (
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            {props.msg}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {props.msg}
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
}
