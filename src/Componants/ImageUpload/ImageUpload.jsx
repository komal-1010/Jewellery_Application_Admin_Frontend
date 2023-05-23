import React, { useState, useRef, useReducer, useEffect } from "react";

import { nanoid } from "nanoid";


import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { tostmsg } from "../../MIS/Global";

function ImageUpload(props) {
  const [f, setF] = useState("");

//   const [imgdata, setImgdata] = useState([]);
  const refinp_file = useRef(null);
  const [id, setId] = useState(0);
  const [file, setFile] = useState();

  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
   const onChange = (e) => {
    if (props.imgdata.length > props.imgcount) {
      let rettostmsg = tostmsg({
        code: 100,
        msg: `User Can Upload Only (${props.imgcount+1}) Image`,
      });
      setAlertdata(rettostmsg);
      setAlertopen(rettostmsg.open);
      return;
    }
    let files = e.target.files;

    let reader = new FileReader();
    let x = "";
    let y = "";
    reader.readAsDataURL(files[0]);
    // setFtype(files[0].type);
    x = files[0].type;
    // setFtype(files[0].type);
    reader.onload = (e) => {
      //console.log(e.target.result);
      setF(e.target.result);
      y = e.target.result;

      const newImg = {
        id: nanoid(),
        file: files[0],
        img: y,
        filetype: x,
      };
      const newContacts = [...props.imgdata, newImg];
      props.setImgdata(newContacts);
    };
  };
  const addImage = () => {
    refinp_file.current.click();
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
            <div
              className=""
              style={{
                border: "dotted",
                borderColor: "gray",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "self-start",
            
              }}
            >
              <input
                ref={refinp_file}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => onChange(e)}
              ></input>
              <button
                onClick={() => addImage()}
                type="button"
                style={{
                  height: 50,
                  width: "100%",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  border: "none",
                }}
              >
                Add Image
              </button>
            </div>
            </>
   
     
  );
}

export default ImageUpload;
