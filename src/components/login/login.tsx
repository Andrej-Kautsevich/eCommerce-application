import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import schemaEmail from '../validation/emailValidation';
import schemaPass from '../validation/passValidation';
import Header from '../Header';

export default function LoginTab() {
  const [passwordVisibility, setPasswordVisibility] = useState('password');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const schemas = {
    email: schemaEmail,
    password: schemaPass,
  };
  type SchemaKeys = 'email' | 'password';
  function validateField(name: SchemaKeys, value: string) {
    schemas[name]
      .validate(value)
      .then(() => setErrors((prev) => ({ ...prev, [name]: '' })))
      .catch((error: Error) => setErrors((prev) => ({ ...prev, [name]: error.message })));
  }

  return (
    <div className="top-panel">
      {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create Account
        </Button> */}
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Box component="form" style={{ width: '320px' }} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => validateField('email', e.target.value)}
            />
            <h4
              style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', color: 'red' }}
              className="error-message-displaying"
            >
              {errors.email}
            </h4>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={passwordVisibility}
              id="password"
              autoComplete="current-password"
              onChange={(e) => validateField('password', e.target.value)}
            />
            <h4
              style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', color: 'red' }}
              className="error-message-displaying"
            >
              {errors.password}
            </h4>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => {
                    if (passwordVisibility === 'password') {
                      setPasswordVisibility('text');
                    } else {
                      setPasswordVisibility('password');
                    }
                  }}
                  value="remember"
                  color="primary"
                />
              }
              label="Show Password"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
