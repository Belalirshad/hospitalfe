import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./upload.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default function BasicSelect() {
  const rows = [
    { id: "Medical fitness Certificate", name: "MEDICAL FITNESS CERTIFICATE " },
    { id: "Medical health checkup", name: "MEDICAL HEALTH CHECK-UP" },
  ];
  const [client, setClient] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [type, setType] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [data, setdata] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [clientData, setClientData] = React.useState([]);
  const [enabled, setEnabled] = React.useState(false);
  const [excelData, setExcelData] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);

  let token = localStorage.getItem("token");

  let role = jwtDecode(token).role;

  const currentTime = Date.now() / 1000; // Convert current time to seconds
  if (jwtDecode(token).exp < currentTime) {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
  let url = "";
  if (role === "ADMIN") {
    url = "https://hospital3.onrender.com/client/documentList";
  } else {
    url = "https://hospital3.onrender.com/client/reportList";
  }
  // toast message
  const notifysuccess = (msg) => toast.success(msg, { autoClose: 1500 });
  const notifyfailure = (msg) => toast.error(msg, { autoClose: 1500 });

  const handleChange = (event) => {
    setClient(event.target.value);
    let clientId = clientData.filter(
      (client) => client.companyName === event.target.value
    );

    setClientName(clientId[0]._id);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFileSelect = (event) => {
    // console.log("event", event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "uploadedAt", headerName: "Uploaded At", width: 200 },
    {
      field: "document",
      headerName: "Document",
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="row image" style={{ width: "100%" }} />
      ),
    },
  ];

  React.useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((response) => {
        // console.log(response.data.data, response.data.status);
        if (response.data.status === 200) {
          setdata(response.data.data);
        }
      })
      .catch((error) => console.error(error));
    axios
      .get("https://hospital3.onrender.com/client/clientMinifiedList", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((response) => {
        // console.log(response.data.data, response.data.status);
        if (response.data.status === 200) {
          setClientData(response.data.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("companyName", clientName);
    formData.append("category", type);

    let token = localStorage.getItem("token");

    // Call an API to upload the file
    axios
      .post("https://hospital3.onrender.com/client/readFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      })
      .then((response) => {
        // console.log("response", response);
        if (response.status === 200) {
          // console.log("response", response);
          notifysuccess("Mail Merge is successfully completed");
          setEnabled(true);
          setExcelData(response.data.data);
          setRowData(type);
          // return ;
          // setTimeout(() => {
          //   window.location.reload(false);
          // }, 2100);
        } else {
          notifyfailure(response);
        }
      })
      .catch((err) => {
        console.log("=====>", err);
        notifyfailure(err);
      });
  };
  const convertAndUploadToCloudinary = () => {
    // Select the HTML element you want to convert to PDF
    const element = document.getElementById("content-to-pdf");
    if (!element) {
      console.log("Element not found");
      return;
    }
    // console.log("Converting",typeof element.outerHTML, "===>",typeof element.innerHTML);
    const htmlContent = element.outerHTML;
    let person = excelData[0]["NAME"];
    // const companyName = client;
    let payload = {
      htmlContent: htmlContent,
      companyName: clientName,
      category: type,
      name: person,
    };

    // let payload = {
    //   htmlElement: element,
    //   companyName: client,
    // };
    // console.log("payload:", payload);
    axios
      .post("https://hospital3.onrender.com/client/uploadFileCloudinary", {
        ...payload,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        notifysuccess("File uploaded successfully");
        setTimeout(() => {
          window.location.replace("/uploadDownload");
        }, 2500);
        // console.log("=====>", response);
      })
      .catch((err) => {
        console.log("=====>", err);
      });
  };
  // console.log("client upload", client);
  return (
    <>
      <ToastContainer />
      <div style={{ marginTop: "200px", marginBottom: "100px" }}>
        {role === "ADMIN" && (
          <FormControl
            style={{ marginLeft: "10px", width: "20%", height: "10%" }}
          >
            <InputLabel id="demo-simple-select-label">Select Client</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={client}
              label="Select Client"
              onChange={handleChange}
            >
              {clientData.map((row) => (
                <MenuItem
                  key={`${row.id}-${row.companyName}`}
                  value={row.companyName}
                >
                  {row.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {role === "ADMIN" && (
          <FormControl
            style={{ marginLeft: "10px", width: "20%", height: "10%" }}
          >
            <InputLabel id="demo-simple-select-label">Select Type</InputLabel>{" "}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Select Type"
              onChange={handleTypeChange}
            >
              <MenuItem value="0">Select applicant type...</MenuItem>
              {rows.length > 0 &&
                rows.map((row) => (
                  <MenuItem key={row.id} value={row.name}>
                    {row.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        {role === "ADMIN" && (
          <Button
            sx={{ background: "rgb(1,64,118)", mx: 2, width: "15%" }}
            variant="contained"
            component="label"
            startIcon={<CloudUploadOutlinedIcon />}
          >
            Upload File
            <input type="file" hidden onChange={handleFileSelect} />
          </Button>
        )}
        {role === "ADMIN" && (
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "rgb(1,64,118)",
              color: "white",
              width: "15%",
            }}
            onClick={handleSubmit}
            startIcon={<FileDownloadDoneOutlinedIcon />}
          >
            Mail Merge
          </Button>
        )}
        <br />
        <br />
        <div>
          <button
            className="custom-button"
            onClick={convertAndUploadToCloudinary}
          >
            Convert and Upload
          </button>
          {type && type === "MEDICAL HEALTH CHECK-UP" ? (
            <div id="content-to-pdf">
              <Box>
                <div
                  className="pdf"
                  style={{
                    border: "1px solid gray",
                    margin: "10px",
                    marginLeft: "2rem",
                  }}
                >
                  <div
                    className="heading-pdf"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="container"
                      style={{
                        background: "white",
                        fontSize: "20px",
                        fontWeight: "900",
                        // marginLeft: "20rem",
                      }}
                    >
                      {client.toUpperCase()}
                    </div>
                    <div
                      className="container"
                      style={{
                        background: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "10px",
                      }}
                    >
                      ({rowData})
                    </div>
                  </div>
                  <hr></hr>

                  <div>
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Dated :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["DATE"]}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Name :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Mr/Mrs/Ms. {item["NAME"]}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Father's Name :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Mr. {item["FATHER NAME"]}
                              </td>
                            </tr>
                            <tr style={{ width: "100%" }}>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Sex :-
                              </td>

                              <td
                                style={{
                                  fontWeight: "800",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["SEX"]}
                              </td>
                              <td
                                style={{
                                  width: "80px",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>
                              <td
                                style={{
                                  width: "80px",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>

                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Age :-
                              </td>

                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                <span style={{ fontWeight: "800" }}>
                                  {item["AGE"]}Y
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <span style={{ fontWeight: "800" }}>
                      PHYSICAL EXAMINATION
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Height :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["H"] ? item["H"] : item["HIGHT"]}{" "}
                                <span style={{ fontWeight: "800" }}>CM</span>
                              </td>
                              <td style={{ width: "8rem" }}></td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Weight :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["W"] ? item["W"] : item["WEIGHT"]}{" "}
                                <span style={{ fontWeight: "800" }}>KG</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Pulse rate :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["PULSE"]}{" "}
                                <span style={{ fontWeight: "800" }}>
                                  b/min.
                                </span>
                              </td>
                              <td style={{ width: "5rem" }}></td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                BP :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["BP"]}{" "}
                                <span style={{ fontWeight: "800" }}>mm/hg</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Temperature
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["TEMP"]}
                                <span style={{ fontWeight: "800" }}>F</span>
                              </td>
                              <td style={{ width: "5rem" }}></td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Finger Flexibility :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["BP"]}{" "}
                                <span style={{ fontWeight: "800" }}>mm/hg</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <span style={{ fontWeight: "800" }}>LAB INVESTIGATION</span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                HB :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["HB"]}{" "}
                                <span style={{ fontWeight: "800" }}>%</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                TLC :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["TLC"]}{" "}
                                <span style={{ fontWeight: "800" }}>
                                  b/min.
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                DLC :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                P :{item["N"]} L : {item["L"]} M : {item["M"]} E
                                : {item["E"]} B : {item["B"]}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                ESR :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["ESR"]} upto{" "}
                                <span style={{ fontWeight: "800" }}>
                                  20mm/1hr
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Blood Group :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["BG"] ? item["BG"] : item["B GROUP"]}
                                <span style={{ fontWeight: "800" }}></span>
                              </td>
                              <td
                                style={{
                                  width: "8rem",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                RH Factor :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["RH FACTOR"]}{" "}
                                <span style={{ fontWeight: "800" }}></span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Random Blood Sugar :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["B SUGAR"]
                                  ? item["B SUGAR"]
                                  : item["BLOOD SUGAR"]}
                                <span style={{ fontWeight: "800" }}></span>
                              </td>
                              <td
                                style={{
                                  width: "8rem",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Limit :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                <span style={{ fontWeight: "700" }}>
                                  70-140 mg/dl
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Urine Complete :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                NAD
                                <span style={{ fontWeight: "800" }}></span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Near & Far vision(Left Eye) :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                6/6 {item["GLASS"]}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Near & Far vision(Right Eye) :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                6/6 {item["GLASS"]}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Colour Blindness :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                NORMAL
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Dental Checkups :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                NAD
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <span style={{ fontWeight: "800" }}>
                      SYSTEMATIC CHECK-UP
                    </span>
                    <hr />
                    <table
                      style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        fontSize: "15px",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "30%",
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Respiratory system{" "}
                          </td>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            NAD
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Cardiovascular system{" "}
                          </td>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            NAD
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Ear, Nose &amp; Throat{" "}
                          </td>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            NAD
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Nervous System{" "}
                          </td>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            NAD
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            G I system{" "}
                          </td>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            NAD
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Anemia{" "}
                          </td>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            NAD
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Lymphadenopathy
                          </td>
                          <td
                            style={{
                              border: "1px solid rgb(172, 167, 167)",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            NAD
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <div
                      className="patient-pdf"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "80%", marginRight: "15rem" }}>
                        <span style={{ fontWeight: "800" }}>
                          Deptt. of Pathology
                        </span>
                        {excelData.length > 0 &&
                          excelData.map((item, index) => (
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                fontSize: "15px",
                              }}
                              key={`${index}-${item.NAME}`}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Patient Name
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["NAME"]}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Age
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["AGE"]}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Sex
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["SEX"]}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Ref. by
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {client}{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          ))}
                      </div>
                      <div style={{ width: "80%" }}>
                        <span style={{ fontWeight: "800" }}>
                          (Consultant Pathologist)
                        </span>
                        {excelData.length > 0 &&
                          excelData.map((item, index) => (
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                fontSize: "15px",
                              }}
                              key={`${index}-${item.NAME}`}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Order Date
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["DATE"]}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Report Date
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["DATE"]
                                      ? item["DATE"]
                                      : moment(new Date()).format("DD-MM-YYYY")}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Specimen
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Blood
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Hospital Name
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Thakur Hospital
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <thead>
                            <tr>
                              <th
                                style={{
                                  fontWeight: "800",
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                INVESTIGATION
                              </th>
                              <th
                                style={{
                                  fontWeight: "800",
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                RESULTS
                              </th>
                              <th
                                style={{
                                  fontWeight: "800",
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                N. RANGE
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Hemoglobin
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["HB"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Male : 12.5 – 16.5 mg/dl <br />
                                Female : 10.5 – 12.5 mg/dl
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Total Leukocyte count
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["TLC"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                4000 – 11000 / CUMN
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Differential Leukocyte Count
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Neutrophils
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["N"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                40-75
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Lymphocytes
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["L"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                20-45
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Monocytes
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["M"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                01-06
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Eosinophiles
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["E"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                02-10
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Basophils
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["B"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                0-01
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Erythrocytes Sedimentation Rate
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["ESR"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                upto20mm/1st hr
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                R. Blood Sugar
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["B SUGAR"]
                                  ? item["B SUGAR"]
                                  : item["BLOOD SUGAR"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                70-140 mg/dl
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                B.Group RH Factor
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["BG"] ? item["BG"] : item["B GROUP"]}{" "}
                                {item["RH FACTOR"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    {/* </div> */}
                  </div>
                  <hr />
                  <span style={{ fontWeight: "800" }}>URINE ANALYSIS</span>

                  {excelData.length > 0 &&
                    excelData.map((item, index) => (
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: "15px",
                        }}
                        key={`${index}-${item.NAME}`}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              COLOR
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {item["URINE COLOR"]}{" "}
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}

                  <hr />

                  <span style={{ fontWeight: "800" }}>
                    CHEMICAL EXAMINATION
                  </span>

                  {excelData.length > 0 &&
                    excelData.map((item, index) => (
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: "15px",
                        }}
                        key={`${index}-${item.NAME}`}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Reaction
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              ACIDIC
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Albumin
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Sugar
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  <hr />
                  <span style={{ fontWeight: "800" }}>MICROSCOPIC EXAM</span>

                  {excelData.length > 0 &&
                    excelData.map((item, index) => (
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: "15px",
                        }}
                        key={`${index}-${item.NAME}`}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Pus Cell
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {item["PUS CELLS"]}
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Epithelial Cells
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              RBC’S
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {item["RBC"]}
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Amorphous Deposits
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Triple Phosphates
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Any Other
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}

                  <hr />
                  <span style={{ fontWeight: "800" }}>GENERAL IMPRESSION</span>
                  <hr />
                  <span>
                    After careful examination person is found physically &amp;
                    Mentally fit for duty, he/she is free from contagious /
                    obnoxious diseases
                  </span>
                  <hr />
                  <div
                    style={{
                      marginTop: "4rem",
                      marginRight: "1rem",
                      marginBottom: "2rem",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "15%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                  fontWeight: "bold",
                                }}
                              >
                                Dated
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                  fontWeight: "bold",
                                }}
                              >
                                {item["DATE"]}
                                <span style={{ fontWeight: "800" }}></span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                  </div>
                  <div>
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <div key={`${index}-${item["NAME"]}`}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              fontWeight: "800",
                              fontSize: "17px",
                            }}
                          >
                            <p style={{ borderBottom: "1px solid black" }}>
                              MEDICAL EXAMINATION CERTIFICATE
                            </p>
                          </div>
                          <div style={{ width: "60%", margin: "auto" }}>
                            <p>
                              This is to certified that{" "}
                              <b>
                                Mr./Miss/Mrs.
                                {item["NAME"]}
                              </b>
                              .{" "}
                              <b>
                                S/o or D/o or W/o
                                {item["FATHER NAME"]}
                              </b>{" "}
                              /<b>Age {item["AGE"]} YEARS/ M</b> undergone
                              medical Health check up today bases on examination
                              and investigation reports, He/She is free from
                              infectius or contagious diseases and is Medically
                              fit to continue His/Her duties.
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "row-reverse" }}
                  >
                    <img
                      width="260"
                      height="170"
                      src="https://res.cloudinary.com/dd7lihgvm/image/upload/v1685877334/signature_tvw5av.jpg"
                      alt="signature"
                    />
                  </div>
                </div>
                {/* <div className="pdf" style={{ paddingTop: "4rem" }}> */}
              </Box>
            </div>
          ) : (
            <div id="content-to-pdf">
              <Box>
                <div
                  className="pdf"
                  style={{
                    border: "1px solid gray",
                    margin: "10px",
                    marginLeft: "2rem",
                  }}
                >
                  <div
                    className="heading-pdf"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="container"
                      style={{
                        background: "white",
                        fontSize: "20px",
                        fontWeight: "900",
                        // marginLeft: "20rem",
                      }}
                    >
                      {client.toUpperCase()}
                    </div>
                    <div
                      className="container"
                      style={{
                        background: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "10px",
                      }}
                    >
                      ({rowData})
                    </div>
                  </div>
                  <hr></hr>

                  <div>
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Dated :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["DATE"]}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Name Of Employee :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Mr/Mrs/Ms. {item["NAME"]}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Father/Husband Name :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Mr. {item["FATHER NAME"]}
                              </td>
                            </tr>
                            <tr style={{ width: "100%" }}>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Department :-
                              </td>

                              <td
                                style={{
                                  fontWeight: "800",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["DEPTT"]}
                              </td>
                              <td
                                style={{
                                  width: "80px",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>
                              <td
                                style={{
                                  width: "80px",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>

                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Designation :-
                              </td>

                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                <span style={{ fontWeight: "800" }}>
                                  {item["DESI"]}
                                </span>
                              </td>
                            </tr>
                            <tr style={{ width: "100%" }}>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Sex :-
                              </td>

                              <td
                                style={{
                                  fontWeight: "800",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["SEX"]}
                              </td>
                              <td
                                style={{
                                  width: "80px",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>
                              <td
                                style={{
                                  width: "80px",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>

                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Age :-
                              </td>

                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                <span style={{ fontWeight: "800" }}>
                                  {item["AGE"]}Y
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      1. PHYSICAL EXAMINATION
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Height :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["H"] ? item["H"] : item["HIGHT"]}{" "}
                                <span style={{ fontWeight: "800" }}>CM</span>
                              </td>
                              <td style={{ width: "8rem" }}></td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Weight :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["W"] ? item["W"] : item["WEIGHT"]}{" "}
                                <span style={{ fontWeight: "800" }}>KG</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      2. RESPIRATORY SYSTEM
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Chest :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                NAD{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      3. CIRCULATORY SYSTEM
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Pulse rate :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["PULSE"]}{" "}
                                <span style={{ fontWeight: "800" }}>
                                  b/min.
                                </span>
                              </td>
                              <td style={{ width: "5rem" }}></td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                BP :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["BP"]}{" "}
                                <span style={{ fontWeight: "800" }}>mm/hg</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <span style={{ fontWeight: "800" }}>4. SKIN DISEASES</span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Allergy :- NAD
                              </td>
                              {/* <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                NAD{" "}
                             
                              </td> */}
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      5. COMMUNICABLE OR CONTAGIOUS DISEASES
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                              // style={{
                              //   border: "1px solid rgb(172, 167, 167)",
                              //   padding: "8px",
                              //   textAlign: "left",
                              // }}
                              >
                                Tuberculosis :- NAD
                              </td>
                              {/* <td
                                // style={{
                                //   border: "1px solid rgb(172, 167, 167)",
                                //   padding: "8px",
                                //   textAlign: "left",
                                // }}
                              >
                                NAD{" "}
                             
                              </td> */}
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      6. EYE SIGHT EXAMINATION
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Distant Vision with glass and without glass
                                (Left Eye) :-
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Distant Vision with glass and without glass
                                (Right Eye) :-
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                <strong>6/6 ({item["GLASS"]}) </strong>
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                <strong>6/6 ({item["GLASS"]}) </strong>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Colour Blindness (Left Eye) :- NAD
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Colour Blindness (Right Eye) :- NAD
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <span style={{ fontWeight: "800" }}>
                      7. OTHER GENERAL CONDITIONS
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Ear/Hearing :- NAD
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Nose &amp; Throat :- NAD
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      8. GENERAL CLEANLINESS/PERSONAL HYGIENE
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Nails :- Normal
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Hairs:- Normal
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Mouth:- Normal
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Body :- Normal
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <hr />
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      9. BLOOD ANALYSIS & BLOOD GROUP(LAB REPORT ATTACHED)
                    </span>
                    <hr />
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                              // style={{
                              //   border: "1px solid rgb(172, 167, 167)",
                              //   padding: "8px",
                              //   textAlign: "left",
                              // }}
                              >
                                HB :- {item["HB"]}
                              </td>

                              <td
                              // style={{
                              //   border: "1px solid rgb(172, 167, 167)",
                              //   padding: "8px",
                              //   textAlign: "left",
                              // }}
                              >
                                TLC :- {item["TLC"]} mill/cumm
                              </td>
                            </tr>
                            <br />
                            <tr>
                              <td
                              // style={{
                              //   border: "1px solid rgb(172, 167, 167)",
                              //   padding: "8px",
                              //   textAlign: "left",
                              // }}
                              >
                                DLC:- {item["N"]}/{item["L"]}/{item["M"]}/
                                {item["E"]}/{item["B"]}
                              </td>
                              <td
                              // style={{
                              //   border: "1px solid rgb(172, 167, 167)",
                              //   padding: "8px",
                              //   textAlign: "left",
                              // }}
                              >
                                ESR :- {item["ESR"]} mm
                              </td>
                            </tr>
                            <br />
                            <tr>
                              <td>
                                Blood Group:-{" "}
                                {item["B GROUP"] ? item["B GROUP"] : item["BG"]}
                              </td>
                              <td>RH Factor :- {item["RH FACTOR"]}</td>
                            </tr>
                            <br />
                            <tr>
                              <td>
                                Random Blood Sugar:-{" "}
                                {item["B SUGAR"]
                                  ? item["B SUGAR"]
                                  : item["BLOOD SUGAR"]}
                              </td>
                              <td>
                                <strong>(Limit : 70-140mg/dl)</strong>
                              </td>
                            </tr>
                            <br />
                            <tr>
                              <td>
                                <strong>1. ECG :-</strong> (Report Attached)
                              </td>
                              <td>ECG :- Normal Report</td>
                            </tr>
                            <br />
                            <tr>
                              <td>
                                <strong>2. X-Ray of Chest</strong> (X Ray
                                Attached)
                              </td>
                              <td>View :- Normal Report</td>
                            </tr>
                            <br />
                            <tr>
                              <td>
                                <strong>3. Urine Analysis </strong>
                              </td>
                            </tr>
                            <br />
                            <tr>
                              <td>Appearance :- {item["URINE COLOR"]}</td>
                              <td>Reaction :- ACIDIC</td>
                            </tr>
                            <br />
                            <tr>
                             
                              <td>Albumin :- NIL</td>
                              <td>Sugar :- NIL</td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p style={{ marginLeft: "2rem" }}>
                          <strong>Doctors Name</strong>
                        </p>
                        <p style={{ marginLeft: "1rem" }}>
                          <strong>(Registration No. &amp; Degree)</strong>
                        </p>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <img
                            width="260"
                            height="170"
                            src="https://res.cloudinary.com/dd7lihgvm/image/upload/v1685877334/signature_tvw5av.jpg"
                            alt="signature"
                          />
                        </div>
                        <p style={{ marginLeft: "2rem" }}>
                          <strong>(Signature with seal)</strong>
                        </p>
                      </div>
                      <div>
                        <p style={{ marginTop: "17rem", marginRight: "2rem" }}>
                          <strong>Reviewed By</strong>
                        </p>
                      </div>
                    </div>

                    <hr />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <div
                      className="patient-pdf"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "80%", marginRight: "15rem" }}>
                        <span style={{ fontWeight: "800" }}>
                          Deptt. of Pathology
                        </span>
                        {excelData.length > 0 &&
                          excelData.map((item, index) => (
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                fontSize: "15px",
                              }}
                              key={`${index}-${item.NAME}`}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Patient Name
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["NAME"]}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Age
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["AGE"]}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Sex
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["SEX"]}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Ref. by
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {client}{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          ))}
                      </div>
                      <div style={{ width: "80%" }}>
                        <span style={{ fontWeight: "800" }}>
                          (Consultant Pathologist)
                        </span>
                        {excelData.length > 0 &&
                          excelData.map((item, index) => (
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                fontSize: "15px",
                              }}
                              key={`${index}-${item.NAME}`}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Order Date
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["DATE"]}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Report Date
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item["DATE"]
                                      ? item["DATE"]
                                      : moment(new Date()).format("DD-MM-YYYY")}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Specimen
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Blood
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Hospital Name
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid rgb(172, 167, 167)",
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Thakur Hospital
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          ))}
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />

                  <div style={{ marginTop: "2rem" }}>
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <thead>
                            <tr>
                              <th
                                style={{
                                  fontWeight: "800",
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                INVESTIGATION
                              </th>
                              <th
                                style={{
                                  fontWeight: "800",
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                RESULTS
                              </th>
                              <th
                                style={{
                                  fontWeight: "800",
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                N. RANGE
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Hemoglobin
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["HB"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Male : 12.5 – 16.5 mg/dl <br />
                                Female : 10.5 – 12.5 mg/dl
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Total Leukocyte count
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["TLC"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                4000 – 11000 / CUMN
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Differential Leukocyte Count
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Neutrophils
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["N"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                40-75
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Lymphocytes
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["L"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                20-45
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Monocytes
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["M"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                01-06
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Eosinophiles
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["E"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                02-10
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Basophils
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["B"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                0-01
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Erythrocytes Sedimentation Rate
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["ESR"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                upto20mm/1st hr
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                R. Blood Sugar
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["B SUGAR"]
                                  ? item["B SUGAR"]
                                  : item["BLOOD SUGAR"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                70-140 mg/dl
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                B.Group RH Factor
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {item["BG"] ? item["BG"] : item["B GROUP"]}{" "}
                                {item["RH FACTOR"]}
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              ></td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    {/* </div> */}
                  </div>
                  <hr />
                  <span style={{ fontWeight: "800" }}>URINE ANALYSIS</span>

                  {excelData.length > 0 &&
                    excelData.map((item, index) => (
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: "15px",
                        }}
                        key={`${index}-${item.NAME}`}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              COLOR
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {item["URINE COLOR"]}{" "}
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}

                  <hr />
                  <span style={{ fontWeight: "800" }}>MICROSCOPIC EXAM</span>

                  {excelData.length > 0 &&
                    excelData.map((item, index) => (
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: "15px",
                        }}
                        key={`${index}-${item.NAME}`}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Pus Cell
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {item["PUS CELLS"]}
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Epithelial Cells
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              RBC’S
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {item["RBC"]}
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Amorphous Deposits
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Triple Phosphates
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Any Other
                            </td>
                            <td
                              style={{
                                border: "1px solid rgb(172, 167, 167)",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              NIL
                              <span style={{ fontWeight: "800" }}></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}

                  <hr />
                  <span style={{ fontWeight: "800" }}>GENERAL IMPRESSION</span>
                  <hr />
                  <span>
                    After careful examination person is found physically &amp;
                    Mentally fit for duty, he/she is free from contagious /
                    obnoxious diseases
                  </span>
                  <hr />
                  <div
                    style={{
                      marginTop: "4rem",
                      marginRight: "1rem",
                      marginBottom: "2rem",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "15%",
                            fontSize: "15px",
                          }}
                          key={`${index}-${item.NAME}`}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                  fontWeight: "bold",
                                }}
                              >
                                Dated
                              </td>
                              <td
                                style={{
                                  border: "1px solid rgb(172, 167, 167)",
                                  padding: "8px",
                                  textAlign: "left",
                                  fontWeight: "bold",
                                }}
                              >
                                {item["DATE"]}
                                <span style={{ fontWeight: "800" }}></span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                  </div>
                  <div>
                    {excelData.length > 0 &&
                      excelData.map((item, index) => (
                        <div key={`${index}-${item["NAME"]}`}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              fontWeight: "800",
                              fontSize: "17px",
                            }}
                          >
                            <p style={{ borderBottom: "1px solid black" }}>
                              Periodic Medical Examination
                            </p>
                          </div>
                          <div style={{ width: "60%", margin: "auto" }}>
                            <p>
                              This is to certified that{" "}
                              <b>
                                Mr./Miss/Mrs.
                                {item["NAME"]}
                              </b>
                              .{" "}
                              <b>
                                S/o or D/o or W/o
                                {item["FATHER NAME"]}
                              </b>{" "}
                              /<b>Age {item["AGE"]} YEARS/ M</b> had undergone
                              to “Periodic Medical Examination”.
                            </p>
                            <p>
                              He had undergone medical examination including eye
                              examination (vision , colour blindness) , and is
                              free from communicable or contagious diseases.
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div style={{ width: "50%", margin: "auto" }}>
                    {" "}
                    <table>
                      <tbody>
                        <tr>
                          <td>Overall Health of Individual</td>
                          <td>Satisfactory / Not Satisfactory</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>Date: </p>
                  <p>Place: </p>

                  <p style={{ marginLeft: "85%" }}>
                    Signature of Physician with Seal
                  </p>
                  <div
                    style={{ display: "flex", flexDirection: "row-reverse" }}
                  >
                    <img
                      width="260"
                      height="170"
                      src="https://res.cloudinary.com/dd7lihgvm/image/upload/v1685877334/signature_tvw5av.jpg"
                      alt="signature"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      marginRight: "5%",
                    }}
                  >
                    <div>
                      <p>Reviewed By</p>
                      <p>Signature of HR with Seal</p>
                    </div>
                  </div>
                </div>
                {/* <div className="pdf" style={{ paddingTop: "4rem" }}> */}
              </Box>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
