import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Table/Table.css"
import { Button, Checkbox, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Deletecustomermaster, Getcustomerdata } from "../API/CustomerModel";
import AlertMessageComp from "../Componants/AlertMessageCom/AlertMessageComp";
import { tostmsg } from "../MIS/Global";

const columns = [
  { label: "Customer Name", minWidth: "14%" },
  { label: "Mobile Number", minWidth: "14%" },
  { label: "Whatsapp Number", minWidth: "14%" },
  { label: "Gender", minWidth: "14%" },
  { label: "Date of Birth", minWidth: "14%" },
  { label: "Address", minWidth: "14%" },
];
function createData(custid,custname, mob, wmob, gender, dob, address,search) {
  return {
    custid,
    custname, mob, wmob, gender, dob, address,
    search
  };
}

export default function CustomerTbl(props) {
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
    tabledata = await Getcustomerdata();

  const arr = [];
    // alert(JSON.stringify(tabledata.data))
      tabledata.data.forEach((element) => {
      let search = `${element.CustomerName}`;
      arr.push(createData(element.custid, element.custname, element.mob, element.wmob, element.gender, element.dob, element.address,search));
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
  const [alertdata, setAlertdata] = React.useState({});
  const [alertopen, setAlertopen] = React.useState(false)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
   return (
    <div className="">
       <AlertMessageComp
        type={alertdata.type}
        msg={alertdata.msg}
        vertical={alertdata.vertical}
        horizontal={alertdata.horizontal}
        setOpen={setAlertopen}
        open={alertopen}
      />
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
                 
                  let dob=new Date(row.dob);
                  dob=dob.getDate()+"/"+(dob.getMonth()+1)+"/"+dob.getFullYear();
                  return (
                  
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                     >
                      <TableCell>{row.custname}</TableCell>
                      <TableCell>{row.mob}</TableCell>
                      <TableCell>{row.wmob}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{dob}</TableCell>
                      <TableCell>{row.address}</TableCell>

                      <TableCell>
                        <Link
                          to="/customermaster"
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
                                if(window.confirm("Are you sure you want to delete?"))
                                {
                                // let x=imglink.slice(imglink.lastIndexOf('/') + 1);
                                // let delImg=DeleteCategoryimg({imglink:x});
                                const branddelete = await Deletecustomermaster({
                                  custid: row.custid,
                                });
                                let rettostmsg = tostmsg(branddelete);
                                setAlertdata(rettostmsg);
                                setAlertopen(rettostmsg.open);
                                if (branddelete.code == 200) {
                                  // alert(branddelete.msg);
                                  window.location.reload();
                                } else {
                                  // alert(branddelete.msg);
                                }
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
