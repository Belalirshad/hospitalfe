import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
// import GoogleButton from "react-google-button";
import "./Login.css";
import useAuth from "../../../Hooks/useAuth";
import UserProfile from "./UserProfile/UserProfile";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { Fingerprint } from "@mui/icons-material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import { useLocation } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  //   const { singInUsingGoogle, handlePasswordReset, user, setUser, mail, handleRegister, handleEmail, handlePass, error, setError, toggleLogin, setIsLoading } = useAuth();
  const { handleEmail, handlePass, error, toggleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //location is use for privet route
  // const location = useLocation();
  // const history = useHistory();
  // const redirect_url = location.state?.from || "/profile";
  const notifysuccess = (msg) => toast.success(msg, { autoClose: 1500 });
  const notifyfailure = (msg) => toast.error(msg, { autoClose: 1500 });
  function onChangeEmail(event) {
    setEmail(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    let payload = {
      email: email,
      password: password,
    };

    axios
      .post("https://hospital3.onrender.com/client/login", payload)
      .then((response) => {
        // console.log(response);
        if (response.data.status === 200) {
          notifysuccess(response.data.message)
          setTimeout(() => {
            localStorage.setItem("token", response.data.data.token);
            window.location.replace("/home");
          }, 1500);
        } else {
          notifyfailure(response.data.message);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  let token = localStorage.getItem("token");
  let loggerInEmail = token ? jwtDecode(token).email : null;

  const handlePasswordReset = () => {};

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container id="login" maxWidth="xl">
          {loggerInEmail ? (
            <>
              <UserProfile />
            </>
          ) : (
            <>
              {/* if user is logout */}
              <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                  sx={{
                    marginTop: 15,
                    marginBottom: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      m: 1,
                      bgcolor: "primary.main",
                      background: "rgb(1,64,118)",
                    }}
                  >
                    <LoginIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign In
                  </Typography>
                  <Box component="div" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleEmail}
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          value={email}
                          onChange={onChangeEmail}
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handlePass}
                          required
                          fullWidth
                          name="password"
                          type="password"
                          label="Password"
                          id="password"
                          value={password}
                          onChange={onChangePassword}
                          autoComplete="new-password"
                        />
                        <Typography sx={{ p: 1 }} color="red">
                          {error}
                        </Typography>
                      </Grid>

                      <Button
                        className="body-link-text-style"
                        variant="body2"
                        onClick={handlePasswordReset}
                      >
                        Forget Password? Reset now
                      </Button>
                    </Grid>
                    <Button
                      onClick={handleLogin}
                      fullWidth
                      variant="contained"
                      style={{ background: "rgb(1,64,118)" }}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      <Fingerprint /> Login
                    </Button>
                  </Box>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Button onClick={toggleLogin(true)}>
                        <Link
                          className="body-link-text-style"
                          to="/register"
                          variant="body2"
                        >
                          New here? Register
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>
                  {/* google btn */}
                  {/* <Grid container sx={{ mt: 2, mb: 3 }} justifyContent="flex-end">
                                    <Grid item>
                                        <GoogleButton className='google-btn'
                                            type="dark" // can be light or dark
                                            onClick={handleGoogleSignIn}
                                        />
                                    </Grid>
                                </Grid> */}

                  <Grid container sx={{ mb: 3 }} justifyContent="flex-end">
                    {/* Facebook btn */}
                    {/* <Grid item>
                                        <Button onClick={handleFacebooksignIn} variant="contained"
                                            sx={{ p: 1, bgcolor: '#4267B2' }}>
                                            <FacebookIcon />Facebook</Button>
                                    </Grid> */}
                    {/* <Typography textAlign="center" sx={{ p: 2 }}>Or</Typography> */}
                    {/* GitHUB btn */}
                    {/* <Grid item>
                                        <Button onClick={handleGithubSignIn} variant="contained"
                                            sx={{ p: 1, mb: 2, bgcolor: '#171515' }}>
                                            <GitHubIcon /> GitHub</Button>
                                    </Grid> */}
                  </Grid>
                </Box>
              </Container>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Login;
