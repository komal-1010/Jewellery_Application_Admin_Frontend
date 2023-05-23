import { BASE_URL } from "../MIS/Global";
import axios from "axios";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Loader from "../Componants/Loader/Loader";


export const loginsave = async (data) => {
  
    // alert(JSON.stringify(data));
    if (data.mob <= 0) {
        return { msg: "Enter mobile number", code: 100 };
      }
      if (data.passwd.length <= 0) {
        return { msg: "Enter password", code: 100 };
      }
let ret = {};
ReactDOM.render(<Loader></Loader>, document.getElementById("root1"));
var config = {
method: "post",
url: BASE_URL + "singin",
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
} else if(ret.code == 300){
  ret = { msg: ret.msg, code: 100 };

}
else {
  // alert(JSON.stringify(ret))
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


export const Getloginsavedata = async (data) => {
let ret = {};
var config = {
method: "post",
url: BASE_URL + "getlogindata",
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


export const Deleteloginsave = async (data) => {
let ret = {};
var config = {
method: "post",
url: BASE_URL + "deleteLogindata",
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


