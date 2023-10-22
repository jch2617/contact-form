"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const defaultBlue = "#0087AA";
const hoverBlue = "#1997B7";

const textFieldStyles = {
  background: "#ffffff",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: hoverBlue,
    },
    "&:hover fieldset": {
      borderColor: hoverBlue,
    },
    "& .Mui-focused": {
      border: defaultBlue,
    },
  },
  "& .MuiFormLabel-root": {
    color: defaultBlue,
    "& .Mui-error": {
      color: "red",
    },
  },
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChangeEmail = (e: any) => {
    const reg = new RegExp(emailPattern);
    setIsValidEmail(reg.test(e.target.value));
    setFormData({ ...formData, email: e.target.value });
  };

  const submitForm = async () => {
    const response = await fetch("../../pages/api/formSubmissions", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "25rem",
        gap: "1rem",
      }}
    >
      <Typography variant="h5">Contact Us Form</Typography>
      <TextField
        label="First Name"
        sx={textFieldStyles}
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value });
        }}
      >
        First Name
      </TextField>
      <TextField
        label="Last Name"
        sx={textFieldStyles}
        onChange={(e) => {
          setFormData({ ...formData, lastName: e.target.value });
        }}
      >
        Last Name
      </TextField>
      <TextField
        label="Email"
        sx={textFieldStyles}
        error={!isValidEmail}
        onChange={(e) => {
          handleChangeEmail(e);
        }}
      >
        Email
      </TextField>
      <TextField
        label="Message"
        multiline
        minRows={4}
        sx={textFieldStyles}
        onChange={(e) => {
          setFormData({ ...formData, message: e.target.value });
        }}
      />
      <Button
        disabled={!isValidEmail}
        variant="contained"
        sx={{
          backgroundColor: defaultBlue,
          ":hover": {
            backgroundColor: hoverBlue,
          },
        }}
        onClick={() => {
          return submitForm();
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ContactForm;
