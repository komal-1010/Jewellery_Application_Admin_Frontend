import { BASE_URL } from "../MIS/Global";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import Loader from "../Componants/Loader/Loader";



export const smsmastersave = async (data) => {
  // alert(JSON.stringify(data));
let ret = {};
ReactDOM.render(<Loader></Loader>, document.getElementById("root1"));
let url="insertsmsmasterdata";
// if(data.smsid>0)
//   url="updatesmsmasterdata"
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

export const Getsmsmasterdata = async (data) => {
let ret = {};
var config = {
method: "post",
url: BASE_URL + "getsmsmasterdata",
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


export const Deletesmsmaster = async (data) => {
let ret = {};
var config = {
method: "post",
url: BASE_URL + "deletesmsmasterdata",
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

// export const Deletecompanyimg = async (data) => {
    
//   let ret = {};
//   var config = {
//   method: "post",
//   url: BASE_URL + "deletecompanyimage",
//   headers: {
//   "Content-Type": "application/json",
//   },
//   data: data,
//   };
//   await axios(config)
//   .then(function(response) {
//   ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
//   ret = response.data;
//   if (ret.code == 200) {
//   ret = { msg: ret.msg, code: 200, data: ret.data };
//   return ret;
//   } else if (ret.code == 400) {
//   ret = { msg: ret.msg, code: 400 };
//   return ret;
//   } else {
//   ret = { msg: "something went wrong! please try again ", code: 500 };
//   return ret;
//   }
//   })
//   .catch(function(error) {
//   ReactDOM.render(<Loader bal={false}></Loader>, document.getElementById("root1"));
//   ret = { msg: "something went wrong! please try again ", code: 500 };
//   return ret;
//   });
//   return ret;
//   };

