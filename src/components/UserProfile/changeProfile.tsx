// import { Customer } from '@commercetools/platform-sdk';
import { Box, Button, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import * as yup from 'yup';
import schemaPass from '../../shared/validation/passValidation';
// import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';

// interface ChangePasswordProps {
//   customer: Customer;
// }

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePassword = (/* { customer }: ChangePasswordProps */) => {
  const schema = yup.object().shape({
    currentPassword: schemaPass,
    newPassword: schemaPass,
    repeatNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
      .required('Repeat Password is required'),
  });

  // const dispatch = useAppDispatch();
  // const { customer } = useAppSelector((state) => state.customer);

  const { control, handleSubmit } = useForm<ChangePasswordForm>({ mode: 'onChange', resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    console.log(data);
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
    </Box>
  );
};

export default ChangePassword;
