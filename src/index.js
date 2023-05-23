import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import ProfileScreen from "./Screen/BannerScreen/BannerScreen";
import ProfileTblScreen from "./Screen/BannerScreen/ProfileTblScreen";
// import ExecutionProcessScreen from "./Screen/ExecutionScreen/ExecutionProcessScreen";
import BannerScreen from "./Screen/BannerScreen/BannerScreen";
import SubcatrgoryScreen from "./Screen/SubcategoryScreen/SubcategoryScreen";
import CategoryScreen from "./Screen/CategoryScreen/CategoryScreen";

import BannerListScreen from "./Screen/BannerScreen/BannerListScreen";
import CategoryListScreen from "./Screen/CategoryScreen/CategoryListScreen";
import SubcategoryListScreen from "./Screen/SubcategoryScreen/SubcategoryListScreen";
import SmsTblScreen from "./Screen/SMSScreen/SmsTblScreen";
import SmsScreen from "./Screen/SMSScreen/SmsScreen";
import CustomerTblScreen from "./Screen/CustomerScreen/CustomerTblScreen";
import CustomerScreen from "./Screen/CustomerScreen/CustomerScreen";
import ProductScreen from "./Screen/ProductScreen/ProductScreen";
import ProductTblScreen from "./Screen/ProductScreen/ProductTblScreen";
import EnquiryScreen from "./Screen/EnquiryScreen/EnquiryScreen";
import CompanymasterScreen from "./Screen/Companymasterscreen/CompanymastersScreen";
import CompanymasterListScreen from "./Screen/Companymasterscreen/CompanymasterListScreen";
import UserContextProvider from "./API/UserContext";




const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
       <UserContextProvider>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/banner" element={< BannerScreen />} />
      <Route path="/profiletbl" element={<ProfileTblScreen />} />
      <Route path="/subcategory" element={<SubcatrgoryScreen />} />
      <Route path="/category" element={<CategoryScreen/>}/>
      <Route path="/bannerlist" element={<BannerListScreen />}/>
      <Route path="/categorylist" element={<CategoryListScreen/>}/>
      <Route path="/subcategorylist" element={<SubcategoryListScreen/>}/>
    
      <Route path="/companymaster" element={<CompanymasterScreen />} />
      <Route path="/companymastertbl" element={<CompanymasterListScreen />} />
      <Route path="/product" element={<ProductScreen/>}/>
      <Route path="/enquiry" element={<EnquiryScreen/>}/>
      <Route path="/productlist" element={<ProductTblScreen/>}/>
      <Route path="/customermaster"element={<CustomerScreen/>}/>
      <Route path="/customertbl" element={<CustomerTblScreen/>} />
      <Route path="/sms" element={<SmsScreen/>}/>
      <Route path="/smslist" element={<SmsTblScreen/>}/>
      
    </Routes>
    </UserContextProvider>
  </BrowserRouter>,
  rootElement
);
