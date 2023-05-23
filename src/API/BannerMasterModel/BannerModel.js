import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../../MIS/Global";
import Loader from "../../Componants/Loader/Loader";

export const Bannersave = async (data) => {
  let ret = {};
  ReactDOM.render(<Loader></Loader>, document.getElementById("root1"));
  let url = "insertbannerdata";
  if (data.bid > 0) {
    url = "updatebannerdata";
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
    .then(function (response) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
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
    .catch(function (error) {
      alert(JSON.stringify(error));
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
      ret = { msg: "something went wrong! please try again ", code: 500 };
      return ret;
    });
  return ret;
};
export const Savebannerimg = async (data) => {
  //  alert(JSON.stringify(data));
  let ret = {};
  ReactDOM.render(<Loader></Loader>, document.getElementById("root1"));
  let url = "bannerimgupload";
  var config = {
    method: "post",
    url: BASE_URL + url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );

      ret = response.data;
      if (ret.code == 200) {
        ret = { msg: ret.msg, code: 200, data: ret.data };
        return ret;
      } else if (ret.code == 400) {
        ret = { msg: ret.msg, code: 400 };
        return ret;
      } else {
        alert(JSON.stringify(ret));
        ret = { msg: "something went wrong! please try again ", code: 500 };
        return ret;
      }
    })
    .catch(function (error) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
      alert(error);
      ret = { msg: "something went wrong! please try again ", code: 500 };
      return ret;
    });
  return ret;
};

export const Getbannersavedata = async (data) => {
  let ret = {};
  var config = {
    method: "post",
    url: BASE_URL + "getbannermasterdata",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
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
    .catch(function (error) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
      ret = { msg: "something went wrong! please try again ", code: 500 };
      return ret;
    });
  return ret;
};

export const Deletebannersave = async (data) => {
  let ret = {};
  var config = {
    method: "post",
    url: BASE_URL + "deletebannerdata",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
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
    .catch(function (error) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
      ret = { msg: "something went wrong! please try again ", code: 500 };
      return ret;
    });
  return ret;
};

export const DeleteBannerimg = async (data) => {
  let ret = {};
  var config = {
    method: "post",
    url: BASE_URL + "bannerimgdelete",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
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
    .catch(function (error) {
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
      ret = { msg: "something went wrong! please try again ", code: 500 };
      return ret;
    });
  return ret;
};
