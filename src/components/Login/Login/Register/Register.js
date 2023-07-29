import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
// import GoogleButton from "react-google-button";
import useAuth from "../../../../Hooks/useAuth";
import UserProfile from "../UserProfile/UserProfile";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [companyName, setCompanyName] = useState("");
  //   const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    user,
    // singInUsingGoogle,
    // singInUsingFacebook,
    // singInUsingGithub,
    handleConfirmPass,
    handleRegister,
    handleUserName,
    handleEmail,
    handlePass,
    // error,
    toggleLogin,
  } = useAuth();

  function onChangeCompanyName(event) {
    // console.log("name", event.target.value);
    setCompanyName(event.target.value);
  }

  function onChangeEmail(event) {
    // console.log("name", event.target.value);

    setEmail(event.target.value);
  }
  function onChangePassword(event) {
    // console.log("name", event.target.value);

    setPassword(event.target.value);
  }

  let token = localStorage.getItem("token");
  // calling register axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      email: email,
      companyName: companyName,
      password: password,
    };

    axios
      .post("https://app.thakurhospital.in/client/register", payload)
      .then((response) => {
        // console.log("response", response);\
        if (response.data.status === 201) {
          setTimeout(() => {
            window.alert("User is successfully registered !");
            window.location.replace("/login");
          }, 500);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {token ? (
        <>
          <UserProfile />
        </>
      ) : (
        <>
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onBlur={handleUserName}
                    autoComplete="given-name"
                    name="companyName"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    value={companyName}
                    onChange={onChangeCompanyName}
                    autoFocus
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={onChangeLastName}
                    autoComplete="family-name"
                  />
                </Grid> */}
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
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChangePassword}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={handleConfirmPass}
                    required
                    fullWidth
                    name="confirmPassword"
                    label="confirm Password"
                    type="password"
                    id="confirm Password"
                    autoComplete="new-password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography sx={{ p: 1 }} color="red">
                    {error}
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={toggleLogin(false)}>
                    <Link
                      className="body-link-text-style"
                      to="/login"
                      variant="body2"
                    >
                      Already have an account? Login
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Register;
