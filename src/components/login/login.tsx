import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, Slide } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { MyCustomerSignin } from '@commercetools/platform-sdk';
import * as yup from 'yup';
import schemaEmail from '../validation/emailValidation';
import schemaPass from '../validation/passValidation';
import Header from '../Header';
import { useCustomerAuth } from '../../api/hooks';
import { RoutePaths } from '../../shared/types/enum';
import { useAppSelector } from '../../shared/store/hooks';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginTab() {
  const schema = yup.object().shape({
    email: schemaEmail,
    password: schemaPass,
  });

  const [showAlert, setShowAlert] = useState(true); // Close error alert
  const navigate = useNavigate();
  const { customerLogin } = useCustomerAuth();
  const { loginError } = useAppSelector((state) => state.auth);

  const { control, handleSubmit } = useForm<LoginForm>({ mode: 'onChange', resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setShowAlert(true); // reset alert
    const customer: MyCustomerSignin = data;
    const loginSuccessful = await customerLogin(customer);
    if (loginSuccessful) {
      navigate(RoutePaths.MAIN);
    }
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} style={{ width: '320px' }} noValidate sx={{ mt: 1 }}>
            <TextFieldElement
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              label="Password"
              id="password"
              autoComplete="new-password"
              control={control}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {import.meta.env.DEV && <DevTool control={control} />} {/* Include react-hook-form devtool in dev mode */}
          </Box>
        </Box>
        <Box height="116px">
          {loginError && (
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
