import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GetBaydata } from "../API/BayModel";

export default function BaynameSuggest({ setBayid, bayname, setBayname }) {
  const [rows, setRows] = useState([]);
  let tabledata = {};

  const getData = async () => {
    tabledata = await GetBaydata();
    // alert(JSON.stringify(tabledata.data[0].clientname));
    const arr = [];

    // if (tabledata.length > 0)
    tabledata.data.forEach((element) => {
      arr.push({
        label: element.bayname,
        id: element.bayid,
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
      value={bayname}
      options={rows}
      onChange={(event, newValue) => {
        setBayid(newValue.id);
        setBayname(newValue.label);
      }}
      //   onChange={(e, newValue) => setProfilevehical(newValue.label)}
      renderInput={(params) => <TextField {...params} label="Bay Name" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
