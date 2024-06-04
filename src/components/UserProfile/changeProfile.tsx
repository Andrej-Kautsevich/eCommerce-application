import { useState } from 'react';
import { Alert, AlertTitle, Box, Button, Slide, Snackbar, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import {
  ClientResponse,
  Customer,
  InvalidCurrentPasswordError,
  MyCustomerChangePassword,
} from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import * as yup from 'yup';
import schemaPass from '../../shared/validation/passValidation';
import { useApiClient, useCustomer } from '../../api/hooks';
import tokenCache from '../../shared/utils/tokenCache';
import { useAppDispatch } from '../../shared/store/hooks';
import { setCustomer } from '../../shared/store/auth/customerSlice';

interface ChangePasswordProps {
  customer: Customer;
}

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePassword = ({ customer }: ChangePasswordProps) => {
  const dispatch = useAppDispatch();

  const [showAlert, setShowAlert] = useState(false); // Close error alert
  const [success, setSuccess] = useState(false);
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

  const { control, handleSubmit, reset } = useForm<ChangePasswordForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { changePassword } = useCustomer();
  const { setPasswordFlow } = useApiClient();

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
            setShowAlert(true);
          },
        );
        if (response) {
          tokenCache.remove();
          const newCustomer = (await setPasswordFlow({ email: customer.email, password: data.newPassword })).body;
          dispatch(setCustomer(newCustomer));
          setSuccess(true);
          reset({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
          });
        }
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
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Save new password
        </Button>
        {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
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
      {success && (
        <Slide in={success} direction="right">
          <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
            <Alert sx={{ width: '100%' }} severity="success" onClose={() => setSuccess(false)}>
              <AlertTitle>Success!</AlertTitle>
              Password has been successfully changed.
            </Alert>
          </Snackbar>
        </Slide>
      )}
    </Box>
  );
};

export default ChangePassword;
