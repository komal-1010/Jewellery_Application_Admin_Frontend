import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GetProfile } from "../API/ProfileModel";

export default function ProfileVehicalSuggest({
  setPid,
  profilevehical,
  newprofilevehical,
  setProfilevehical,
}) {
  const [rows, setRows] = useState([]);
  let tabledata = {};

  const getData = async () => {
    tabledata = await GetProfile();
    // alert(JSON.stringify(tabledata.data[0].clientname));
    const arr = [];

    // if (tabledata.length > 0)
    tabledata.data.forEach((element) => {
      arr.push({
        label: `${element.clientname}-${element.mob}`,
        id: element.pid,
      });
      setRows([...arr]);
    });
  };
  useEffect(() => {
    getData();
  }, [newprofilevehical]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      fullWidth
      size="small"
      value={profilevehical}
      options={rows}
      onChange={(event, newValue) => {
        setPid(newValue.id);
        setProfilevehical(newValue.label);
      }}
      //   onChange={(e, newValue) => setProfilevehical(newValue.label)}
      renderInput={(params) => (
        <TextField {...params} label="Profile Vehical" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
