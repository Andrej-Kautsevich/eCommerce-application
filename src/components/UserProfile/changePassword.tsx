import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
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
import { useTranslation } from 'react-i18next';
import schemaPass from '../../shared/validation/passValidation';
import { useApiClient, useCustomer } from '../../api/hooks';
import tokenCache from '../../shared/utils/tokenCache';
import { useAppDispatch } from '../../shared/store/hooks';
import { setCustomer } from '../../shared/store/auth/customerSlice';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

interface ChangePasswordProps {
  customer: Customer;
}

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePassword = ({ customer }: ChangePasswordProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    currentPassword: schemaPass,
    newPassword: schemaPass,
    repeatNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), undefined], t('Passwords must match'))
      .required(t('Repeat Password is required')),
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
        setLoading(true);
        const response = await changePassword(changePasswordData).catch(
          (error: ClientResponse<InvalidCurrentPasswordError>) => {
            enqueueSnackbar(error.body.message, { variant: 'error' });
          },
        );
        if (response) {
          tokenCache.remove();
          const newCustomer = (await setPasswordFlow({ email: customer.email, password: data.newPassword })).body;
          dispatch(setCustomer(newCustomer));
          enqueueSnackbar(getSnackbarMessage(SnackbarMessages.PASSWORD_CHANGE_SUCCESS, t), { variant: 'success' });
          reset({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
          });
        }
      } catch (e) {
        const error = e as ClientResponse<ErrorObject>;
        enqueueSnackbar(error.body.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" color="text.primary">
        {t('Change Password')}:
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <PasswordElement
          margin="normal"
          required
          fullWidth
          name="currentPassword"
          label={t('Current Password')}
          id="currentPassword"
          autoComplete="new-password"
          control={control}
        />
        <TextFieldElement
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('New Password')}
          name="newPassword"
          autoComplete="new-password"
          control={control}
        />
        <TextFieldElement
          margin="normal"
          required
          fullWidth
          id="repeatNewPassword"
          label={t('Repeat New Password')}
          name="repeatNewPassword"
          autoComplete="email"
          control={control}
        />
        <LoadingButton loading={loading} type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          <span>{t('Save new password')}</span>
        </LoadingButton>
        {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
      </Box>
    </Box>
  );
};

export default ChangePassword;
