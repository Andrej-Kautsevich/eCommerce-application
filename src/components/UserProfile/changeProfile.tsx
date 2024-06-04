// import { Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { Alert, AlertTitle, Box, Button, Slide, Snackbar, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { ClientResponse, InvalidCurrentPasswordError, MyCustomerChangePassword } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import * as yup from 'yup';
import schemaPass from '../../shared/validation/passValidation';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { useCustomer } from '../../api/hooks';
import { setCustomer } from '../../shared/store/auth/customerSlice';

// interface ChangePasswordProps {
//   customer: Customer;
// }

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePassword = (/* { customer }: ChangePasswordProps */) => {
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

  const schema = yup.object().shape({
    currentPassword: schemaPass,
    newPassword: schemaPass,
    repeatNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
      .required('Repeat Password is required'),
  });

  const { control, handleSubmit } = useForm<ChangePasswordForm>({ mode: 'onChange', resolver: yupResolver(schema) });

  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customer);
  const { changePassword } = useCustomer();

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    if (customer) {
      const changePasswordData: MyCustomerChangePassword = {
        version: customer.version,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      try {
        const response = await changePassword(changePasswordData).catch(
          (error: ClientResponse<InvalidCurrentPasswordError>) => {
            setChangeError(error.body.message);
          },
        );
        if (response) dispatch(setCustomer(response.body));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5">Change Password:</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <PasswordElement
          margin="normal"
          required
          fullWidth
          name="currentPassword"
          label="Current Password"
          id="currentPassword"
          autoComplete="new-password"
          control={control}
        />
        <TextFieldElement
          margin="normal"
          required
          fullWidth
          id="email"
          label="New Password"
          name="newPassword"
          autoComplete="new-password"
          control={control}
        />
        <TextFieldElement
          margin="normal"
          required
          fullWidth
          id="repeatNewPassword"
          label="Repeat New Password"
          name="repeatNewPassword"
          autoComplete="email"
          control={control}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Save new password
        </Button>
        {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
      </Box>
      {changeError && (
        <Slide in={showAlert} direction="right">
          <Snackbar open={showAlert} autoHideDuration={2000} onClose={handleSnackBarClose}>
            <Alert sx={{ width: '100%' }} severity="success" onClose={handleSnackBarClose}>
              <AlertTitle>Error!</AlertTitle>
              {changeError}
            </Alert>
          </Snackbar>
        </Slide>
      )}
    </Box>
  );
};

export default ChangePassword;
