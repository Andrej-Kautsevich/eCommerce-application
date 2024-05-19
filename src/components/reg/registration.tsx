import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import schemaPass from '../validation/passValidation';
import schemaEmail from '../validation/emailValidation';
import schemaName from '../validation/nameValidation';
// import handleSubmit from './SubmitFunction';
import schemaBirthDate from '../validation/validationBirthDate';
import schemaCity from '../validation/cityValidation';
import schemaStreet from '../validation/streetValidation';
import schemaPostalCode from '../validation/postalCodeValidation';
import Header from '../Header';
import CheckBox from './checkBoxDefault';

// TODO remove, this demo shouldn't need to reset the theme.

export default function Registration() {
  const [showBilling, setBilling] = useState(true);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    city: '',
    street: '',
    postalCode: '',
    email: '',
    password: '',
  });
  // state for error messages
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const schemas = {
    firstName: schemaName,
    lastName: schemaName,
    birthDate: schemaBirthDate,
    city: schemaCity,
    street: schemaStreet,
    postalCode: schemaPostalCode,
    email: schemaEmail,
    password: schemaPass,
  };
  type SchemaKeys = 'firstName' | 'lastName' | 'birthDate' | 'city' | 'street' | 'postalCode' | 'email' | 'password';
  function validateField(name: SchemaKeys, value: string) {
    schemas[name]
      .validate(value)
      .then(() => setErrors((prev) => ({ ...prev, [name]: '' })))
      .catch((error: Error) => setErrors((prev) => ({ ...prev, [name]: error.message })));
  }
  function isHideBilling() {
    if (showBilling) setBilling(false);
    else setBilling(true);
    return showBilling;
  }

  return (
    <div className="top-panel">
      <Header />
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
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
                  onChange={(e) => {
                    validateField('firstName', e.target.value);
                  }}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.firstName}
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
                  onChange={(e) => validateField('lastName', e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.lastName}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  required
                  fullWidth
                  id="date"
                  helperText="Please type your birthday"
                  name="Birthday"
                  autoComplete="email"
                  onChange={(e) => validateField('birthDate', e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.birthDate}
                </p>
              </Grid>
              <Grid item xs={12}>
                <h4>Shipping address</h4>
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
                  onChange={(e) => validateField('city', e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.city}
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
                  onChange={(e) => validateField('street', e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.street}
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
                  onChange={(e) => validateField('postalCode', e.target.value)}
                />
                <CheckBox />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={() => {
                    isHideBilling();
                  }}
                  label="Use the same address for both"
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.postalCode}
                </p>
              </Grid>
              {showBilling && (
                <>
                  <Grid item xs={12}>
                    <h4>Billing address</h4>
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
                      id="city_billing"
                      label="City"
                      name="City"
                      onChange={(e) => validateField('city', e.target.value)}
                    />
                    <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                      {errors.city}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      required
                      fullWidth
                      id="street_billing"
                      name="Street"
                      label="Street"
                      onChange={(e) => validateField('street', e.target.value)}
                    />
                    <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                      {errors.street}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      required
                      fullWidth
                      id="postal_billing"
                      name="PostalCode"
                      label="Postal code"
                      autoComplete="email"
                      onChange={(e) => validateField('postalCode', e.target.value)}
                    />
                    <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                      {errors.postalCode}
                    </p>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <h4>Email & Password</h4>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={(e) => validateField('email', e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.email}
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
                  onChange={(e) => validateField('password', e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'red' }} className="error-message">
                  {errors.password}
                </p>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
