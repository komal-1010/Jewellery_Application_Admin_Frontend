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
import "../Table/Table.css"
import { Link } from "react-router-dom";
import { Deletecompanymaster, Getcompanymasterdata } from "../API/companymaster";
import { IMG_URL } from "../MIS/Global";

const columns = [
  { label: "company Name", minWidth: "10%" },
  { label: "Owner Name", minWidth: "10%" },
  { label: "company address", minWidth: "10%" },
  { label: "Mobile Number", minWidth: "10%" },
  { label: "Whatsapp Number", minWidth: "10%" },
  { label: "Weblink", minWidth: "10%" },
  { label: "Company email", minWidth: "10%" },
  { label: "Office Number", minWidth: "10%" },
  { label: "Devoheading", minWidth: "10%" },
  { label: "Company logo", minWidth: "10%" },
  { label: "", minWidth: "10%" },
  { label: "Action", minWidth: "25%" },
];

function createData(cmpid, cmpname,oname, cmpaddress, mob, wmob, weblink, cemail, officeno, devoheding, cmplogo, search) {
  return {
    cmpid, cmpname,oname, cmpaddress, mob, wmob, weblink, cemail, officeno, devoheding, cmplogo,
    search,
  };
}

export default function CompanymasterListtbl(props) {
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
    tabledata.data.forEach((element) => {
      let search = `${element.CompanyName}`;
      arr.push(createData(element.cmpid, element.cmpname, element.ownername, element.cmpaddress, element.mob, element.wmob, element.weblink, element.cemail,element.officeno, element.devoheding, element.cmplogo, search));
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
                .map((row) => {
                  let bal = false;
                  if (row.isstatus == "COMPLETE") {
                    bal = true;
                  }
// alert(row.cmplogo);
                   let img = JSON.parse(row.cmplogo);
                   
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
                      <TableCell>{row.cmpname}</TableCell>
                      <TableCell>{row.oname}</TableCell>
                      <TableCell>{row.cmpaddress}</TableCell>
                      <TableCell>{row.mob}</TableCell>
                      <TableCell>{row.wmob}</TableCell>
                      <TableCell>{row.weblink}</TableCell>
                      <TableCell>{row.cemail}</TableCell>
                      <TableCell>{row.officeno}</TableCell>
                      <TableCell>{row.devoheding}</TableCell>
                    
                      <TableCell>
                        <img height="100" width="100" src={imglink}></img>
                      </TableCell>
                      <TableCell>
                        <Link
                          to="/companymaster"
                          state={{
                            from: row
                          }}
                        >
                          <EditIcon sx={{ color: "black" }} />
                        </Link>
                        <Button
                          onClick={() => {
                            (async () => {
                              try {
                                if(window.confirm("Are you sure you want to delete?")){
                                const branddelete = await Deletecompanymaster({
                                  cmpid: row.cmpid,
                                });
                                if (branddelete.code == 200) {
                                  alert(branddelete.msg);
                                  window.location.reload();
                                } else {
                                  alert(branddelete.msg);
                                }}
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
