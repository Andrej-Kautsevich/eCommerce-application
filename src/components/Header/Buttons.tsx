import { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../context';
import useLogout from '../useLogout';
import Routes from '../../shared/types/enum';

const Buttons = () => {
  const { isAuth } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const logout = useLogout();

  return !isAuth ? (
    <Box>
      <Button color="inherit" onClick={() => navigate(Routes.LOGIN)}>
        Login
      </Button>

      <Button color="inherit" onClick={() => navigate(Routes.REGISTRATION)}>
        Register
      </Button>
    </Box>
  ) : (
    <Box>
      <Button color="inherit" onClick={() => logout()}>
        Logout
      </Button>
    </Box>
  );
};

export default Buttons;
