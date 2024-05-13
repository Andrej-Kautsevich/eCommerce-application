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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import schemaPass from '../validation/passValidation';
import schema from '../validation/emailValidation';
import schemaName from '../validation/nameValidation';
import handleSubmit from './submitFunction';
import schemaBirthDate from '../validation/validationBirthDate';
import schemaCity from '../validation/cityValidation';
import schemaStreet from '../validation/streetValidation';
import schemaPostalCode from '../validation/postalCodeValidation';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  // state for error messages
  const [firstNameCon, firstNameSet] = useState('');
  const [lastNameCon, lastNameSet] = useState('');
  const [dateCon, dateSet] = useState('');
  const [cityCon, citySet] = useState('');
  const [streetCon, streetSet] = useState('');
  const [postalCon, postalSet] = useState('');
  const [emailCon, emailSet] = useState('');
  const [passCon, passSet] = useState('');
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  function validationPass(data: string) {
    const formData = {
      password: data,
    };
    schemaPass
      .validate(formData)
      .then(() => passSet(''))
      .catch((error: Error) => {
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
      .catch((error: Error) => {
        emailSet(error.message);
      });
  }
  function validationFirstName(data: string) {
    const formData = {
      FirstName: data,
    };
    schemaName
      .validate(formData)
      .then(() => firstNameSet(''))
      .catch((error: Error) => {
        firstNameSet(error.message);
      });
  }
  function validationLastName(data: string) {
    const formData = {
      FirstName: data,
    };
    schemaName
      .validate(formData)
      .then(() => lastNameSet(''))
      .catch((error: Error) => {
        lastNameSet(error.message);
      });
  }
  function validationBirthDate(data: string) {
    const formData = {
      birthDate: data,
    };
    schemaBirthDate
      .validate(formData)
      .then(() => dateSet(''))
      .catch((error: Error) => {
        dateSet(error.message);
      });
  }
  function validationCity(data: string) {
    const formData = {
      city: data,
    };
    schemaCity
      .validate(formData)
      .then(() => citySet(''))
      .catch((error: Error) => {
        citySet(error.message);
      });
  }
  function validationStreet(data: string) {
    const formData = {
      street: data,
    };
    schemaStreet
      .validate(formData)
      .then(() => streetSet(''))
      .catch((error: Error) => {
        streetSet(error.message);
      });
  }
  function validationPostalCode(data: string) {
    const formData = {
      postalCode: data,
    };
    schemaPostalCode
      .validate(formData)
      .then(() => postalSet(''))
      .catch((error: Error) => {
        postalSet(error.message);
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
                  onChange={(e) => validationFirstName(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {firstNameCon}
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
                  onChange={(e) => validationLastName(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {lastNameCon}
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
                  onChange={(e) => validationBirthDate(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {dateCon}
                </p>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Country"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Belarus</MenuItem>
                      <MenuItem value={2}>Latvia</MenuItem>
                      <MenuItem value={3}>Poland</MenuItem>
                      <MenuItem value={4}>Germany</MenuItem>
                      <MenuItem value={5}>Belgium</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="City"
                  onChange={(e) => validationCity(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {cityCon}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  id="street"
                  name="Street"
                  label="Street"
                  onChange={(e) => validationStreet(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {streetCon}
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
                  onChange={(e) => validationPostalCode(e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {postalCon}
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
