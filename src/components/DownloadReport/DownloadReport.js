import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./DownloadReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DownloadReport() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");

  let role = token !== null ? jwtDecode(token).role : "";

  // toast message
  const notifysuccess = (msg) => toast.success(msg, { autoClose: 2000 });
  const notifyfailure = (msg) => toast.error(msg, { autoClose: 2000 });

  const handleRowClick = (row) => {
    setSelectedRow(row);
    // sendDataToServer(row); // Call the function to send data to the server
  };

  useEffect(() => {
    let url = "http://localhost:2001/client/reportList";
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log(response.data.data, response.data.status);
        if (response.data.status === 200) {
          setData(response.data.data);
          // window.location.reload(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  //   const sendDataToServer = (row) => {
  //     // Implement your code to send data to the server here
  //     // You can use AJAX, Axios, or any other HTTP library to make the request
  //     // Example using Axios:
  //     // axios.post('/api/endpoint', row)
  //     //   .then(response => {
  //     //     // Handle response from the server
  //     //   })
  //     //   .catch(error => {
  //     //     // Handle error
  //     //   });
  //     console.log("Sending data to the server:", row);
  //   };

  const handleDownloadClick = (e, pdfUrl) => {
    e.preventDefault();
    axios
      .get("http://localhost:2001/client/download?" + pdfUrl)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          notifysuccess("File is successfully downloaded");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      {token && role === "CLIENT" ? (
        <div style={{ marginTop: "200px", marginBottom: "100px" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Document</th>
                <th>Category</th>
                <th>Uploaded At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} onClick={() => handleRowClick(row)}>
                  <td>{row.id}</td>
                  <td>{row.companyName}</td>
                  <td>
                    <iframe
                      width="100%"
                      heigth="30"
                      src={row.document}
                      title="PDF"
                    />
                  </td>
                  <td>{row.category}</td>
                  <td>{row.uploadedAt}</td>
                  <td>
                    <button
                      className="custom-button"
                      onClick={(e) => handleDownloadClick(e, row.document)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}