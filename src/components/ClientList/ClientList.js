import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./ClientList.css";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Company Name", width: 300 },
];
const rows = [];

export default function DataTable() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeInput, setActiveInput] = useState(null);
  const [data, setdata] = React.useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "companyName", headerName: "Comapany Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 }
  ];
  //handle change events

  const handleNameChange = (event) => {
    event.preventDefault();
    setCompanyName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  let token = localStorage.getItem("token");

  let role = token !== null ? jwtDecode(token).role : "";
  // toast message
  const notifysuccess = (msg) => toast.success(msg, { autoClose: 1500 });
  const notifyfailure = (msg) => toast.error(msg, { autoClose: 1500 });

  const url = "https://hospital3.onrender.com/client/addclient";
  // handle add client submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      companyName: companyName,
      email: email,
      password: password,
    };
    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data.status === 201) {
          notifysuccess(response.data.message);
          setTimeout(() => {
            // window.location.replace("/home");
            window.location.reload(false);
          }, 2000);
         
        } else {
          notifyfailure(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    let url = 'https://hospital3.onrender.com/client/clientList'
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
          setdata(response.data.data);
          // window.location.reload(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
     <ToastContainer />
      {role !== null && role === "ADMIN" ? (
        <div className="container">
          <form
            onSubmit={handleSubmit}
            style={{
              margin: "8rem 3rem 3rem 3rem",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="form-group">
              <label htmlFor="companyName">
                Company Name
                <span style={{ color: "red", fontSize: "15px" }}>*</span>:
              </label>
              <input
                autoFocus
                type="text"
                id="companyName"
                value={companyName}
                className={`form-control`}
                onChange={handleNameChange}
                onClick={() => setActiveInput("companyName")}
                required
                style={{
                  borderColor:
                    activeInput === "companyName" ? "#007bff" : "#ccc",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email<span style={{ color: "red", fontSize: "15px" }}>*</span>:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className={"form-control"}
                placeholder="Email"
                onChange={handleEmailChange}
                onClick={() => setActiveInput("email")}
                required
                style={{
                  borderColor: activeInput === "email" ? "#007bff" : "#ccc",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
                <span style={{ color: "red", fontSize: "15px" }}>*</span>:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className={`form-control`}
                placeholder="Password"
                onChange={handlePasswordChange}
                onClick={() => setActiveInput("password")}
                required
                style={{
                  borderColor: activeInput === "password" ? "#007bff" : "#ccc",
                }}
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Add Client
              </button>
              {/* Uncomment the code below if you want to include the back button */}
              {/* <NavLink className="btn btn-light" to="/clientList">
          Back
        </NavLink> */}
            </div>
          </form>
        </div>
      ) : null}
     {role !== null && role === "ADMIN" ? (<Box>
        <div
          style={{
            height: 740,
            width: "95vw",
            marginBottom: "100px",
            marginTop: "150px",
            marginLeft: "20px",
            border: "2px solid rgb(1,64,118)",
          }}
        >
          <Typography
            align="center"
            component="h1"
            variant="h4"
            style={{
              backgroundColor: "rgb(1,64,118)",
              color: "white",
              height: "50px",
            }}
          >
            My Client
          </Typography>
          <div>
            <DataGrid
              sx={{ my: 2 }}
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </Box>) : null}
    </>
  );
}
