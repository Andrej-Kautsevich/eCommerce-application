import { Box, Button, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import {
  ClientResponse,
  Customer,
  ErrorObject,
  InvalidCurrentPasswordError,
  MyCustomerChangePassword,
} from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import schemaPass from '../../shared/validation/passValidation';
import { useApiClient, useCustomer } from '../../api/hooks';
import tokenCache from '../../shared/utils/tokenCache';
import { useAppDispatch } from '../../shared/store/hooks';
import { setCustomer } from '../../shared/store/auth/customerSlice';
import { SnackbarMessages } from '../../shared/types/enum';

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
  const { enqueueSnackbar } = useSnackbar();

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
            enqueueSnackbar(error.body.message, { variant: 'error' });
          },
        );
        if (response) {
          tokenCache.remove();
          const newCustomer = (await setPasswordFlow({ email: customer.email, password: data.newPassword })).body;
          dispatch(setCustomer(newCustomer));
          enqueueSnackbar(SnackbarMessages.PASSWORD_CHANGE_SUCCESS, { variant: 'success' });
          reset({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
          });
        }
      } catch (e) {
        const error = e as ClientResponse<ErrorObject>;
        enqueueSnackbar(error.body.message, { variant: 'error' });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" color="text.primary">
        Change Password:
      </Typography>
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
    </Box>
  );
};

export default ChangePassword;
