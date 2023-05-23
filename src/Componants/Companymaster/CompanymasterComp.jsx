import React, { useState, useReducer, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useLocation, useNavigate } from "react-router-dom";
import { alphanumeric, IMG_URL, onlynumeric, tostmsg } from "../../MIS/Global";
import { companymastersave, Deletecompanyimg } from "../../API/companymaster";
import ImageUpload from "../ImageUpload/ImageUpload";
import ImagedataAppend from "../ImageUpload/ImagedataAppend";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";

function CompanymasterComp() {
  const [cmpid, setCmpid] = useState();
  const [cname, setCname] = useState("");
  const [oname, setOname] = useState("");
  const [mobileno, setMobileno] = useState();
  const [wmob, setWmob] = useState();
  const [cmpaddress, setCmpaddress] = useState("");
  const [weblink, setWeblink] = useState("");
  const [cemail, setCemail] = useState("");
  const [officeno, setOfficeno] = useState();
  const [devoheding, setDevoheading] = useState("");
  const [imgdata, setImgdata] = useState([]);

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
      setCmpid(res.cmpid);
      setCname(res.cmpname);
      setOname(res.oname.toString());
      setCmpaddress(res.cmpaddress.toString());
      setMobileno(res.mob);
      setWmob(res.wmob);
      setWeblink(res.weblink.toString());
      setCemail(res.cemail.toString());
      setOfficeno(res.officeno);
      setDevoheading(res.devoheding);
      
       
        let img = JSON.parse(res.cmplogo);
        const newImg = {
          id: img[0].id,
          path: img[0].imglink,
          product: IMG_URL + img[0].imglink,
        };
        setImgdata([newImg]);
      }
    }
    
  }, []);
 

  const Gender = [
    { label: "Male", id: "Male" },
    { label: "Female", id: "Female" },
    { label: "Other", id: "Other" },
  ];

let data = {
    cmpid:cmpid,
    cmpname:cname,
    ownername:oname,
    cmpaddress:cmpaddress,
    mob:mobileno,
    wmob,wmob,
    weblink:weblink,
    cemail:cemail,
    officeno:officeno,
    devoheding:devoheding,
    cmplogo:imgdata,
  };
  const navigate = useNavigate();
  const styles = theme => ({
    multilineColor:{
        color:'red'
    }
});
  const handleDeleteImg = (imgid, data) => {
    const newImg = [...imgdata]
    const index = imgdata.findIndex((imgdata) => imgdata.id === imgid)
    newImg.splice(index, 1)
    setImgdata(newImg)
    Deletecompanyimg(data);
  }
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
            <h1
              className="dash-title"
              style={{ paddingBottom: "10px", color: "lightblue" }}
            >
            
            </h1>
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
  <h2>Company Master</h2>
</Grid>


        <Grid item md={3} xs={8} sm={6} >
          <TextField id="outlined-basic" label="Company Name" fullWidth value={cname} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            let retdt=await alphanumeric(e);
            setCname(retdt);
          }} /> 
          </Grid>



          <Grid item md={3} xs={8} sm={6}>
          <TextField id="outlined-basic" label="Owner Name" fullWidth value={oname} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            let retdt=await alphanumeric(e);
            setOname(retdt);
          }
         } />
          </Grid> 


          <Grid item md={3} xs={8} sm={6} >
          <TextField id="outlined-basic"   inputProps={{ maxLength: 10 }}label="Mobile Number" fullWidth value={mobileno} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            let retdt=await onlynumeric(e);
            setMobileno(retdt);
          }} /> 
          </Grid>


          <Grid item md={3} xs={8} sm={6} >
          <TextField id="outlined-basic"   inputProps={{ maxLength: 10 }}label="WhatsApp Number" fullWidth value={wmob} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            let retdt=await onlynumeric(e);
            setWmob(retdt);
          }} /> 
          </Grid>


          <Grid item md={12} xs={8} sm={6} >
          <TextareaAutosize
          onChange={async(e)=>{
            let retdt=await alphanumeric(e);
            setCmpaddress(retdt);
          }} 
      aria-label="minimum height"
      minRows={3}
      fullWidth  value={cmpaddress}
      placeholder="Address"
      style={{ width: "100%" }}
    />
          </Grid>

          <Grid item md={6} xs={8} sm={6} >
          <TextField id="outlined-basic" label="Web Link" fullWidth value={weblink} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            // let retdt=await alphanumeric(e);
            setWeblink(e.target.value);
          }} /> 
          </Grid>
          
          
          <Grid item md={6} xs={8} sm={6} >
          <TextField id="outlined-basic" label="Email" fullWidth value={cemail} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            // let retdt=await alphanumeric(e);
            setCemail(e.target.value);
          }} /> 
          </Grid>



          <Grid item md={4} xs={8} sm={6} >
          <TextField id="outlined-basic" label="Office Number" fullWidth value={officeno} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            let retdt=await onlynumeric(e);
            setOfficeno(retdt);
          }} /> 
          </Grid>


          <Grid item md={4} xs={8} sm={6} >
          <TextField id="outlined-basic" label="Devo Heading" fullWidth value={devoheding} size="small" style={{width:"100%"}}
          onChange={async(e)=>{
            let retdt=await alphanumeric(e);
            setDevoheading(retdt);
          }} /> 
          </Grid>



          <Grid item md={4} xs={8} sm={6} >
            <ImageUpload setImgdata={setImgdata} imgdata={imgdata} imgcount={0}/>
            </Grid>


          <Grid item md={4} xs={8} sm={6} >
          <ImagedataAppend setImgdata={setImgdata} imgdata={imgdata} handleDeleteImg={handleDeleteImg}/>
          </Grid>

          
          <Grid item md={12} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    
                    const profile = await companymastersave(data);
                    // alert(JSON.stringify(profile));
                    let rettostmsg = tostmsg(profile);
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if(profile.code == 100){
                    }
                    if(profile.code == 200)
                    {
                      setTimeout(() => {                
                        navigate("/companymastertbl", { replace: false })                  
                        
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

export default CompanymasterComp;
  
