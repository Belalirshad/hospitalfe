import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./DownloadReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DownloadReport() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  let token = localStorage.getItem("token");

  let role = token !== null ? jwtDecode(token).role : "";

  const currentTime = Date.now() / 1000; // Convert current time to seconds
  if (jwtDecode(token).exp < currentTime) {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  // toast message
  const notifysuccess = (msg) => toast.success(msg, { autoClose: 2000 });
  const notifyfailure = (msg) => toast.error(msg, { autoClose: 2000 });

  const handleRowClick = (row) => {
    setSelectedRow(row);
    // sendDataToServer(row); // Call the function to send data to the server
  };
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleYearSelection = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredData = data.filter((row) => {
    if(searchQuery !== undefined && searchQuery !== "") {

      return row.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || row.empCode.includes(searchQuery);
    }
   
    const rowYear = row.uploadedAt.split("-")[2];
    if (selectedYear !== undefined && selectedYear !== "") {
      return rowYear.toString() === selectedYear;
    }else return true
  });
  useEffect(() => {
    let url = "https://app.thakurhospital.in/client/reportList";
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
          setData(response.data.data);
          // window.location.reload(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDownloadClick = async (e, fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob", // Set the response type to 'blob'
      });
      console.log(response);
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "file.pdf"); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("Error downloading file:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="search"
        style={{ marginBottom: "-5rem", marginTop: "9rem" }}
      >
         
        <select className="year-filter" value={selectedYear} onChange={handleYearSelection}>
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <input
          style={{ width: "30%" }}
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search by Employee Name or Code..."
          className="search-input"
        />
      </div>

      {token && role === "CLIENT" ? (
        <div style={{ marginTop: "200px", marginBottom: "100px" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Employee Code</th>
                <th>Company Name</th>
                <th>Document</th>
                <th>Category</th>
                <th>Uploaded At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} onClick={() => handleRowClick(row)}>
                  <td>{row.id}</td>
                  <td>{row.clientName}</td>
                  <td>{row.empCode}</td>
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
