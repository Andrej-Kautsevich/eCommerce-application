import { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../context';
import useLogout from '../useLogout';

const Buttons = () => {
  const { isAuth } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const logout = useLogout();

  return !isAuth ? (
    <Box>
      <Button color="inherit" onClick={() => navigate('/login')}>
        Login
      </Button>

      <Button color="inherit" onClick={() => navigate('/registration')}>
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
