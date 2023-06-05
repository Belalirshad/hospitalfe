import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
// import HealingTwoToneIcon from "@mui/icons-material/HealingTwoTone";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
import "./Footer.css";
// import { blue } from "@mui/material/colors";
import { HashLink } from "react-router-hash-link";
// import doctorimg from "./../../../demo_imgs/doctor.png";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

// copyright function for generate year automatically
function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      <strong>
        <a className="text-style" target="_blank" rel="noreferrer noopener" href="/#">
          - Thakur Hospital -
        </a>{" "}
      </strong>
      {"Copyright ©"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <footer>
      <Box
        className="sticky-container"
        sx={{ bgcolor: "rgb(1,64,118)", color: "white", pb: 2, top: "auto" }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid sx={{ m: "auto" }} item xs={12} sm={6} md={4}>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
                >
                  <Avatar sx={{ mt: 1, mb: 1, mr: 1, bgcolor: "white" }}>
                    {/* <HealingTwoToneIcon
                                            color='rgb(125,181,215)'
                                            fontSize='large' /> */}
                    <img
                      src="https://res.cloudinary.com/dd7lihgvm/image/upload/v1682452966/WhatsApp_Image_2023-04-26_at_12.07.24_AM_jcrsof.jpg"
                      alt="logo"
                      width={40}
                    />
                  </Avatar>
                  Thakur Hospital
                </Typography>
                <Divider />
              </Box>

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Avatar sx={{ mt: 1, bgcolor: "white" }}>
                  <LocationOnIcon style={{ color: "#014076" }} />
                </Avatar>
                <span>
                  Near Senior Officer Colony, Vardhman, Tehsil Baddi, Distt-
                  Solan, H.P. (173205)
                </span>
              </Stack>

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Avatar sx={{ mb: 1, mt: 1, bgcolor: "white" }}>
                  <EmailIcon style={{ color: "#014076" }} />
                </Avatar>
                <a className="text-style" href="mailto:info@thakurhospital.in">
                  info@thakurhospital.in
                </a>
              </Stack>

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Avatar sx={{ mb: 1, bgcolor: "white" }}>
                  <CallIcon style={{ color: "#014076" }} />
                </Avatar>
                <a className="text-style" href="tel:7590000720">
                  8894434967, 7590000720, 8213970920
                </a>
              </Stack>
            </Grid>

            {/* ----------service part ---------------*/}
            <Grid item xs={12} sm={4}>
              <Root>
                <Divider>
                  <Chip style={{ color: "white" }} label="Our Services" />
                </Divider>
              </Root>

              <Box sx={{ p: 2 }}>
                <HashLink
                  className="text-style"
                  to="/doctors"
                  color="inherit"
                >
                  Find a Doctor
                </HashLink>
              </Box>

              <Box sx={{ p: 2 }}>
                <HashLink
                  className="text-style"
                  to="/services"
                  color="inherit"
                >
                  All services
                </HashLink>
              </Box>

              <Box sx={{ p: 2 }}>
                <HashLink
                  className="text-style"
                  to="/appointment"
                  color="inherit"
                >
                  Make An Appointment
                </HashLink>
              </Box>

              <Box sx={{ p: 2 }}>
                <HashLink className="text-style" to="/register" color="inherit">
                  Register For Service{" "}
                </HashLink>
              </Box>
            </Grid>

            {/* ----------social media part ------------*/}

            <Grid item xs={12} sm={4}>
              <Root>
                <Divider>
                  <Chip
                    style={{ color: "white" }}
                    label="Find us on social media"
                  />
                </Divider>
              </Root>

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Avatar  sx={{ mb: 1, mt: 1, bgcolor: "white" }}>
                  <FacebookIcon style={{ color: "#014076" }} />
                </Avatar>
                <a
                  className="text-style"
                  href="/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </Stack>

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Avatar sx={{ mb: 1, bgcolor: "white" }}>
                  <LinkedInIcon style={{ color: "#014076" }} />
                </Avatar>
                <a
                  className="text-style"
                  href="/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
