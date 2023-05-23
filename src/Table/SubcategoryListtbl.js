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
import EditIcon from "@mui/icons-material/Edit";
import { Button, Checkbox, TextField } from "@mui/material";
import "../Table/Table.css"
import { Link } from "react-router-dom";
import { IMG_URL } from "../MIS/Global";
import { DeleteSubcategory, GetSubcategorydata } from "../API/SubcategoryModel";

const columns = [
  {label:"Category Id",minWidth:"10%"},
  { label: "Subcategory Name", minWidth: "10%" },
  { label: "", minWidth: "10%" },
  { label: "Action", minWidth: "25%" },
];

function createData(subcatgid, catgid,subcatgname,imgdata,search) {
  return {
    subcatgid,
    catgid,
   subcatgname,
    imgdata,
    search
  };
}

export default function SubcategoryListtbl(props) {
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
    tabledata = await GetSubcategorydata();

    const arr = [];
    // alert(JSON.stringify(tabledata.data))
    tabledata.data.forEach((element) => {
      let search = `${element.subcatgname}`;
      arr.push(createData(element.subcatgid,element.catgid, element.subcatgname, element.imgdata, search));
      setRows([...arr]);
      setSrows([...arr]);
    });
  };

  useEffect(() => {
    getData();
  }, [props.searchdata]);

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
        <TableContainer sx={{ maxHeight: 440 }}>
          <TextField
            placeholder="search"
            fullWidth
            className="searchbar"
            onChange={(searchVal) => search(searchVal.target.value)}
          />
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
                .map((row) => {
                  let bal = false;
                  if (row.isstatus == "COMPLETE") {
                    bal = true;
                  }
                  let img = JSON.parse(row.imgdata);
                   
                  let imglink = "";
                  if(img.length>0){
                     imglink = IMG_URL + img[0].imglink;
                    }
                  
                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={async (e) => {
                        props.setUpdData(row);
                      }}
                    >
                      <TableCell>{row.subcatgid}</TableCell>
                      <TableCell>{row.subcatgname}</TableCell>
                     
                      <TableCell>
                        <img height="100" width="100" src={imglink}></img>
                      </TableCell>
                      <TableCell>
                        <Link
                          to="/subcategory"
                          state={{
                            from:row
                          }}
                        >
                          <EditIcon sx={{ color: "black" }} />
                        </Link>
                        <Button
                          onClick={() => {
                            (async () => {
                              try {
                                const branddelete = await DeleteSubcategory({
                                  subcatgid: row.subcatgid,
                                });
                                if (branddelete.code == 200) {
                                  alert(branddelete.msg);
                                  window.location.reload();
                                } else {
                                  alert(branddelete.msg);
                                }
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
