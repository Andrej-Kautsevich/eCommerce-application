import Avatar from '@mui/material/Avatar';
import './loginTab.module.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import schema from '../validation/emailValidation';
import schemaPass from '../validation/passValidation';
import handleSubmit from '../reg/submitFunction';

const defaultTheme = createTheme();

export default function SignIn() {
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState('password');
  const [emailError, setEmailError] = useState('');
  function validationEmail(data: string) {
    const formData = {
      email: data,
    };
    schema
      .validate(formData)
      .then(() => setEmailCon(''))
      .catch((error: Error) => {
        setEmailCon(error.message);
      });
  }
  function validationPass(data: string) {
    const formData = {
      password: data,
    };
    schemaPass
      .validate(formData)
      .then(() => setContent(''))
      .catch((error: Error) => {
        setContent(error.message);
      });
  }

  return (
    <>
      <div className="top_panel">
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create Account
        </Button>
      </div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" style={{ width: '320px' }} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => validationEmail(e.target.value)}
              />
              <h4
                style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', color: 'red' }}
                className="error-message-displaying"
              >
                {emailCon}
              </h4>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={testContent}
                id="password"
                autoComplete="current-password"
                onChange={(e) => validationPass(e.target.value)}
              />
              <h4
                style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', color: 'red' }}
                className="error-message-displaying"
              >
                {content}
              </h4>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => {
                      if (testContent === 'password') {
                        setTestContent('text');
                      } else {
                        setTestContent('password');
                      }
                    }}
                    value="remember"
                    color="primary"
                  />
                }
                label="Show Password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
