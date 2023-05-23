import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Checkbox, TextField } from "@mui/material";
import "../Table/Table.css"
import {  Getcompanymasterdata } from "../API/companymaster";

const columns = [
  { label: "Offers", minWidth: "100%" },
  { label: "Action", minWidth: "100%" },
];

function createData(id,offer) {
  return {
    id,
    offer 
  };
}

export default function OfferTable(props) {
  const [rows, setRows] = useState([]);
  const [srows, setSrows] = useState([]);
  const [searched, setSearched] = useState("");
  let tabledata = {};

  const requestSearch = (searchedVal, srows) => {
    const filteredRows = srows.filter((row) => {
      return row.search.toLowerCase().includes(searchedVal.toLowerCase());
    });
    return filteredRows;
  };

  const getData = async () => {
    
    setRows([]);
    setSrows([]);
    // let data = { fdate: monday, tdate: saturday };
    tabledata = await Getcompanymasterdata();

    const arr = [];
    // alert(JSON.stringify(tabledata.data[0].cmplogo))
    props.offerlist.forEach((element) => {
      let search = `${element.offer}`;
      arr.push(createData(element.id, element.offer));
      setRows([...arr]);
      setSrows([...arr]);
    });
  };

  useEffect(() => {
    getData();
  }, [props.offerlist]);

  const search = (searchedVal) => {
    let filteredRows = requestSearch(searchedVal, srows);
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let data = [{ id: "1", name: "abc" }];
  return (
    <div className="">
      <Paper sx={{ width: "100%" }}>
          <TextField
            placeholder="search"
            fullWidth
            className="searchbar"
            onChange={(searchVal) => search(searchVal.target.value)}
          />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ fontSize: "100pt!important" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, width: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  let bal = false;
                  if (row.isstatus == "COMPLETE") {
                    bal = true;
                  }

                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      
                    >
                     <TableCell>{row.offer}</TableCell>
                      <TableCell>
                      <Button
                          onClick={() => {
                            (async () => {
                              try {
                                props.DelOffer(row.id);
                               
                              } catch (e) {}
                            })();
                          }}
                        >
                          <DeleteIcon sx={{ color: "black" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 250, 500, 1000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
