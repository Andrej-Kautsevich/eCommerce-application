import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { CheckboxElement, PasswordElement, SelectElement, TextFieldElement } from 'react-hook-form-mui';
import {
  AuthErrorResponse,
  BaseAddress,
  ClientResponse,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import schemaPass from '../../shared/validation/passValidation';
import schemaEmail from '../../shared/validation/emailValidation';
import schemaName from '../../shared/validation/nameValidation';
import schemaBirthDate from '../../shared/validation/validationBirthDate';
import schemaCity from '../../shared/validation/cityValidation';
import schemaStreet from '../../shared/validation/streetValidation';
import schemaPostalCode from '../../shared/validation/postalCodeValidation';
import { RegistrationForm } from './types';
import { useCustomer, useCustomerAuth } from '../../api/hooks';
import { SnackbarMessages, RoutePaths, StoreCountries } from '../../shared/types/enum';
import schemaPostalCodeBelarus from '../../shared/validation/postalCodeOfCountriesVal/belarusPostalShema';
import schemaPostalCodeKazakhstan from '../../shared/validation/postalCodeOfCountriesVal/kazakhstanPostalSchema';
import schemaPostalCodeUkraine from '../../shared/validation/postalCodeOfCountriesVal/ukrainePostalShema';
import useCart from '../../api/hooks/useCart';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

export default function Registration() {
  const { t } = useTranslation();
  const [showBilling, setBilling] = useState(false);
  // state for getting value from country and set logit validation
  const [countryFieldValue, setCountryFieldValue] = useState('');
  const [countryFieldValueBilling, setCountryFieldValueBilling] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const checkValueForCountry = (nameOfState: string) => {
    if (nameOfState === 'KZ') return schemaPostalCodeKazakhstan;
    if (nameOfState === 'UA') return schemaPostalCodeUkraine;
    if (nameOfState === 'BY') return schemaPostalCodeBelarus;
    return schemaPostalCode;
  };

  let schema = yup.object().shape({
    firstName: schemaName,
    lastName: schemaName.required(t('Last name is required')),
    dateOfBirth: schemaBirthDate,
    shippingAddress: yup.object().shape({
      country: yup.string().oneOf(Object.values(StoreCountries)).required(t('Country is required')),
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
  const navigate = useNavigate();
  const { customerSignUp } = useCustomerAuth();
  const { customerUpdate } = useCustomer();
  const { fetchCart } = useCart();
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

    try {
      setLoading(true);
      const signUpResult = await customerSignUp(customer);
      navigate(RoutePaths.MAIN);
      const greetingMessage = `${t('Welcome')}, ${customer.firstName}!`;
      enqueueSnackbar(greetingMessage, { variant: 'success' });
      const shippingAddressUpdate: MyCustomerAddShippingAddressIdAction = {
        action: 'addShippingAddressId',
        addressId: signUpResult.body.customer.addresses[0].id,
      };
      const billingAddressUpdate: MyCustomerAddBillingAddressIdAction = {
        action: 'addBillingAddressId',
        addressId:
          showBilling && data.billingAddress
            ? signUpResult.body.customer.addresses[1].id
            : signUpResult.body.customer.addresses[0].id,
      };
      customerUpdate(1, [shippingAddressUpdate, billingAddressUpdate]).catch(() => {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' });
      });
      fetchCart().catch(() => {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.CART_FETCH_ERROR, t), { variant: 'error' });
      });
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      enqueueSnackbar(error.body.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = Object.entries(StoreCountries).map(([label, id]) => ({ id, label }));
  const { control, handleSubmit } = useForm<RegistrationForm>({ mode: 'onChange', resolver: yupResolver(schema) });

  return (
    <Container maxWidth="sm">
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
        <Typography component="h1" variant="h5" color="text.primary">
          {t('Sign Up')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t('First Name')}
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
                label={t('Last Name')}
                name="lastName"
                autoComplete="family-name"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePickerElement
                inputProps={{ fullWidth: true, autoComplete: 'bday', id: 'date' }}
                required
                helperText={t('You must be at least 18 years old to visit site')}
                name="dateOfBirth"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" color="text.primary" sx={{ mb: 1 }}>
                {t('Shipping address')}
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <SelectElement
                  fullWidth
                  name="shippingAddress.country"
                  label={t('Country')}
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
                label={t('City')}
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
                label={t('Street')}
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
                label={t('Postal')}
                autoComplete="shipping postal-code"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <CheckboxElement
                label={t('Set as default shipping address')}
                name="defaultShippingAddress"
                control={control}
                labelProps={{ sx: { color: 'text.primary' } }}
              />
              <FormControlLabel
                control={<Checkbox />}
                onChange={() => {
                  setBilling(!showBilling);
                }}
                label={t('My billing address is not the same as my shipping address.')}
                sx={{ color: 'text.primary' }}
              />
            </Grid>
            {showBilling && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" component="div" color="text.primary" sx={{ mb: 1 }}>
                    {t('Billing address')}
                  </Typography>
                  <Box sx={{ minWidth: 120 }}>
                    <SelectElement
                      fullWidth
                      name="billingAddress.country"
                      label={t('Country')}
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
                    label={t('City')}
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
                    label={t('Street')}
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
                    label={t('Postal code')}
                    autoComplete="billing postal-code"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CheckboxElement
                    label={t('Set as default billing address')}
                    name="defaultBillingAddress"
                    control={control}
                    labelProps={{ sx: { color: 'text.primary' } }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography variant="h6" component="div" color="text.primary" sx={{ mb: 1 }}>
                {t('Email & Password')}
              </Typography>
              <TextFieldElement
                required
                fullWidth
                id="email"
                label={t('Email Address')}
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
                label={t('Password')}
                type="password"
                id="password"
                autoComplete="new-password"
                control={control}
              />
            </Grid>
          </Grid>
          <LoadingButton loading={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            <span>{t('Sign Up')}</span>
          </LoadingButton>
          <Typography color="text.primary">
            {t('If you have an account')}
            {', '}
            <Box
              component={Link}
              to={RoutePaths.LOGIN}
              sx={{ textDecoration: 'none', mr: 1, ml: 1, color: 'primary.main' }}
            >
              {t('Login')}
            </Box>
          </Typography>
          {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
        </Box>
      </Box>
    </Container>
  );
}
