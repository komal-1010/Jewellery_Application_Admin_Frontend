import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { padding } from "@mui/system";
import { useRef } from "react";
import { useState } from "react";
import "./ImgUpload.css";
import { CheckBox, Sync } from "@mui/icons-material";
import { tostmsg } from "../../MIS/Global";

import DoneIcon from '@mui/icons-material/Done';
import { Getimgs, Saveimg, Uploadimg } from "../../API/ImguploadModel";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { UserContext } from "../../API/UserContext";

const ImgUploadComp = (props) => {

  const {imgupload, setImgupload_dispatch } = useContext(UserContext)

  const fileref = useRef();

  const [searchdata, setSearchdata] = useState();
  const [file, setFile] = useState();
  const [imgdata, setImgdata] = useState([]);
  const [imgdata1, setImgdata1] = useState([]);
  const [orgdata, setOrgdata] = useState([]);


  const [open, setOpen] = React.useState(false);
  // const handleClose = () => setOpen(false);
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
  const onChange = async (e) => {
    let files = e.target.files;
    
    let reader = new FileReader();
    let x = "";
    let y = "";
    const formdata = new FormData();
    formdata.append("file[]", files[0]);
    setFile(formdata);
    reader.readAsDataURL(files[0]);
    // setFtype(files[0].type);
    x = files[0].type;
    // setFtype(files[0].type);
    reader.onload = async (e) => {
      //console.log(e.target.result);
      // setF(e.target.result);      
      const img =await Uploadimg(formdata);
      // alert(JSON.stringify(img))
      if (img.code == 100) {
        let rettostmsg = tostmsg(img);
        setAlertdata(rettostmsg);
        setAlertopen(rettostmsg.open);
        return;
      } else {
        let data2 = {
          imgpath: img.data[0]?.imglink,
          imgtype: img.data[0]?.media_type,
          imgname: img.data[0].file_name,
          uid: sessionStorage.getItem("loginid"),
        };
        // alert(JSON.stringify(img));
        let saveimg = await Saveimg(data2)
        let rettostmsg = tostmsg(img);
        setAlertdata(rettostmsg);
        setAlertopen(rettostmsg.open);
        getData()
        return;
      }
      setImgdata([{ imglink: e.target.result }]);
    };
  };
  let tabledata = {};

  const getData = async () => {
    // let data = { fdate: monday, tdate: saturday };
    tabledata =await Getimgs();
    if (tabledata.code == 300) {
      // alert()
      setImgdata([]);
    } else {
      let newArray=[];
      tabledata.data.forEach(element => {
        let dt={
          imgid:element.imgid,
          imgpath:element.imgpath,          
          imgtype:element.imgtype,
          imgname:element.imgname,
          uid:element.uid,
          opacity1:"none",          
        }
        newArray.push(dt);
        
      });
      // alert(JSON.stringify(newArray));
      // setImgdata(tabledata.data);
      setImgdata(newArray);
      setOrgdata(newArray);
    }
  };
  const setOpacity=(imgid)=>{
    let newArray=[];
    
    const items=imgdata;
    const item=items.find(item=>item.imgid===imgid);
    item.opacity1=item.opacity1=="block"?"none":"block";
    // alert(JSON.stringify(items));
    // setImgdata(items);    
    newArray=items;
    
    setImgdata1(newArray);
    
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if(imgdata1.length>=1){
      setImgdata(imgdata1);    
      setOrgdata(imgdata1)
    }    
  }, [imgdata1])

  

  const imgsearch=(searchstr)=>{
    const filteredRows = orgdata.filter((row) => {
      return row.imgname.toLowerCase().includes(searchstr.toLowerCase());
    });
    setImgdata(filteredRows)
  }
// useEffect(() => {
//  alert(JSON.stringify(imgupload))
// }, [imgupload])

  

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
      <Grid container msx={{ backgroundColor: "pink" }} spacing={2}>
        <Grid item xs={10} md={10}>
          <span style={{ fontSize: 28, fontWeight: "bold" }}>
            Choose Images
          </span>
        </Grid>
        <Grid
          item
          xs={2}
          md={2}
          sx={{ display: "flex", justifyContent: "end", cursor: "pointer" }}
        >
          <CloseIcon onClick={props.handleClose} />
        </Grid>
        <Grid item xs={12} md={12}>
          <hr />
        </Grid>
        <Grid
          item
          sm={12}
          md={4}
          sx={{ fontWeight: "bold", fontSize: 20, padding: "10px" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ borderRadius: "20px" }}
              onClick={async () => {
                fileref.current.click();
              }}
            >
              + Upload Image
            </Button>
          </Box>
          <input
            type="file"
            ref={fileref}
            style={{ display: "none" }}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  position: "sticky",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                {/* <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    m: 1,
                    width: "90%",
                  }}
                > */}
                  {/* <InputLabel htmlFor="outlined-adornment-amount"></InputLabel> */}
                  <TextField
                      label="Search"
                      id="outlined-start-adornment"
                      fullWidth
                      size="small"
                      sx={{ m: 1}}
                      variant="outlined"
                      value={searchdata}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end"><CloseIcon sx={{cursor:"pointer"}} onClick={()=>{
                          setSearchdata("")
                          imgsearch("")
                        }} /></InputAdornment>,

                      }}
                      
                      onChange={(e)=>{
                        imgsearch(e.target.value)
                        setSearchdata(e.target.value)
                      }}
                    />    
                {/* </FormControl> */}
                <Grid item container sx={{ }}>
                  <Grid item xs={6} md={6}>
                    <h1>Home</h1>
                  </Grid>
                  <Grid item xs={6} md={6} sx={{ marginTop: "20px",marginBottom:"20px" }}>
                    <Button
                      variant="text"
                      sx={{ borderRadius: "20px", border: "1px solid skyblue" ,float:"right"}}
                      onClick={()=>{
                        const filteredRows = imgdata.filter((row) => {
                          return row.opacity1.toLowerCase().includes("block".toLowerCase());
                        });
// alert(JSON.stringify(filteredRows));
                        setImgupload_dispatch({
                          type:"add",
                          data:filteredRows
                        })
                        // alert(JSON.stringify(imgupload));
                        props.handleClose()
                        
                      }
                    }                     
                    >
                      Add to Page
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              xs={12}
              md={12}
              sx={{ maxHeight: "250px", overflowY: "auto" }}
            >
              {imgdata.map((element) => {
                
                return (
                  <Grid item xs={12} md={4}>
                    <Paper
                      elevation={4}
                      sx={{
                        backgroundImage: `url(${element.imgpath})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        width: "100%",
                        height: "150px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                        
                      }}
                      onClick={()=>{
                        setTimeout(() => {                          
                          setImgdata1([]);
                        }, 1000);
                         setOpacity(element.imgid);
                       }}
                    >                      
                      <DoneIcon
                        sx={{
                          height:"100%",
                          width:"100%",      
                          color:"#083aa9",                    
                          // backgroundColor:"#F1F6F5",
                          display: element.opacity1,
                          textDecoration:"none",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          position: "absolute",
                        }}
                      ></DoneIcon>
                    </Paper>
                    <span>{element.imgname}</span>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ImgUploadComp;
