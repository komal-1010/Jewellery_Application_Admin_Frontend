import React, { useState, useReducer, useEffect, useRef, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, Modal } from "@mui/material";
import { alphanumeric, IMG_URL, onlydecimal, tostmsg } from "../../MIS/Global";
import ImageUpload from "../ImageUpload/ImageUpload";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ImagedataAppend from "../ImageUpload/ImagedataAppend";
import CompanymasterListtbl from "../../Table/CompanymasterListtbl";
import { Alert, Deleteproductimg, Saveproduct, Saveproductimg } from "../../API/ProductModel";
import PriceTable from "../../Table/PriceTable";
import OfferTable from "../../Table/OffersTable";
import CategorySuggest from "../../Textsuggestfield/CategorySuggest";
import AlertMessageComp from "../AlertMessageCom/AlertMessageComp";
import { useLocation, useNavigate } from "react-router-dom";
import defualtimg from "../../Images/default-image.jpg";
import { nanoid } from "nanoid";
import { Close } from "@mui/icons-material";
import ImgUploadComp from "../ImageUpload/ImgUploadComp";
import { UserContext } from "../../API/UserContext";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor:"white",
  // width: 800,
  height:"80vh",
  // overflowY:"scroll",
  padding:"10px",
  overflow:"auto"
 };
