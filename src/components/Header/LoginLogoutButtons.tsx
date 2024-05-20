import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoutePaths } from '../../shared/types/enum';
import useCustomerAuth from '../../api/hooks/useCustomerAuth';
import { RootState } from '../../shared/store';

const LoginLogoutButtons = () => {
  const isAuthCustomer = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const { customerLogOut } = useCustomerAuth();

  return !isAuthCustomer ? (
    <Box>
      <Button variant="contained" sx={{ mr: 1, ml: 1 }} onClick={() => navigate(RoutePaths.LOGIN)}>
        Login
      </Button>

      <Button variant="contained" sx={{ mr: 1, ml: 1 }} onClick={() => navigate(RoutePaths.REGISTRATION)}>
        Register
      </Button>
    </Box>
  ) : (
    <Box>
      <Button
        variant="contained"
        sx={{ mr: 1, ml: 1 }}
        onClick={() => {
          customerLogOut();
          navigate(RoutePaths.MAIN);
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default LoginLogoutButtons;
