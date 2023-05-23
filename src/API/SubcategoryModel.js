import { BASE_URL } from "../MIS/Global";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import Loader from "../Componants/Loader/Loader";



export const SaveSubcategory = async (data) => {
    if (data.subcatgname.length <= 0) {
        return { msg: "Enter Subcategory Name", code: 100 };
      }
      if(data.catgid.length<=0)
      {
        return{msg:"Enter Category Id ",code:100};
      }
      if (data.imgdata.length <= 0) {
        return { msg: "Select Image", code: 100 };
      }
let ret = {};
ReactDOM.render(<Loader></Loader>, document.getElementById("root1"));
let url="insertsubcategorydata";
if(data.subcatgid>0){
    url="updatesubcategorydata";
}
var config = {
method: "post",
url: BASE_URL + url,
headers: {
"Content-Type": "application/json",
},
data: data,
};
await axios(config)
.then(function(response) {
ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
ret = response.data;
if (ret.code == 200) {
ret = { msg: ret.msg, code: 200, data: ret.data };
return ret;
} else if (ret.code == 400) {
ret = { msg: ret.msg, code: 400 };
return ret;
} else {
ret = { msg: "something went wrong! please try again ", code: 500 };
return ret;
}
})
.catch(function(error) {
ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
ret = { msg: "something went wrong! please try again ", code: 500 };
return ret;
});
return ret;
};


export const GetSubcategorydata = async (data) => {
let ret = {};
var config = {
method: "post",
url: BASE_URL + "getsubcategorymasterdata",
headers: {
"Content-Type": "application/json",
},
data: data,
};
await axios(config)
.then(function(response) {
ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
ret = response.data;
if (ret.code == 200) {
ret = { msg: ret.msg, code: 200, data: ret.data };
return ret;
} else if (ret.code == 400) {
ret = { msg: ret.msg, code: 400 };
return ret;
} else {
ret = { msg: "something went wrong! please try again ", code: 500 };
return ret;
}
})
.catch(function(error) {
ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
ret = { msg: "something went wrong! please try again ", code: 500 };
return ret;
});
return ret;
};


export const DeleteSubcategory = async (data) => {
let ret = {};
var config = {
method: "post",
url: BASE_URL + "deletesubcategorydata",
headers: {
"Content-Type": "application/json",
},
data: data,
};
await axios(config)
.then(function(response) {
ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
ret = response.data;
if (ret.code == 200) {
ret = { msg: ret.msg, code: 200, data: ret.data };
return ret;
} else if (ret.code == 400) {
ret = { msg: ret.msg, code: 400 };
return ret;
} else {
ret = { msg: "something went wrong! please try again ", code: 500 };
return ret;
}
})
.catch(function(error) {
ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
ret = { msg: "something went wrong! please try again ", code: 500 };
return ret;
});
return ret;
};


export const Deletesubcategoryimg = async (data) => {
    
  let ret = {};
  var config = {
  method: "post",
  url: BASE_URL + "subcategorydeleteimg",
  headers: {
  "Content-Type": "application/json",
  },
  data: data,
  };
  await axios(config)
  .then(function(response) {
  ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
  ret = response.data;
  if (ret.code == 200) {
  ret = { msg: ret.msg, code: 200, data: ret.data };
  return ret;
  } else if (ret.code == 400) {
  ret = { msg: ret.msg, code: 400 };
  return ret;
  } else {
  ret = { msg: "something went wrong! please try again ", code: 500 };
  return ret;
  }
  })
  .catch(function(error) {
  ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
  ret = { msg: "something went wrong! please try again ", code: 500 };
  return ret;
  });
  return ret;
  };

