import { BASE_URL } from "../MIS/Global";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import Loader from "../Componants/Loader/Loader";

export const Saveproduct = async (data) => {
  // alert(JSON.stringify(data));
  if (data.title.length <= 0) {
    return { msg: "Enter Title", code: 100 };
  }
  if (data.catgid <= 0) {
    return { msg: "Enter Category", code: 100 };
  }
  if (data.type.length <= 0) {
    return { msg: "Enter Type", code: 100 };
  }
  if (data.gender.length <= 0) {
    return { msg: "Enter Gender", code: 100 };
  }
  if (data.flag.length <= 0) {
    return { msg: "Enter Flag", code: 100 };
  }
  if (data.imgdata <= 0) {
    return { msg: "Select at least one image", code: 100 };
  }
  let ret = {};
  ReactDOM.render(<Loader></Loader>, document.getElementById("root1"));
  let url = "insertproduct";
  if (data.prodid > 0) url = "updateproduct";
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
      ReactDOM.render(
        <Loader bal={false}></Loader>,
        document.getElementById("root1")
      );
      ret = { msg: "something went wrong! please try again ", code: 500 };
      return ret;
    });
  return ret;
};

export const Getproductdata = async (data) => {
  let ret = {};
  var config = {
    method: "post",
    url: BASE_URL + "getproductdata",
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

export const Deleteproduct = async (data) => {
  let ret = {};
  var config = {
    method: "post",
    url: BASE_URL + "deleteproduct",
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

export const Deleteproductimg = async (data) => {
  let ret = {};
  var config = {
    method: "post",
    url: BASE_URL + "Deleteproductimg",
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

export const DeleteProductimg = async (data) => {
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

export const Saveproductimg = async (data) => {
  //  alert(JSON.stringify(data));
  let ret = {};
  ReactDOM.render(<Loader></Loader>, document.getElementById("root1"));
  let url = "productimgupload";
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