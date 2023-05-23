import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GetProfile } from "../API/ProfileModel";
import { GetWorkdone } from "../API/WorkdoneModel";

export default function TextSuggestWorkdone({
  setWrkid,
  workdone,
  setWorkdone,
}) {
  const [rows, setRows] = useState([]);
  let tabledata = {};

  const getData = async () => {
    tabledata = await GetWorkdone();
    // alert(JSON.stringify(tabledata.data[0].wrkid));
    const arr = [];

    // if (tabledata.length > 0)
    tabledata.data.forEach((element) => {
      // alert(element.workdone)
      arr.push({
        label:element.workdone ,
        id: element.wrkid,
      });
      setRows([...arr]);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (<>
    <Autocomplete
        multiple
        id="tags-outlined"
        options={rows}
        // getOptionLabel={(option) => option.title}
        // defaultValue={workdone}
        filterSelectedOptions
        onChange={(event, newValue) => {
          setWrkid(newValue.id);
          setWorkdone(newValue.label);
          
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Work Done"
      
            placeholder="Work Done"
          />
        )}
      />

    
    </>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
