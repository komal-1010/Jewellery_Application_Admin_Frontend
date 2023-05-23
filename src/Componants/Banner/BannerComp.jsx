import React, { useState, useReducer, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { useLocation, useNavigate } from "react-router-dom";
import { alphanumeric, IMG_URL, tostmsg } from "../../MIS/Global";
import ImageUpload from "../ImageUpload/ImageUpload";
import {
  Bannersave,
  DeleteBannerimg,
  Deletebannerimg,
  Savebannerimg,
} from "../../API/BannerMasterModel/BannerModel";
import ImagedataAppend from "../ImageUpload/ImagedataAppend";
import "../Category/category.css";
import { useRef } from "react";
import defualtimg from "../../Images/default-image.jpg";
function BannerComp() {
  const [bid, setBid] = useState();
  const [remark, setRemark] = useState("");
  const [btype, setBType] = useState("");
  const [imgdata, setImgdata] = useState([]);
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
  const location = useLocation();
  const from = location?.state;

  const [file, setFile] = useState();
  const [oldimgdata, setOldimgdata] = useState([]);
  useEffect(() => {
    let res = from;
    // alert(JSON.stringify(res));
    if (res) {
      res = from.from;
      if (res.toString().length > 0) {
        setBid(res.bid);
        setRemark(res.remark.toString());
        setBType(res.btype.toString());
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
    bid: bid,
    remark: remark,
    btype: btype,
    imgdata: imgdata,
  };
  const refinp_file = useRef(null);

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
  const handleDeleteImg = (imgid, data) => {
    const newImg = [...imgdata];
    const index = imgdata.findIndex((imgdata) => imgdata.id === imgid);
    newImg.splice(index, 1);
    setImgdata(newImg);
    DeleteBannerimg(data);
  };
  const navigate = useNavigate();
  const styles = (theme) => ({
    multilineColor: {
      color: "red",
    },
  });
  const BType = [{ label: "Banner" }, { label: "Slider" }];
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
        <Grid container spacing={0} sx={{ marginBottom: 2 }}></Grid>
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
            <h2>Banner</h2>
          </Grid>

          <Grid item md={6} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="Remark"
              variant="outlined"
              fullWidth
              size="small"
              value={remark}
              onChange={async (e) => {
                let retdt = await alphanumeric(e);
                setRemark(retdt);
              }}
            />
          </Grid>
          <Grid item md={6} xs={8} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={BType}
              fullWidth
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="BType" size="small" />
              )}
              value={btype}
              onChange={(e, newvalue) => {
                setBType(newvalue.label);
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
          </Grid>
          <Grid item md={6} xs={8} sm={6}>
          <ImagedataAppend imgdata={imgdata} handleDeleteImg={handleDeleteImg} />
          </Grid> */}

          <Grid item md={11} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    if (btype <= 0) {
                      let rettostmsg = tostmsg({
                        msg: "Select Image Type",
                        code: 200,
                      });
                      setAlertdata(rettostmsg);
                      setAlertopen(rettostmsg.open);
                    }
                    if (imgdata.length <= 0) {
                      let rettostmsg = tostmsg({
                        msg: "Select Image",
                        code: 100,
                      });
                      setAlertdata(rettostmsg);
                      setAlertopen(rettostmsg.open);
                      return;
                    }
                    if (file != undefined && bid > 0) {
                      let x = oldimgdata[0].imglink.slice(
                        oldimgdata[0].imglink.lastIndexOf("/") + 1
                      ); // "buz
                      // alert(x)
                      let delImg = DeleteBannerimg({ imglink: x });
                    }
                    // return;
                    const img = await Savebannerimg(file);

                    if (img.code == 100) {
                      alert();
                      let rettostmsg = tostmsg(img);
                      setAlertdata(rettostmsg);
                      setAlertopen(rettostmsg.open);
                      return;
                    }

                    let data1 = {
                      bid: bid,
                      remark: remark,
                      btype: btype,
                      imgdata: file != undefined ? img.data : imgdata,
                      // isactive: isactive,
                    };
                    // alert(JSON.stringify(data1));
                    const banner = await Bannersave(data1);
                    let rettostmsg = tostmsg(banner);
                    // alert(JSON.stringify(rettostmsg));
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if (banner.code == 100) {
                    }

                    if (banner.code == 200) {
                      setTimeout(() => {
                        navigate("/bannerlist", { replace: false });
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

export default BannerComp;
