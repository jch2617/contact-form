import { Box, Button, TextField, Typography } from '@mui/material'
import styles from './page.module.css'

/* TODO
- check mobile
- clean up css
- validations
- form state
*/

const defaultBlue = "#0087AA";

const textFieldStyles = {
  background: '#ffffff',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1997B7',
    },
    '&:hover fieldset': {
      borderColor: '#1997B7',
    },
    "&.Mui-focused": {
      border: defaultBlue,
    }
  },
  '& .MuiFormLabel-root': {
    color: defaultBlue,
  },
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Box className={styles.form}>
          <Typography variant="h5">Contact Us Form</Typography>
          <TextField label="First Name" sx={textFieldStyles}>First Name</TextField>
          <TextField label="Last Name" sx={textFieldStyles}>Last Name</TextField>
          <TextField label="Email" sx={textFieldStyles}>Email</TextField>
          <TextField
            label="Message"
            multiline
            minRows={4}
            sx={textFieldStyles}
          />    
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: defaultBlue,
              ":hover": {
                backgroundColor: '#1997B7'
              }
            }}
          >
            Submit
          </Button>  
        </Box>
      </div>
    </main>
  )
}
