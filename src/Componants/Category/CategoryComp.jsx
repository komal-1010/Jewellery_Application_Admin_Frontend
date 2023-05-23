import React, { useState, useReducer, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageUpload from "../ImageUpload/ImageUpload";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "@mui/system";
import { alphanumeric, IMG_URL, tostmsg } from "../../MIS/Global";
import {
  DeleteCategoryimg,
  Savecategory,
  Savecategoryimg,
} from "../../API/CategoryModel";
import ImagedataAppend from "../ImageUpload/ImagedataAppend";
import defualtimg from "../../Images/default-image.jpg";
import "./category.css";
function CategoryComp() {
  const [cid, setCid] = useState();
  const [cname, setCname] = useState("");
  const [imgdata, setImgdata] = useState([]);
  const [isactive, setIsactive] = useState(0);
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);

  const [file, setFile] = useState();
  const [oldimgdata, setOldimgdata] = useState([]);

  const location = useLocation();
  const from = location?.state;

  useEffect(() => {
    let res = from;
    // alert(JSON.stringify(res));
    if (res) {
      res = from.from;
      if (res.toString().length > 0) {
        setCid(res.catgid);
        setCname(res.catgname.toString());
        let img = JSON.parse(res.imgdata);
        // const newImg = {
        //   id: img[0].id,
        //   path: img[0].imglink,
        //   product: IMG_URL + img[0].imglink,
        // };
        setImgdata(img);
        setOldimgdata(img);
      }
    }
  }, []);

  let data = {
    catgid: cid,
    catgname: cname,
    imgdata: file,
    isactive: isactive,
  };
  const refinp_file = useRef(null);
  const navigate = useNavigate();
  const styles = (theme) => ({
    multilineColor: {
      color: "red",
    },
  });
  const handleDeleteImg = (imgid, data) => {
    const newImg = [...imgdata];
    const index = imgdata.findIndex((imgdata) => imgdata.id === imgid);
    newImg.splice(index, 1);
    setImgdata(newImg);
    DeleteCategoryimg(data);
  };
  const onChange = (e) => {
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
    reader.onload = (e) => {
      //console.log(e.target.result);
      // setF(e.target.result);

      setImgdata([{imglink:e.target.result}]);
    };
  };
  const addImage = () => {
    refinp_file.current.click();
  };

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
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "white",
            paddingRight: "20px",
            paddingBottom: "20px",
            marginTop: "5px",
            marginLeft: 0.01,
            width: "99.8%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item md={12} xs={8} sm={6}>
            <h2>Category</h2>
          </Grid>

          <Grid item md={8} xs={12} sm={12}>
            <TextField
              id="outlined-basic"
              label="C-Name"
              variant="outlined"
              fullWidth
              size="small"
              value={cname}
              onChange={async (e) => {
                let retdt = await alphanumeric(e);
                setCname(retdt);
              }}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            className="container"
            onClick={() => {
              {
                addImage();
              }
            }}
          >
            {/* <div className="container" style={{border:"1px solid black",}} onClick={()=>{{addImage()}}}> */}

            <img
              src={imgdata.length <= 0 ? defualtimg : imgdata[0].imglink}
              className="image"
            />
            <div class="middle">
              <div class="label">
                Add/Change Image
                <input
                  type="file"
                  ref={refinp_file}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    {
                      onChange(e);
                    }
                  }}
                  name=""
                  id=""
                />
              </div>
            </div>
            {/* </div> */}
          </Grid>
          {/* <Grid item md={6} xs={8} sm={6}>
            <ImageUpload
              setImgdata={setImgdata}
              imgdata={imgdata}
              imgcount={0}
            />
          </Grid> */}
          <Grid item md={10} xs={8} sm={6}>
            {/* <ImagedataAppend imgdata={imgdata} handleDeleteImg={handleDeleteImg} /> */}
          </Grid>
          <Grid item md={11} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    if (cname.length <= 0) {
                      let rettostmsg = tostmsg({ msg: "Enter Category Name", code: 100 });
                      setAlertdata(rettostmsg);
                      setAlertopen(rettostmsg.open);
                      return;
                    }
                    if (imgdata.length <= 0) {
                       let rettostmsg = tostmsg({ msg: "Select Image", code: 100 });
                      setAlertdata(rettostmsg);
                      setAlertopen(rettostmsg.open);
                      return;
                    }
                    if(file!=undefined && cid>0){
                      let x=oldimgdata[0].imglink.slice(oldimgdata[0].imglink.lastIndexOf('/') + 1); // "buz
                      // alert(x)
                      let delImg=DeleteCategoryimg({imglink:x});

                    }
                    // return;
                    const img = await Savecategoryimg(file);
                  
                    if (img.code == 100) {
                      let rettostmsg = tostmsg(img);
                      setAlertdata(rettostmsg);
                      setAlertopen(rettostmsg.open);
                      return;
                    }

                    let data1 = {
                      catgid: cid,
                      catgname: cname,
                      imgdata: file!=undefined?img.data:imgdata,
                      isactive: isactive,
                    };
                    // alert(JSON.stringify(data1));
                    const profile = await Savecategory(data1);

                    let rettostmsg = tostmsg(profile);
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if (profile.code == 100) {
                    }
                    if (profile.code == 200) {
                      setTimeout(() => {
                        navigate("/categorylist", { replace: false });
                      }, 500);
                    }
                  } catch (e) {}
                })();
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        {/* <Grid
          container
          spacing={2}
          sx={{ marginTop: 2, backgroundColor: "white" }}
        >
          <Grid item xs={12} sm={12} md={12}>
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
          </Grid>
        </Grid> */}
      </main>
    </div>
  );
}

export default CategoryComp;
