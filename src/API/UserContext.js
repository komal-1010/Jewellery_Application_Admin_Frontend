import React, { createContext, useEffect, useState } from "react";
import { useReducer } from "react";
import { ImageUpdateReducer } from "../Componants/Reducer/ImageUploadReducer";
import { Getbaseurl } from "./CustomModel";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  let tabledata=[];
    const [logindata, setLogindata] = useState([]);  
    const [redirect, setRedirect] = useState(""); 
    const [baseurl, setBaseurl] = useState();
    const [imgurl, setImgurl] = useState();
    const [enquiryprodurl, setEnquiryprodurl] = useState(); 
    const [imgupload, setImgupload_dispatch] = useReducer(ImageUpdateReducer);

    const updatelogindata= async (data) => {
      // alert(JSON.stringify(data))
      return new Promise((resolve, reject) => {
          resolve(setLogindata(data))  
      })
      
    } 
    const Getcustombaseurl= async (data) => {
      // alert(JSON.stringify(data))
      // return new Promise((resolve, reject) => {
        // let customwhr = {customwhr:" and sname='base_url' or sname='img_url' or sname='enquiry_prod_url"}
        //   let data = await Getbaseurl(customwhr)
          // resolve(setBaseurl(data))  
          // alert(JSON.stringify(data.data));
          
      // })
      let customwhr = {customwhr:" and sname='base_url' or sname='img_url' or sname='enquiry_prod_url'"}
      let data1 = await Getbaseurl(customwhr)
                // alert(JSON.stringify(data1.data[0].sname));
setBaseurl(data1.data[0].sname);
setImgurl(data1.data[1].sname);
setEnquiryprodurl(data1.data[2].sname);
    } 
    useEffect(() => {
      Getcustombaseurl();
      });
    
    const value={
        logindata,setLogindata,
        updatelogindata,redirect, setRedirect,imgupload,setImgupload_dispatch
    }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContextProvider;

