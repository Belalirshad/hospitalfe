import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Header from "./components/Header/Header/Header";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Notfound from "./components/Notfound/Notfound";
import Footer from "./components/Header/Footer/Footer";
import Login from "./components/Login/Login/Login";
import Register from "./components/Login/Login/Register/Register";
import Authprovider from "./Context/Authprovider";
import Services from "./components/Services/Services";
import Doctors from "./components/Services/Doctors/Doctors";
import Appointment from "./components/Services/Appointment/Appointment";
import ServiceDetails from "./components/Services/ServiceDetails/ServiceDetails";
import PrivetRoute from "./PrivetRoute/PrivetRoute";
import ClientList from "./components/ClientList/ClientList";
import Gallery from "./components/Gallery/Gallery";
import UploadDownload from "./components/Upload_Download/Upload_Download";
import DownloadReport from "./components/DownloadReport/DownloadReport";
import jwtDecode from "jwt-decode";

// custom style for this application
export const myTheme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#f48fb1",
    },
    alternate: {
      main: "#fff",
    },
    text: {
      secondary: "#212121",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  let token = localStorage.getItem("token");
  let role = token !== null ? jwtDecode(token).role : "";
  return (
    <>
      <Authprovider>
        <ThemeProvider theme={myTheme}>
          <BrowserRouter>
            <Header></Header>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/home">
                <Home></Home>
              </Route>
              <Route path="/gallery">
                <Gallery></Gallery>
              </Route>
              <PrivetRoute path="/doctors">
                <Doctors></Doctors>
              </PrivetRoute>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/clientList">
                <ClientList></ClientList>
              </Route>
              {role !== "" && role === "ADMIN" ? (
                <PrivetRoute path="/uploadDownload">
                  <UploadDownload></UploadDownload>
                </PrivetRoute>
              ) : (
                <PrivetRoute path="/downloadReport">
                  <DownloadReport></DownloadReport>{" "}
                </PrivetRoute>
              )}
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route path="/about">
                <About></About>
              </Route>
              <Route path="/profile">
                <Login></Login>
              </Route>
              <PrivetRoute path="/appointment">
                <Appointment></Appointment>
              </PrivetRoute>
              <Route exact path="/services">
                <Services></Services>
              </Route>
              <PrivetRoute exact path="/services/details/:servId">
                <ServiceDetails></ServiceDetails>
              </PrivetRoute>
              <Route path="*">
                <Notfound></Notfound>
              </Route>
            </Switch>
            <Footer></Footer>
          </BrowserRouter>
        </ThemeProvider>
      </Authprovider>
    </>
  );
}

export default App;
