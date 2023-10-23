import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import type { ReactElement } from "react";
import { useState } from "react";
import TooltipDatagridCell from "../public/components/TooltipDatagridCell";
import Layout from "../public/components/layout";
import styles from "../src/app/page.module.css";
import { FormSubmissionResponse } from "../types/FormSubmissionResponse";
import type { NextPageWithLayout } from "./_app";

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
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [formSubmissions, setFormSubmissions] = useState<
    FormSubmissionResponse[]
  >([]);

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChangeEmail = (e: any) => {
    const reg = new RegExp(emailPattern);
    setIsValidEmail(reg.test(e.target.value));
    setEmail(e.target.value);
  };

  const getSubmissions = async () => {
    const response = await fetch("../api/formSubmissions");
    const data = await response.json();
    setFormSubmissions(data);
  };

  const submitForm = async () => {
    const response = await fetch("./api/formSubmissions", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, message }),
      headers: {
        "Content-type": "application/json",
      },
    });
    await response.json();

    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    getSubmissions();
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <TooltipDatagridCell displayValue={params.value} />
      ),
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <TooltipDatagridCell displayValue={params.value} />
      ),
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <TooltipDatagridCell displayValue={params.value} />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <TooltipDatagridCell displayValue={params.value} />
      ),
    },
    {
      field: "message",
      headerName: "Message",
      sortable: false,
      width: 400,
      renderCell: (params: GridRenderCellParams) => (
        <TooltipDatagridCell displayValue={params.value} />
      ),
    },
  ];

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
          margin: "0 auto",
          marginBottom: "20px",
          padding: "1rem",
          backgroundColor: "rgba(var(--callout-rgb), 0.5)",
          border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
          borderRadius: "var(--border-radius)",
        }}
      >
        <Typography variant="h5">Contact Us</Typography>
        <TextField
          required
          error={firstName.length === 0}
          label="First Name"
          sx={textFieldStyles}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        >
          First Name
        </TextField>
        <TextField
          label="Last Name"
          sx={textFieldStyles}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        >
          Last Name
        </TextField>
        <TextField
          required
          label="Email"
          sx={textFieldStyles}
          value={email}
          error={!isValidEmail || lastName.length === 0}
          onChange={(e) => {
            handleChangeEmail(e);
          }}
        >
          Email
        </TextField>
        <TextField
          required
          label="Message"
          error={message.length === 0}
          multiline
          minRows={4}
          sx={textFieldStyles}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button
          disabled={
            !isValidEmail ||
            firstName.length === 0 ||
            email.length === 0 ||
            message.length === 0
          }
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
        {formSubmissions.length > 0 ? (
          <>
            <Typography>Form Submissions</Typography>
            <DataGrid
              columns={columns}
              rows={formSubmissions || []}
              disableRowSelectionOnClick
              disableColumnMenu
              checkboxSelection
              sx={{
                backgroundColor: "#ffffff",
              }}
            />
          </>
        ) : (
          <></>
        )}
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
