import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormSubmissionResponse } from "../../types/FormSubmissionRequest";

export default function FormSubmissions() {
  const [formSubmissions, setFormSubmissions] = useState([]);

  const getSubmissions = async () => {
    const response = await fetch("../api/formSubmissions");
    const data = await response.json();
    console.log(data);
    setFormSubmissions(data);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
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
  );
}
