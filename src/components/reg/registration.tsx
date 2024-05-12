import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import schemaPass from '../validation/passValidation';
import schema from '../validation/emailValidation';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  // state for error messages
  // const [firstNameCon, firstNameSet] = useState('');
  // const [lastNameCon, lastNameSet] = useState('');
  // const [dateCon, dateSet] = useState('');
  // const [cityCon, citySet] = useState('');
  // const [streetCon, streetSet] = useState('');
  // const [postalCon, postalSet] = useState('');
  const [emailCon, emailSet] = useState('');
  const [passCon, passSet] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  function validationPass(data: string) {
    const formData = {
      password: data,
    };
    schemaPass
      .validate(formData)
      .then(() => passSet(''))
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        passSet(error.message);
      });
  }
  function validationEmail(data: string) {
    const formData = {
      email: data,
    };
    schema
      .validate(formData)
      .then(() => emailSet(''))
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        emailSet(error.message);
      });
  }

  return (
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  Hello this is error message
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  Hello this is error message
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  required
                  fullWidth
                  id="date"
                  helperText="Please type your bithday"
                  name="Birthday"
                  autoComplete="email"
                  // onChange={(e) => console.log(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  Hello this is error message
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  select
                  helperText="Please select your country"
                  required
                  fullWidth
                  id="contry"
                  label="Country"
                  name="Contry"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField type="text" required fullWidth id="city" label="City" name="City" />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  Hello this is error message
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField type="text" required fullWidth id="street" name="Street" label="Street" />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  Hello this is error message
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  id="postal"
                  name="PostalCode"
                  label="Postal code"
                  autoComplete="email"
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  Hello this is error message
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={(e) => validationEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {emailCon}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => validationPass(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {passCon}
                </p>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
