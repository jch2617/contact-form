import { Box, Button, TextField, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import Layout from "../public/components/layout";
import styles from "../src/app/page.module.css";
import type { NextPageWithLayout } from "./_app";
import { FormSubmissionResponse } from "../types/FormSubmissionRequest";

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
  const [formSubmissions, setFormSubmissions] = useState([]);

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChangeEmail = (e: any) => {
    const reg = new RegExp(emailPattern);
    setIsValidEmail(reg.test(e.target.value));
    setFormData({ ...formData, email: e.target.value });
  };

  const getSubmissions = async () => {
    const response = await fetch("../api/formSubmissions");
    const data = await response.json();
    console.log(data);
    setFormSubmissions(data);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  const submitForm = async () => {
    const response = await fetch("./api/formSubmissions", {
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25rem",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "inherit",
          maxWidth: "var(--max-width)",
          zIndex: 2,
          fontFamily: "var(--font-mono)",
          position: "relative",
          margin: 0,
          padding: "1rem",
          backgroundColor: "rgba(var(--callout-rgb), 0.5)",
          border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
          borderRadius: "var(--border-radius)",
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
          onClick={() => submitForm()}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Typography>Form Submissions</Typography>
        {formSubmissions.map((s: FormSubmissionResponse) => {
          // TODO make a table
          return (
            <div key={s.id}>
              {s.email} {s.message}
            </div>
          );
        })}
      </Box>
    </>
  );
};

const Page: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <div>
        <ContactForm />
      </div>
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
