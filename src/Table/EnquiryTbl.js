import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Checkbox, Modal, TextField } from "@mui/material";
import "../Table/Table.css";
import Male from "../Uploads/user-icon.png";
import Female from "../Uploads/woman-avatar.png";
import { Getenquirydata } from "../API/EnquiryModel";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { PRO_URL } from "../MIS/Global";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
 };
const columns = [
  { label: "Date", minWidth: "10%" },
  { label: "Customer Details", minWidth: "10%" },
  { label: "Enquiry Text", minWidth: "10%" },
  { label: "Product Details", minWidth: "10%" },
];

function createData(
  enqid,
  logid,
  edate,
  pdetail,
  descr,
  mob,
  uname,
  gender,
  search
) {
  return {
    enqid,
    logid,
    edate,
    pdetail,
    descr,
    mob,
    uname,
    gender,
    search,
  };
}

export default function EnquiryTbl(props) {
  const [rows, setRows] = useState([]);
  const [srows, setSrows] = useState([]);
  const [searched, setSearched] = useState("");
  const [produrl,setProdurl] = useState("http://localhost:3001");
  const handleClose = () => setModelOpen(false);
  const handleOpen = () => {  setModelOpen(true);}

  const [modelOpen, setModelOpen] = React.useState(false);
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
    tabledata = await Getenquirydata();

    const arr = [];
    // alert(JSON.stringify(tabledata.data[0].cmplogo))
    tabledata.data.forEach((element) => {
      let search = `${element.uname}-${element.mob}-${element.gender}`;
      arr.push(
        createData(
          element.enqid,
          element.logid,
          element.edate,
          element.pdetail,
          element.descr,
          element.mob,
          element.uname,
          element.gender,
          search
        )
      );
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
                  let edate = new Date(row.edate);
                  edate =
                    edate.getDate() +
                    "/" +
                    (edate.getMonth() + 1) +
                    "/" +
                    edate.getFullYear();
                  let bal = false;
                  if (row.isstatus == "COMPLETE") {
                    bal = true;
                  }
                  let pdetail = JSON.parse(row.pdetail);
                   
                  let imgurl = pdetail[0].imgurl;
                  let prodid = pdetail[0].prodid;
                  // alert(JSON.stringify(imgurl));
                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell>{edate}</TableCell>
                      {row.gender == "male" ? (
                        <TableCell sx={{}}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              paddingLeft:"30px"
                            }}
                          >
                            <span>
                              <img src={Male} width="18" height="18"></img>{" "}
                              {row.uname}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                
                              }}
                            > <AddIcCallIcon  sx={{}} />
                              <a style={{textDecoration:"none",color:"black",marginTop:"px"}} href={`tel:` + row.mob}>
                                {row.mob}
                              </a>
                            </span>
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell >
                           <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              paddingLeft:"30px"
                            }}
                          >
                            <span>
                          <img src={Female} width="18" height="18"></img>{" "}
                          {row.uname}
                          </span>
                          <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                
                              }}
                            > <AddIcCallIcon  sx={{}} />
                              <a style={{textDecoration:"none",color:"black",marginTop:"px"}} href={`tel:` + row.mob}>
                                {row.mob}
                              </a>
                            </span>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>{row.descr}</TableCell>
                      <TableCell  onClick={async()=>{
                                      setProdurl(PRO_URL+"/productdetail/"+prodid);  handleOpen();
                                    }}  >
                         
                        <img src={imgurl.toString()} height="75px" width="75px"></img></TableCell>

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
      <Modal
        open={modelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
  >
    <div style={{marginTop:"30px",display:"flex",alignItems:"center",justifyContent:"center",height:"70%"}}
    >    <iframe src={produrl}  style={{display:"flex",marginTop:"100px"}}width="80%" height="500px">
    </iframe>
    
    <CloseIcon onClick={handleClose} sx={{height:"1000px",fontSize:"35px",color:"white",cursor:"pointer",position:"absolute",top:-450,right:130}}  ></CloseIcon>
    
    </div>
  </Modal>
    </div>
  );
}

