import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from './context';

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext) as AuthContextType;

  const logout = () => {
    setIsAuth(false);
    navigate('/');
  };

  return logout;
};

export default useLogout;
