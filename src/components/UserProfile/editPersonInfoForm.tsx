import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, Button, Slide, Snackbar, Typography } from '@mui/material';
import { SubmitHandler, TextFieldElement, useForm } from 'react-hook-form-mui';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import * as yup from 'yup';
import {
  MyCustomerChangeEmailAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { EditPersonalInfo } from '../Registration/types';
import schemaName from '../../shared/validation/nameValidation';
import schemaBirthDate from '../../shared/validation/validationBirthDate';
import schemaEmail from '../../shared/validation/emailValidation';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { useCustomer } from '../../api/hooks';
import { setCustomer } from '../../shared/store/auth/customerSlice';

interface EditInfoProps {
  onSuccess: () => void;
}

export default function EditInfo({ onSuccess }: EditInfoProps) {
  const { customer } = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();
  const { customerUpdate } = useCustomer();

  const schema = yup.object().shape({
    firstName: schemaName,
    lastName: schemaName.required('Last name is required'),
    dateOfBirth: schemaBirthDate,
    email: schemaEmail,
  });
  const { control, handleSubmit, reset, setValue } = useForm<EditPersonalInfo>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [showAlert, setShowAlert] = useState(false); // Close error alert
  const [changeError, setChangeError] = useState('');

  const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
    setChangeError('');
  };

  useEffect(() => {
    if (customer) {
      setValue('firstName', customer.firstName!);
      setValue('lastName', customer.lastName!);
      setValue('email', customer.email);
      setValue('dateOfBirth', dayjs(customer.dateOfBirth).format('YYYY-DD-MM') as unknown as Date); // TODO fix type assertion
    }
  }, [customer, setValue]);

  const onSubmit: SubmitHandler<EditPersonalInfo> = async (data) => {
    if (customer) {
      const firstNameAction: MyCustomerSetFirstNameAction = {
        action: 'setFirstName',
        firstName: data.firstName,
      };

      const lastNameAction: MyCustomerSetLastNameAction = {
        action: 'setLastName',
        lastName: data.lastName,
      };

      const dateOfBirthAction: MyCustomerSetDateOfBirthAction = {
        action: 'setDateOfBirth',
        dateOfBirth: data.dateOfBirth.toISOString().slice(0, 10),
      };

      const emailAction: MyCustomerChangeEmailAction = {
        action: 'changeEmail',
        email: data.email,
      };

      const updateAction: MyCustomerUpdateAction[] = [firstNameAction, lastNameAction, dateOfBirthAction, emailAction];

      try {
        const response = await customerUpdate(customer.version, updateAction);

        if (response) {
          dispatch(setCustomer(response.body));
          onSuccess();
          reset({
            firstName: '',
            lastName: '',
            email: '',
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ border: '2px solid #eaecf5', borderRadius: '10px', p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          Change Personal Info
        </Typography>
        <TextFieldElement
          sx={{ mb: 1 }}
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoComplete="given-name"
          value={customer?.firstName}
          control={control}
        />
        <TextFieldElement
          sx={{ mb: 1 }}
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={customer?.lastName}
          control={control}
        />
        <DatePickerElement
          sx={{ mb: 1 }}
          inputProps={{ fullWidth: true, autoComplete: 'bday', id: 'date' }}
          required
          helperText="You must be at least 18 years old to visit site"
          name="dateOfBirth"
          defaultValue={customer?.dateOfBirth ? dayjs(customer.dateOfBirth) : undefined}
          control={control}
        />
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          Email
        </Typography>
        <TextFieldElement
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={customer?.email}
          control={control}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 3 }}>
          Save Changes
        </Button>
      </Box>
      {changeError && (
        <Slide in={showAlert} direction="right">
          <Snackbar open={showAlert} autoHideDuration={2000} onClose={handleSnackBarClose}>
            <Alert sx={{ width: '100%' }} severity="error" onClose={handleSnackBarClose}>
              <AlertTitle>Error!</AlertTitle>
              {changeError}
            </Alert>
          </Snackbar>
        </Slide>
      )}
    </Box>
  );
}
