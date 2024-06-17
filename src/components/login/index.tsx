import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { AuthErrorResponse, ClientResponse, MyCustomerSignin } from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import schemaEmail from '../../shared/validation/emailValidation';
import schemaPass from '../../shared/validation/passValidation';
import { useCustomerAuth } from '../../api/hooks';
import { SnackbarMessages, RoutePaths } from '../../shared/types/enum';
import useCart from '../../api/hooks/useCart';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

type LoginForm = {
  email: string;
  password: string;
};
export default function LoginTab() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    email: schemaEmail,
    password: schemaPass,
  });

  const navigate = useNavigate();
  const { customerLogin } = useCustomerAuth();
  const { fetchCart } = useCart();

  const { control, handleSubmit } = useForm<LoginForm>({ mode: 'onChange', resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const customer: MyCustomerSignin = {
      email: data.email,
      password: data.password,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
    };

    try {
      const response = await customerLogin(customer);
      navigate(RoutePaths.MAIN);
      const greetingMessage = `Welcome back, ${response.body.customer.firstName}`;
      enqueueSnackbar(greetingMessage, { variant: 'success' });
      fetchCart().catch(() => {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.CART_FETCH_ERROR, t), { variant: 'error' });
      });
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      enqueueSnackbar(error.body.message, { variant: 'error' });
    }
  };

  return (
    <Container
      maxWidth="sm"
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
        {t('Sign in')}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextFieldElement
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('Email Address')}
          name="email"
          autoComplete="email"
          autoFocus
          control={control}
        />
        <PasswordElement
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('Password')}
          id="password"
          autoComplete="new-password"
          control={control}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          {t('Sign In')}
        </Button>
        <Typography sx={{ color: 'text.primary' }}>
          {t('Don’t have an account ')},{'? '}
          <Box
            component={Link}
            to={RoutePaths.REGISTRATION}
            sx={{ textDecoration: 'none', mr: 1, ml: 1, color: 'primary.main' }}
          >
            {t('Create one')}
          </Box>
        </Typography>
        {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
      </Box>
    </Container>
  );
}
