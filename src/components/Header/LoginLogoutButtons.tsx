import { Button, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoutePaths } from '../../shared/types/enum';
import useCustomerAuth from '../../api/hooks/useCustomerAuth';
import { RootState } from '../../shared/store';

const style = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'center',
  justifyContent: 'center',
  gap: { xs: 3, sm: 0, md: 0 },
};

const LoginLogoutButtons = () => {
  const isAuthCustomer = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const { customerLogOut } = useCustomerAuth();

  return !isAuthCustomer ? (
    <Box sx={style}>
      <Button
        variant="contained"
        sx={{ mr: 1, fontSize: { xs: 16, sm: 12, md: 16 } }}
        onClick={() => navigate(RoutePaths.LOGIN)}
      >
        Login
      </Button>

      <Button
        variant="contained"
        sx={{ fontSize: { xs: 16, sm: 12, md: 16 } }}
        onClick={() => navigate(RoutePaths.REGISTRATION)}
      >
        Register
      </Button>
    </Box>
  ) : (
    <Box sx={style}>
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
      <AccountCircleIcon
        fontSize="large"
        color="primary"
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(RoutePaths.PROFILE)}
      />
    </Box>
  );
};

export default LoginLogoutButtons;
