import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Alert, AlertTitle, Slide } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { CheckboxElement, PasswordElement, SelectElement, TextFieldElement } from 'react-hook-form-mui';
import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';
import schemaPass from '../../shared/validation/passValidation';
import schemaEmail from '../../shared/validation/emailValidation';
import schemaName from '../../shared/validation/nameValidation';
import schemaBirthDate from '../../shared/validation/validationBirthDate';
import schemaCity from '../../shared/validation/cityValidation';
import schemaStreet from '../../shared/validation/streetValidation';
import schemaPostalCode from '../../shared/validation/postalCodeValidation';
import Header from '../Header';
import { RegistrationForm } from './types';
import { useCustomerAuth } from '../../api/hooks';
import { RoutePaths, StoreCountries } from '../../shared/types/enum';
import schemaPostalCodeBelarus from '../../shared/validation/postalCodeOfCountriesVal/belarusPostalShema';
import schemaPostalCodeKazakhstan from '../../shared/validation/postalCodeOfCountriesVal/kazakhstanPostalSchema';
import schemaPostalCodeUkraine from '../../shared/validation/postalCodeOfCountriesVal/ukrainePostalShema';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setSubmitSuccess } from '../../shared/store/auth/authSlice';

export default function Registration() {
  const [showBilling, setBilling] = useState(false);
  // state for getting value from country and set logit validation
  const [countryFieldValue, setCountryFieldValue] = useState('');
  const [countryFieldValueBilling, setCountryFieldValueBilling] = useState('');
  const dispatch = useAppDispatch();

  const checkValueForCountry = (nameOfState: string) => {
    if (nameOfState === 'KZ') return schemaPostalCodeKazakhstan;
    if (nameOfState === 'UA') return schemaPostalCodeUkraine;
    if (nameOfState === 'BY') return schemaPostalCodeBelarus;
    return schemaPostalCode;
  };

  let schema = yup.object().shape({
    firstName: schemaName,
    lastName: schemaName.required('Last name is required'),
    dateOfBirth: schemaBirthDate,
    shippingAddress: yup.object().shape({
      country: yup.string().oneOf(Object.values(StoreCountries)).required('Country is required'),
      city: schemaCity,
      streetName: schemaStreet,
      postalCode: checkValueForCountry(countryFieldValue),
    }),
    defaultShippingAddress: yup.boolean().default(false),
    email: schemaEmail,
    password: schemaPass,
  });

  if (showBilling) {
    schema = schema.shape({
      billingAddress: yup
        .object()
        .shape({
          country: yup.string().oneOf(Object.values(StoreCountries)).required(),
          city: schemaCity,
          streetName: schemaStreet,
          postalCode: checkValueForCountry(countryFieldValueBilling),
        })
        .notRequired(),
      defaultBillingAddress: yup.boolean().default(false),
    });
  }
  const [showAlert, setShowAlert] = useState(false); // Close error alert
  const navigate = useNavigate();
  const { customerSignUp } = useCustomerAuth();
  const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
    const addresses: BaseAddress[] = [data.shippingAddress];
    let defaultBillingAddress;
    let defaultShippingAddress;
    if (data.defaultShippingAddress) {
      defaultShippingAddress = 0;
      if (!showBilling) defaultBillingAddress = 0; // If the billing address is not specified, set the default billing address as the shipping address.
    }
    if (showBilling && data.billingAddress) {
      addresses.push(data.billingAddress);
      if (data.defaultBillingAddress) {
        defaultBillingAddress = 1;
      }
    }

    const customer: MyCustomerDraft = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth.toISOString().slice(0, 10),
      email: data.email,
      password: data.password,
      addresses,
      defaultBillingAddress,
      defaultShippingAddress,
    };

    const signUpResult = await customerSignUp(customer);
    if (signUpResult) {
      navigate(RoutePaths.MAIN);
      dispatch(setSubmitSuccess({ status: true, message: `Welcome, ${customer.firstName}!` }));
    } else {
      setShowAlert(true);
    }
  };

  const countryOptions = Object.entries(StoreCountries).map(([label, id]) => ({ id, label }));
  const { control, handleSubmit } = useForm<RegistrationForm>({ mode: 'onChange', resolver: yupResolver(schema) });
  const { loginError } = useAppSelector((state) => state.auth);

  return (
    <div className="top-panel">
      <Header />
      <Container component="main" maxWidth="xs">
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
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
                  name="dateOfBirth"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  Shipping address
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <SelectElement
                    fullWidth
                    name="shippingAddress.country"
                    label="Country"
                    required
                    options={countryOptions}
                    control={control}
                    onChange={(e: string) => {
                      setCountryFieldValue(e);
                    }}
                  />
                </Box>
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
                  name="shippingAddress.streetName"
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
                <CheckboxElement
                  label="Set as default shipping address"
                  name="defaultShippingAddress"
                  control={control}
                />
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
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                      Billing address
                    </Typography>
                    <Box sx={{ minWidth: 120 }}>
                      <SelectElement
                        fullWidth
                        name="billingAddress.country"
                        label="Country"
                        required
                        options={countryOptions}
                        control={control}
                        onChange={(e: string) => {
                          setCountryFieldValueBilling(e);
                        }}
                      />
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
                      name="billingAddress.streetName"
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
                  <Grid item xs={12}>
                    <CheckboxElement
                      label="Set as default billing address"
                      name="defaultBillingAddress"
                      control={control}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  Email & Password
                </Typography>
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
            <Typography>
              If you have an account,
              <Box
                component={Link}
                to={RoutePaths.LOGIN}
                sx={{ textDecoration: 'none', mr: 1, ml: 1, color: 'primary.main' }}
              >
                Login
              </Box>
            </Typography>
            {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
          </Box>
        </Box>
        <Box height="116px">
          {showAlert && (
            <Slide in={showAlert} mountOnEnter unmountOnExit direction="left">
              <Alert
                severity="error"
                onClose={() => {
                  setShowAlert(false);
                }}
              >
                <AlertTitle>Error</AlertTitle>
                {loginError}
              </Alert>
            </Slide>
          )}
        </Box>
      </Container>
    </div>
  );
}
