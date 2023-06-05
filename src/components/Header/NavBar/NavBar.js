import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
// import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// import HealingTwoToneIcon from "@mui/icons-material/HealingTwoTone";
import "./NavBar.css";
import useAuth from "../../../Hooks/useAuth";
import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import jwtDecode from "jwt-decode";

// const pages = ['home', 'services', 'doctors', 'Appointment', 'about', 'login'];
const settings = ["Profile", "Logout"];

const Navbar = () => {
  // authentication
  const { logout, user } = useAuth();
  const { displayName, photoURL } = user;

  let token = localStorage.getItem("token");

  let email = token ? jwtDecode(token).email : null;
  let role = token ? jwtDecode(token).role : null;

  //navigation
  let history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //open naviagation for small device
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  // this is for close nav menu
  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleUserControl = (event) => {
    const userEvent = event.currentTarget.innerText;
    if (userEvent === "Logout") {
      logout();
      localStorage.removeItem("token");
      history.push("/login");
    } else if (userEvent === "Profile") {
      console.log("ok");
      history.push("/profile");
    }
  };
  return (
    <Box sx={{ mt: 8 }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: 0, bottom: "auto" }}
        style={{ background: "rgb(1,64,118)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <img
                src="https://res.cloudinary.com/dd7lihgvm/image/upload/v1682452966/WhatsApp_Image_2023-04-26_at_12.07.24_AM_jcrsof.jpg"
                alt="logo"
                width={90}
                height={80}
                style={{
                  marginRight: "10px",
                  borderRadius: "40%",
                  marginTop: "9px",
                }}
              />
              <h3 style={{ paddingTop: "12px" }}>THAKUR HOSPITAL</h3>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/*-------- small skin navigation-------- */}
                <MenuItem
                  bgcolor="primary"
                  component={HashLink}
                  smooth
                  to="/home"
                >
                  Home
                </MenuItem>

                <MenuItem
                  bgcolor="primary"
                  component={HashLink}
                  smooth
                  to="/services"
                >
                  Services
                </MenuItem>
                <MenuItem
                  bgcolor="primary"
                  component={HashLink}
                  smooth
                  to="/gallery"
                >
                  Facility Gallery
                </MenuItem>

                {token && (
                  <MenuItem
                    bgcolor="primary"
                    component={HashLink}
                    smooth
                    to="/doctors"
                  >
                    Doctors
                  </MenuItem>
                )}
                <MenuItem
                  bgcolor="primary"
                  component={HashLink}
                  smooth
                  to="/appointment"
                >
                  Appointment
                </MenuItem>

                {token && role === "ADMIN" && (
                  <MenuItem
                    bgcolor="primary"
                    component={HashLink}
                    smooth
                    to="/clientList"
                  >
                    My Clients
                  </MenuItem>
                )}

                {/* <MenuItem
                  bgcolor="primary"
                  component={HashLink}
                  smooth
                  to="/clientList#clientList"
                >
                  My Clients
                </MenuItem> */}

                {token && role === "ADMIN" && (
                  <MenuItem
                    bgcolor="primary"
                    component={HashLink}
                    smooth
                    to="/uploadDownload"
                  >
                    Upload
                  </MenuItem>
                )}
                {token && role === "CLIENT" && (
                  <MenuItem
                    bgcolor="primary"
                    component={HashLink}
                    smooth
                    to="/downloadReport"
                  >
                    Download
                  </MenuItem>
                )}

                {/* <MenuItem
                  bgcolor="primary"
                  component={HashLink}
                  smooth
                  to="/gallery#gallery"
                >
                  Gallery
                </MenuItem> */}

                {!token && (
                  <MenuItem
                    bgcolor="primary"
                    component={HashLink}
                    smooth
                    to="/login"
                  >
                    Login
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              align="center"
              component="div"
              sx={{ flexGrow: 1, pt: 2, display: { xs: "flex", md: "none" } }}
            >
              <img
                src="https://res.cloudinary.com/dd7lihgvm/image/upload/v1682452966/WhatsApp_Image_2023-04-26_at_12.07.24_AM_jcrsof.jpg"
                alt="logo"
                width={95}
                height={65}
                style={{ marginRight: "20px", borderRadius: "30%" }}
              />
              <p>THAKUR HOSPITAL</p>
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              style={{ marginLeft: "80px" }}
            >
              {/*-------- large skin navigation-------- */}

              <HashLink
                className="text-style text-style-fullscrn "
                smooth
                to="/home"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Home
                </Button>
              </HashLink>

              <HashLink
                className="text-style text-style-fullscrn "
                smooth
                to="/services"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Services
                </Button>
              </HashLink>
              <HashLink
                className="text-style text-style-fullscrn "
                smooth
                to="/gallery"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Facility Gallery
                </Button>
              </HashLink>
              {token && (
                <HashLink
                  className="text-style text-style-fullscrn "
                  smooth
                  to="/doctors"
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Doctors
                  </Button>
                </HashLink>
              )}

              <HashLink
                className="text-style text-style-fullscrn "
                smooth
                to="/appointment"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Appointment
                </Button>
              </HashLink>

              <HashLink
                className="text-style text-style-fullscrn "
                smooth
                to="/about"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  About
                </Button>
              </HashLink>
              {token && role === "ADMIN" && (
                <HashLink
                  className="text-style text-style-fullscrn "
                  smooth
                  to="/clientList"
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    My Clients
                  </Button>
                </HashLink>
              )}
              {token && role === "ADMIN" && (
                <HashLink
                  className="text-style text-style-fullscrn "
                  smooth
                  to="/uploadDownload"
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Upload
                  </Button>
                </HashLink>
              )}

              {token && role === "CLIENT" && (
                <MenuItem
                  bgcolor="primary"
                  component={HashLink}
                  smooth
                  to="/downloadReport"
                >
                  Download
                </MenuItem>
              )}
              {!token && (
                <HashLink
                  className="text-style text-style-fullscrn "
                  smooth
                  to="/login"
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Login
                  </Button>
                </HashLink>
              )}
            </Box>

            {/* user info and navigation btn */}

            {email ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        user?.email ? photoURL : "/static/images/avatar/2.jpg"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {" "}
                  <Typography
                    sx={{ p: "5px" }}
                    color="primary"
                    textAlign="center"
                  >
                    Hi, {displayName}
                  </Typography>
                  <Divider />
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        onClick={handleUserControl}
                        textAlign="center"
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <></>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
