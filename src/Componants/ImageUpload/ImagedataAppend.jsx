import React, { useState, useRef, useReducer, useEffect } from 'react'
import Grid from "@mui/material/Grid";

import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'


function ImagedataAppend(props) {
  return (
    <>
      <div
        style={{
          float: 'right',
          marginRight: '50px',
        }}
      >
        {props.imgdata?.map((image) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            // sx={{ float: "right", right: "20px" }}
          >
            <div
              // className="imgdiv"
              style={{
                border: 'solid 1px',
                borderColor: 'gray',
                borderRadius: 10,
                width: '100%',
                height: 200,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: 15,
                  top: 15,
                  display: 'flex',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: '#ffff',
                  border: 'solid 1px',
                  borderColor: 'rgba(50,50,50,0.4)',
                }}
              >
                <Tooltip title="Delete" placement="top">
                  <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      props.handleDeleteImg(image.id, {
                        imgid: image.id,
                        imgurl: image.path,
                      })
                    }}
                    sx={{ fontSize: 20 }}
                  />
                </Tooltip>
              </div>
              {/* <div style={{ position: "absolute" }}> */}
              <img
                src={image.img || image.product}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: 200,
                }}
                title="description"
              />

              {/* </div> */}
            </div>
          </Grid>
        ))}
      </div>
    </>
  )
}

export default ImagedataAppend
