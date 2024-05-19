import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { CheckboxElement, PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import schemaPass from '../validation/passValidation';
import schemaEmail from '../validation/emailValidation';
import schemaName from '../validation/nameValidation';
import handleSignUpSubmit from './handleSignUpSubmit';
import schemaBirthDate from '../validation/validationBirthDate';
import schemaCity from '../validation/cityValidation';
import schemaStreet from '../validation/streetValidation';
import schemaPostalCode from '../validation/postalCodeValidation';
import Header from '../Header';
import { RegistrationForm } from './types';
// import { StoreCountries } from '../../shared/types/enum';

export default function Registration() {
  const [showBilling, setBilling] = useState(false);
  const schema = yup.object().shape({
    firstName: schemaName,
    lastName: schemaName,
    birthDate: schemaBirthDate,
    shippingAddress: yup.object().shape({
      // country: StoreCountries,
      city: schemaCity,
      street: schemaStreet,
      postalCode: schemaPostalCode,
    }),
    defaultAddress: yup.boolean().default(false),
    billingAddress: yup
      .object()
      .shape({
        // country: StoreCountries,
        city: schemaCity,
        street: schemaStreet,
        postalCode: schemaPostalCode,
      })
      .notRequired(),
    email: schemaEmail,
    password: schemaPass,
  });

  // const countryOptions = Object.entries(StoreCountries).map(([id, label]) => ({ id, label }));

  const { control, handleSubmit } = useForm<RegistrationForm>({ mode: 'onChange', resolver: yupResolver(schema) });

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
          <Box component="form" onSubmit={handleSubmit(handleSignUpSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  autoComplete="given-name"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePickerElement
                  inputProps={{ fullWidth: true, autoComplete: 'bday', id: 'date' }}
                  required
                  helperText="You must be at least 18 years old to visit site"
                  name="birthDate"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <h4>Shipping address</h4>
                {/*                 <Box sx={{ minWidth: 120 }}>
                  <SelectElement
                    fullWidth
                    name="Country"
                    label="Country"
                    required
                    options={countryOptions}
                    control={control}
                  />
                </Box> */}
              </Grid>
              <Grid item xs={12}>
                <TextFieldElement
                  type="text"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="shippingAddress.city"
                  autoComplete="shipping address-level1"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldElement
                  type="text"
                  required
                  fullWidth
                  id="street"
                  name="shippingAddress.street"
                  label="Street"
                  autoComplete="shipping address-line1"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldElement
                  type="text"
                  required
                  fullWidth
                  id="postal"
                  name="shippingAddress.postalCode"
                  label="Postal code"
                  autoComplete="shipping postal-code"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <CheckboxElement label="Set as default address" name="defaultAddress" control={control} />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={() => {
                    setBilling(!showBilling);
                  }}
                  label="My billing address is not the same as my shipping address."
                />
              </Grid>
              {showBilling && (
                <>
                  <Grid item xs={12}>
                    <h4>Billing address</h4>
                    <Box sx={{ minWidth: 120 }}>
                      {/* <SelectElement
                        fullWidth
                        name="CountryBilling"
                        label="Country"
                        required
                        options={countryOptions}
                        control={control}
                      /> */}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldElement
                      type="text"
                      required
                      fullWidth
                      id="cityBilling"
                      label="City"
                      name="billingAddress.city"
                      autoComplete="billing address-level1"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldElement
                      type="text"
                      required
                      fullWidth
                      id="streetBilling"
                      name="billingAddress.street"
                      label="Street"
                      autoComplete="billing address-line1"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldElement
                      type="text"
                      required
                      fullWidth
                      id="postal"
                      name="billingAddress.postalCode"
                      label="Postal code"
                      autoComplete="billing postal-code"
                      control={control}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <h4>Email & Password</h4>
                <TextFieldElement
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordElement
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  control={control}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
