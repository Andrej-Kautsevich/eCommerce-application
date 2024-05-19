import { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../context';
import useLogout from '../useLogout';
import RoutePaths from '../../shared/types/enum';

const Buttons = () => {
  const { isAuth } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const logout = useLogout();

  return !isAuth ? (
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
      <Button variant="contained" sx={{ mr: 1, ml: 1 }} onClick={() => logout()}>
        Logout
      </Button>
    </Box>
  );
};

export default Buttons;
