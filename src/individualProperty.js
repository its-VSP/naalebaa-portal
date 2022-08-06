import React from "react";
import {
    Button
} from "@material-ui/core";
import Modal from 'react-bootstrap/Modal';
import { DataGrid } from "@mui/x-data-grid";
import { Navigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'docType',
      headerName: 'Document Type',
      width: 200,
    },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      width: 200,
    },
    {
      field: 'provHash',
      headerName: 'Provenance Hash',
      width: 400,
      renderCell: (cellValues) => {
        return (<a style={{ color:'#000'}} target="_blank" rel="noreferrer" href={`https://voyage.moi.technology/ixHash/${cellValues.row.provHash}`}>{cellValues.row.provHash.substring(0,50)+"..."}</a>)
      },
    },
    {
      field: "viewFile",
      headerName: "View",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            style={{ padding:'4px 20px', fontSize:'12px'}}
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            View Document
          </Button>
        )
      },
      width: 200
    }
  ];

  const handleClick = async (eve, cValues) => {
    try {
      const rawContent = await axios({
        url: `https://pnapi.moinet.io/moi/read?cid=${cValues.row.provHash}`,
        method: 'GET',
        responseType: 'blob',
      });
      const rawData = window.URL.createObjectURL(new Blob([rawContent.data], { type: rawContent.data.type }))
      window.open(rawData, "_blank");
    }catch(e) {
      console.log(e);
    }
  };
  
  const rows = [
    { id: 1, lastUpdated: '02 Jul, 2019 13:42:52 PM', docType: 'Sale Deed', provHash: "bafikbzacebserjlhudynvolguapxyt7m7lvvqgc7z3fy5wvtuldcsgpzcvi4c" },
    { id: 2, lastUpdated: '03 Jul, 2019 09:11:09 AM', docType: 'Encumberance Certificate', provHash: "bafikbzaceaylvh3dhgfjqbx2dh5zmg6tkb6bdks6x7xvdc3mdotvhrpdy53gi" },
    { id: 3, lastUpdated: '03 Jul, 2019 21:12:01 PM', docType: 'Property Tax', provHash: "bafikbzacebmmb5acjqe6jdo3ok3e7huda5szdmuu2kcppyb5gut4smb6gzqeo" },
    { id: 4, lastUpdated: '03 Jul, 2019 11:38:44 AM', docType: 'Compliance certificate', provHash: "bafikbzaceajxqxlxu7zzi6fmsqrdacyndmncqp344xikcnqwixbd5xl6dipbu" },
    { id: 5, lastUpdated: '04 Jul, 2019 13:01:13 PM', docType: 'Others(Khata)', provHash: "bafikbzacecircuxbtlj6gv3abg24msb7kg4lhlojcn7b4a4rfshems2wlszba" },
  ];

const DataTable = ({ products }) => {
    const [redirectStatus, setRedirectStatus] = React.useState(false);
    // const [availableForTitleTransfer, setAvailableForTitleTransfer] = React.useState(true);
    const [show, setShow] = React.useState(false);
    const [sendingRequest, setSendingRequest] = React.useState(false);
    const { propertyName } = useParams();

    const handleClose = () => setShow(false);

    const createRequest = () => {
      axios({
        url: "http://localhost:8060/property/create",
        method:"POST",
        headers: {
          'Content-Type': "application/json"
        },
        data: {
          "propertyName": propertyName,
          "userID": "sai.moi" // username of the seller
        }
      }).then((res) => {
        window.location.href=`/myProperties/${propertyName}/status`;
      }).catch((e) => {
        setSendingRequest(false);
        console.log(e);
      })
    }

  return (
        <div className="row">
            {redirectStatus && <Navigate to="./status" />}
            <div className="row">
                <h3 className="col-md-3">Property Documents</h3>
                <div className="col-md-3"></div>
                <div className="col-md-4"></div>
                <Button 
                    className="col-md-2" 
                    style={{ backgroundColor:'#400CCC', color: '#fff', margin:'0px 0px 20px 0px' }}
                    onClick={ () => {
                      if(window.currentUserType === "seller") {
                        setShow(true);
                      }else {
                        setRedirectStatus(true) 
                      }
                    }}
                > {window.currentUserType === "seller" ? "Sell this property" : "Check Status" }</Button>
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Request for Title Transfer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                On clicking request, you are willing to sell this property to <b>Buyer</b>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={{ fontSize: "12px" }}>
                  No, I changed my mind
                </Button>
                <Button 
                  style={{ backgroundColor: "#1876d1", color: "#fff", fontSize: "12px" }}
                  onClick={ () => {
                    setSendingRequest(true);
                    createRequest();
                  }}
                >Send Request {sendingRequest && <CircularProgress size={20} style={{ marginLeft: "6px" }} color="inherit" />}</Button>
              </Modal.Footer>
            </Modal>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableColumnMenu
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
};

export default DataTable;