function ProductComp() {
  const {imgupload, setImgupload_dispatch } = useContext(UserContext);
  const [prodid, setProductid] = useState();
  const [title, setTitle] = useState("");
  const [catgid, setCatgId] = useState(0);
  const [category, setCategory] = useState("");
  const [flag, setFlag] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [decr, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [offerlist, setOfferlist] = useState([]);
  const [pricedetail, setPricedetail] = useState("");
  const [pricedetaillist, setPricedetaillist] = useState([]);
  const [imgdata, setImgdata] = useState([]);
  const [isactive, setIsactive] = useState("");
  const [unit, setUnit] = useState("");
  const [towt, setTowt] = useState("");
  const [notes, setNotes] = useState("");
  const [fromwt, setFromwt] = useState("");
  const [fromunit, setFromunit] = useState("");
  const [tounit, setTounit] = useState("");
  const [imageupload, setImageupload] = useState([]);
  const [fromprice, setFromPrice] = useState("");
  const [toprice, setToPrice] = useState("");
  const offerinput = useRef();
  const frominput = useRef();
  const location = useLocation();
  const from = location?.state;
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false);
  const [file, setFile] = useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [produrl,setProdurl] = useState("http://localhost:3001");
  const handleClose = () => setModelOpen(false);
  const handleOpen = () => {  setModelOpen(true);}

  const onChange = (e) => {
    let files = e.target.files;

    let reader = new FileReader();
    let x = "";
    let y = "";
    const formdata = new FormData();
    formdata.append("file[]", files[0]);
    let Newoffer = [...file, formdata];
    setFile(Newoffer);
    reader.readAsDataURL(files[0]);
    // setFtype(files[0].type);
    x = files[0].type;
    // setFtype(files[0].type);
    reader.onload = (e) => {
      //console.log(e.target.result);
      // setF(e.target.result);
      let imgLink = {
        id: nanoid(),
        imglink: e.target.result,
      };
      setImgdata([{imglink:e.target.result}]);

      // setImgdata([imgLink]);
      let arr = [];
      arr.push(...imgdata, imgLink);
      // setImgdata(arr);
    };
  };
  const addImage = () => {
    refinp_file.current.click();
  };

  useEffect(() => {
    let res = from;
    // alert(JSON.stringify(res));
    if (res) {
      res = from.from;
      // alert(JSON.stringify(res));
      if (res.toString().length > 0) {
        setProductid(res.prodid);
        setTitle(res.title.toString());
        setCatgId(res.catgid);
        setCategory(res.catgname.toString());
        setType(res.type.toString());
        setFlag(res.flag.toString());
        setGender(res.gender.toString());
        setDescription(res.decr.toString());
        
        let newofferlist = [];
        let newofferarray = [];
        // alert(JSON.stringify(res.offer));
        newofferlist = JSON.parse(res.offer);
       
        newofferlist.forEach((element) => {
          let data = {
            id: element.id,
            offer: element.offer,
          };
          newofferarray.push(data);
        });
        setOfferlist(newofferarray);

        let newpricedetaillist = [];
        let newpricedetail = [];
        // alert(JSON.stringify(res.offer));
        newpricedetaillist = JSON.parse(res.pricedetail);
        newpricedetaillist.forEach((element) => {
          let data = {
            id: element.id,
            fromwt: element.fromwt,
            fromunit: element.fromunit,
            towt: element.towt,
            tounit: element.fromunit,
            fromprice: element.fromprice,
            toprice: element.toprice,
          };
          newpricedetail.push(data);
        });
        setPricedetaillist(newpricedetail);
        let img = JSON.parse(res.imgdata);
        setImgupload_dispatch({
          type:"add",
          data:img
        })
        let newarray = [];
        img.forEach((element) => {
          let newImg = {
            id: element.id,
            path: element.imglink,
            product: IMG_URL + element.imglink,
          };
          newarray.push(newImg);
        });
        setImgdata(newarray);
      }
    }
  }, []);
  const refinp_file = useRef(null);

  const addOffer = () => {
    let data = {
      id: new Date().getTime(),
      offer: offer,
    };
    // alert(offer);
    let Newoffer = [...offerlist, data];
    setOfferlist(Newoffer);
    setOffer("");
    offerinput.current.focus();
  };

  const DelOffer = (id) => {
    let data = offerlist.filter((element) => element.id !== id);
    // alert(offer);
    let Newoffer = [...offerlist, data];
    setOfferlist(data);
  };

  const addpricedetails = () => {
    let data = {
      id: new Date().getTime(),
      fromwt: fromwt,
      fromunit: fromunit,
      towt: towt,
      tounit: fromunit,
      fromprice: fromprice,
      toprice: toprice,
    };

    let Newpricedetail = [...pricedetaillist, data];
    setPricedetaillist(Newpricedetail);
    setFromwt("");
    setFromunit("");
    setTowt("");
    setTounit("");
    setFromPrice("");
    setToPrice("");
    frominput.current.focus();
  };

  const DelPricedetail = (id) => {
    let data = pricedetaillist.filter((element) => element.id !== id);
    // alert(offer);
    let Newoffer = [...pricedetaillist, data];
    setPricedetaillist(data);
  };

  const Gender = [
    { label: "Male", id: "Male" },
    { label: "Female", id: "Female" },
    { label: "Kids", id: "Kids" },
    { label: "Other", id: "Other" },
  ];
  const Units = [{ label: "No" }, { label: "gm" }, { label: "ml" }];
  const Type = [
    { label: "Gold" },
    { label: "Silver" },
    { label: "Diamond" },
    { label: "Platinum" },
  ];
  const Flag = [{ label: "New" }, { label: "Trending" }, { label: "Regular" }];
  const Category = [
    { label: "Ring" },
    { label: "Neckless" },
    { label: "Bracelate" },
    { label: "Earrings" },
    { label: "Nosering" },
    { label: "Bangals" },
  ];
  let data = {
    prodid: prodid,
    catgid: catgid,
    title: title,
    type: type,
    flag: flag,
    gender: gender,
    decr: decr,
    offer: offerlist,
    pricedetail: pricedetaillist,
    imgdata: imgupload,
    isactive: isactive,
  };
  const navigate = useNavigate();
  const styles = (theme) => ({
    multilineColor: {
      color: "red",
    },
  });
  const handleDeleteImg = (id) => {
    // alert("");
    // let data = imgdata.filter((element) => element.id !== id);
    // alert(offer);

    setImgupload_dispatch({
      type:"deleteimg",
      id:id
    })
  };
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
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
        <Grid container spacing={0} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={12}>
            {/* <h1
              className="dash-title"
              style={{ paddingBottom: "10px", color: "lightblue" }}
            >
              Product
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
            <h2>PRODUCT</h2>
          </Grid>

          <Grid item md={12} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="Title"
              fullWidth
              value={title}
              size="small"
              style={{ width: "100%" }}
              onChange={async (e) => {
                let retdt = await alphanumeric(e);
                setTitle(retdt);
              }}
            />
          </Grid>

          <Grid item md={3} xs={8} sm={6}>
            <CategorySuggest
              setCatgId={setCatgId}
              category={category}
              setCategory={setCategory}
            />
          </Grid>

          <Grid item md={3} xs={8} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              value={type}
              onChange={(e, newvalue) => {
                setType(newvalue.label);
              }}
              fullWidth
              options={Type}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
          </Grid>

          <Grid item md={3} xs={8} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              value={flag}
              onChange={(e, newvalue) => {
                setFlag(newvalue.label);
              }}
              fullWidth
              options={Flag}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Flag" />}
            />
          </Grid>

          <Grid item md={3} xs={8} sm={6}>
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

          <Grid item md={12} xs={8} sm={6}>
            <TextareaAutosize
              value={decr}
              onChange={async (e) => {
                let retdt = await alphanumeric(e);
                setDescription(retdt);
              }}
              aria-label="minimum height"
              minRows={3}
              fullWidth
              placeholder="Description"
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item md={11} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="Notes/offers"
              fullWidth
              value={offer}
              size="small"
              style={{ width: "100%" }}
              inputRef={offerinput}
              onChange={async (e) => {
                let retdt = e.target.value;
                setOffer(retdt);
              }}
            />
          </Grid>

          <Grid item md={1} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    // alert("");
                    addOffer();
                  } catch (e) {}
                })();
              }}
            >
              +
            </Button>
          </Grid>

          <Grid item md={12} xs={8} sm={6}>
            <OfferTable offerlist={offerlist} DelOffer={DelOffer} />
          </Grid>

          <Grid item md={1.8} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="From"
              fullWidth
              value={fromwt}
              size="small"
              style={{ width: "100%" }}
              inputRef={frominput}
              onChange={async (e) => {
                let retdt = await onlydecimal(e);
                setFromwt(retdt);
              }}
            />
          </Grid>

          <Grid item md={1.8} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="To"
              fullWidth
              value={towt}
              size="small"
              style={{ width: "100%" }}
              onChange={async (e) => {
                let retdt = await onlydecimal(e);
                setTowt(retdt);
              }}
            />
          </Grid>

          <Grid item md={1.8} xs={8} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              onChange={(e, newvalue) => {
                setFromunit(newvalue.label);
              }}
              fullWidth
              options={Units}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Unit" />}
            />
          </Grid>

          <Grid item md={1.8} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="From price"
              fullWidth
              value={fromprice}
              size="small"
              style={{ width: "100%" }}
              onChange={async (e) => {
                let retdt = await onlydecimal(e);
                setFromPrice(retdt);
              }}
            />
          </Grid>

          <Grid item md={1.8} xs={8} sm={6}>
            <TextField
              id="outlined-basic"
              label="To price"
              fullWidth
              value={toprice}
              size="small"
              style={{ width: "100%" }}
              onChange={async (e) => {
                let retdt = await onlydecimal(e);
                setToPrice(retdt);
              }}
            />
          </Grid>

          <Grid item md={1} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    addpricedetails();
                  } catch (e) {}
                })();
              }}
            >
              +
            </Button>
          </Grid>

          <Grid item md={12} xs={8} sm={6}>
            <PriceTable
              pricedetaillist={pricedetaillist}
              DelPricedetail={DelPricedetail}
            />
          </Grid>

          {/* <Grid item md={12} xs={8} sm={6} >
          <ImageUpload 
           setImgdata={setImgdata}
          imgdata={imgdata}
          imgcount={4}
          />
           </Grid>
           */}
        
          {imgupload?.map((element) => {
            return (
              <Grid
                item
                md={4}
                xs={12}
                className="container"
                onClick={() => {
                  {

                  }
                }}
              >

                <img src={element.imgpath} className="image" />
                <div class="middle">
                  <div
                    class="label"
                    style={{ backgroundColor: "#f70d1a" }}
                    onClick={() => {
                      handleDeleteImg(element.imgid);
                      
                    }}
                  >
                    Delete Image
                  </div>
                </div>
              </Grid>
            );
          })}
          <Grid
            item
            md={4}
            xs={12}
            className="container"
            onClick={() => {
              {
                handleOpen();
              }
            }}
          >

            <img
              src={defualtimg}
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
          </Grid>

          <Grid item md={12} xs={6} sm={6}>
            <Button
              variant="contained"
              type="button"
              style={{ float: "right" }}
              onClick={() => {
                (async () => {
                  try {
                    file.forEach(element => {
                      // let img= Saveproductimg(element);
                    });
                   
                    // return;
                    // alert(JSON.stringify(data));
                    const profile = await Saveproduct(data);
                    let rettostmsg = tostmsg(profile);
                    setAlertdata(rettostmsg);
                    setAlertopen(rettostmsg.open);
                    if (profile.code == 100) {
                    }
                    if (profile.code == 200) {
                      setTimeout(() => {
                        setImgupload_dispatch({
                          type:"add",
                          data:[]
                        })
                        navigate("/productlist", { replace: false });
                      }, 500);
                    }

                    // alert(JSON.stringify(emp));
                    // handleSave(profile);
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
      <Modal
        open={modelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
  >
     <Grid container md={8} xs={12} sx={style}>
         <Grid item md={12} xs={12}>
         {/* {imgupload?.map((element) => {
            return (
              <Grid
                item
                md={4}
                xs={12}
                className="container"
                onClick={() => {
                  {
                  }
                }}
                
              >

                <img src={element.imgpath} className="image"  />
                <div class="middle">
                  <div
                    class="label"
                    style={{ backgroundColor: "#f70d1a" }}
                    onClick={() => {
                      handleDeleteImg(element.id);
                    }}
                  >
                    Delete Image
                  </div>
                </div>
              </Grid>
            );
          })} */}
        <ImgUploadComp handleClose={handleClose}/>
         </Grid>       
        </Grid>
  </Modal>
    </div>
  );
}

export default ProductComp;
