export const BASE_URL = "http://localhost:4000/api/";
export const IMG_URL = "http://localhost:4000/";
export const PRO_URL="http://localhost:3001";
// export const BASE_URL = "http://demo.statuslly.com/api/";
// export const IMG_URL = "http://demo.statuslly.com/";
export const alphanumeric = async (e) => { 
  return new Promise((resolve, reject) => {
    let re = /^[a-zA-Z0-9\b\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      resolve(e.target.value);
      //setName(e.target.value);
    }
    // resolve(""); 
  });
};

export const onlynumeric = async (e) => {
  return new Promise((resolve, reject) => {
    let re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      resolve(e.target.value);
      //setName(e.target.value);
    }
  });
};
export const onlydecimal = async (e) => {
  return new Promise((resolve, reject) => {
    let re = /^[0-9-.\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      resolve(e.target.value);
      //setName(e.target.value);
    }
  });
};

export const INITIAL_STATE = {
  seqdata_reducer: [],
};

export const postReducer = (state, action) => {
  alert(JSON.stringify(action.data))
  if (action.type === "1") {
    
      return {
        seqdata_reducer: action.data,
      };
    
  } else if (action.type === "2") {
    return {
      seqdata_reducer: "welcome2",
    };
  }
};


export const tostmsg = (data) => {
  if (data.code == 100) {
    return {
      type: "error",
      msg: data.msg,
      vertical: "top",
      horizontal: "center",
      open: true,
    };
  } else if (data.code == 200) {
    return {
      type: "success",
      msg: data.msg,
      vertical: "top",
      horizontal: "center",
      open: true,
    };
  } else if (data.code == 400) {
    return {
      type: "warning",
      msg: data.msg,
      vertical: "top",
      horizontal: "center",
      open: true,
    };
  } else if (data.code == 300) {
    return {
      type: "error",
      msg: data.msg,
      vertical: "top",
      horizontal: "center",
      open: true,
    };
  } else if (data.code == 500) {
    return {
      type: "error",
      msg: data.msg,
      vertical: "top",
      horizontal: "center",
      open: true,
    };
  }
};