import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Getcategorydata } from "../API/CategoryModel";

function CategorySuggest({ setCatgId, category, setCategory }) {
  const [rows, setRows] = useState([]);
  let tabledata = {};

  const getData = async () => {
     
    tabledata = await Getcategorydata();
    // alert(JSON.stringify(tabledata.data));
    const arr = [];
    // if (tabledata.length > 0)
    tabledata.data.forEach((element) => {
      arr.push({
        label: element.catgname,
        id: element.catgid,
      });
      setRows([...arr]);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      fullWidth
      size="small"
      value={category}
      options={rows}
      onChange={(event, newValue) => {
        setCatgId(newValue.id);
        setCategory(newValue.label);
      }}
      //   onChange={(e, newValue) => setProfilevehical(newValue.label)}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}

export default CategorySuggest;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
