import React, { useState, useReducer, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "@mui/system";
import { alphanumeric, IMG_URL, tostmsg } from "../../MIS/Global";
import { Category } from "@mui/icons-material";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Deletesubcategoryimg, SaveSubcategory } from "../../API/SubcategoryModel";
import ImagedataAppend from "../ImageUpload/ImagedataAppend";
function SubcategoryComp() {
  const[subcatgid,setSubcatgid]=useState();
  const [subname, setSubname] = useState("");
  const [category, setCategory] = useState(0);
  const[imgdata,setImgdata]=useState([]);
  const[isactive,setIsactive]=useState(0);
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
  

  const location=useLocation();
  const from = location?.state;

  useEffect(() => {
    
    let res=from;
    // alert(JSON.stringify(res));
    if(res){
      
      res=from.from;
      if (res.toString().length > 0) {
        
        setSubcatgid(res.subcatgid);
        setCategory(res.catgid);
        setSubname(res.subcatgname.toString());
        let img = JSON.parse(res.imgdata);
        const newImg = {
          id: img[0].id,
          path: img[0].imglink,
          product: IMG_URL+ img[0].imglink,
        };
        setImgdata([newImg]);
        
        
      }
    }
    
  }, []);

  
  let data = {
    subcatgid:subcatgid,
    catgid:category,
    subcatgname:subname,
    isactive:isactive,
    imgdata:imgdata,
   
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
    Deletesubcategoryimg(data);
  }
  const Category = [
    { label: 'Banner' },
    { label: 'Slider' },
  ]
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
              Sub-Category
            </h1>
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
          <Grid item md={12} xs={8} sm={6}>
            <h2>Sub Category</h2>
          </Grid>

          <Grid item md={6} xs={8} sm={6}>
          <TextField id="outlined-basic" label="Sub-Name" variant="outlined" fullWidth size="small"
          value={subname}
          onChange={async(e)=>{
            let retdt= await alphanumeric(e);
            setSubname(retdt);
          }}/>
          
          </Grid>
          <Grid item md={6} xs={8} sm={6}  >
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={Category}
      fullWidth
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Category" size="small" />}
      value={category}
              onChange={(e,newvalue) => {
                setCategory(newvalue.label);
              }}
    />
  

          </Grid>
              
          <Grid item md={6} xs={8} sm={6}>
            <ImageUpload
              setImgdata={setImgdata}
              imgdata={imgdata}
              imgcount={0}
            />
          </Grid>
          <Grid item md={6} xs={8} sm={6}>
          <ImagedataAppend imgdata={imgdata} handleDeleteImg={handleDeleteImg} />
          </Grid>
          <Grid item md={11} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    const profile = await SaveSubcategory(data);
                    // alert(JSON.stringify(profile));
                    // alert(JSON.stringify(emp));
                    // handleSave(profile);
                    let rettostmsg = tostmsg(profile);
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if(profile.code == 100){
                    }
                    if(profile.code == 200)
                    {
                      setTimeout(() => {                
                        navigate("/subcategorylist", { replace: false })                  
                        
                      },500);
                    }
                  } catch (e) {}
                })();
              }}
            >
              Submit
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

export default SubcategoryComp;
