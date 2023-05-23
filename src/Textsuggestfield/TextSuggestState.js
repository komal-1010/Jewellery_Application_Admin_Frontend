import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function TextSuggestState({ setState, state }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      size="small"
      value={state}
      options={State}
      onChange={(e, newValue) => setState(newValue.label)}
      renderInput={(params) => <TextField {...params} label="State" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const State = [
  { label: "Jammu and Kashmir", id: "Jammu and Kashmir" },
  { label: "Jharkhand", id: "Jharkhand" },
  { label: "Karnataka", id: "Karnataka" },
  { label: "Kerala", id: "Kerala" },
  { label: "Ladakh", id: "Ladakh" },
  { label: "Lakshadweep (UT)", id: "Lakshadweep (UT)" },
  { label: "Madhya Pradesh", id: "Madhya Pradesh" },
  { label: "Maharashtra", id: "Maharashtra" },
  { label: "Manipur", id: "Manipur" },
  { label: "Meghalaya", id: "Meghalaya" },
  { label: "Mizoram", id: "Mizoram" },
  { label: "Nagaland", id: "Nagaland" },
  { label: "Orissa", id: "Orissa" },
  { label: "Puducherry (UT)", id: "Puducherry (UT)" },
  { label: "Punjab", id: "Punjab" },
  { label: "Rajasthan", id: "Rajasthan" },
  { label: "Sikkim", id: "Sikkim" },
  { label: "Tamil Nadu", id: "Tamil Nadu" },
  { label: "Telangana", id: "Telangana" },
  { label: "Tripura", id: "Tripura" },
  { label: "Uttar Pradesh", id: "Uttar Pradesh" },
  { label: "Uttarakhand", id: "Uttarakhand" },
  { label: "West Bengal", id: "West Bengal" },
];
