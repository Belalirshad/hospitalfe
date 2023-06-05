import {
  // DateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/lab";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import swal from "sweetalert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAuth from "../../../Hooks/useAuth";
import jwtDecode from "jwt-decode";

const Appointment = () => {
  const { user } = useAuth();

  // const [clearedDate, setClearedDate] = React.useState(null);
  const [value, setValue] = React.useState(new Date());

  // doctor name function
  const [docName, setDocName] = React.useState("");

  let token = localStorage.getItem('token');
  let name = token ? jwtDecode(token).companyName : null;
  let email = token ? jwtDecode(token).email : null;

  const handleChange = (event) => {
    setDocName(event.target.value);
  };

  //swal alert
  const swalAlert = () => {
    console.log("fjdkfjkdfdfd", value)
    return swal("Your Appointment is Done You will Receive a mail ASAP.", {
      button: false,
      icon: "success",
    })
      .then((value) => {
  
        swal(
          `Your appointment data has been sent successfully. You will get a confirmation Email soon if the slot is free. We are trying to make it automated asap. Till then be patient`
        );
      })
      .catch((error) => {
        swal(`An error occurred while sending the email: ${error.message}`);
      });
  };
  return (
    <Box
      id="appointment"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h6"
          sx={{
            mt: 10,
            mb: 5,
          }}
        >
          Select your time and data for Appointment
        </Typography>

        {/* set doctor name */}
        <FormControl sx={{ mb: 5, minWidth: "50%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Select Doctor Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={docName}
            onChange={handleChange}
            autoWidth
            label="Select Doctor Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>DR MEENAKSHI THAKUR</MenuItem>
            <MenuItem value={11}>DR VARUN AGGARWAL</MenuItem>
            <MenuItem value={12}>DR RAMESH KUMAR</MenuItem>
            <MenuItem value={13}>DR DIGVIJAY THAKUR</MenuItem>
            <MenuItem value={14}>DR V S CHANARIA</MenuItem>
            <MenuItem value={16}>DR JAGTAR SINGH</MenuItem>
            <MenuItem value={17}>DR RAMESH KUMAR</MenuItem>
            <MenuItem value={18}>DR MEHAK BAMS</MenuItem>
            <MenuItem value={19}>DR BHARTI NANAD</MenuItem>
            <MenuItem value={20}>DR GURPREET KAUR</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ mb: 2 }}
          value={name}
          fullWidth
          label="Your Name"
          id="fullWidth"
        />
        <TextField
          sx={{ mb: 2 }}
          value={email}
          fullWidth
          label="Your Mail"
          id="fullWidth"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <MobileDateTimePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              label="Appointment Date"
              onError={console.log}
              minDate={new Date("2018-01-01T00:00")}
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <TextField
          sx={{ mt: 2, mb: 2 }}
          fullWidth
          label="Problem type"
          id="fullWidth"
        />

        <Button
          sx={{ p: 1, mt: 2, mb: 5, bgcolor: 'rgb(1,64,118)' }}
          onClick={swalAlert}
          variant="contained"
        >
          <AddCircleIcon /> Confirm
        </Button>
      </Container>
    </Box>
  );
};

export default Appointment;
