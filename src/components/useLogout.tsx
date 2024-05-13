import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from './context';
import Routes from '../shared/types/enum';

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext) as AuthContextType;

  const logout = () => {
    setIsAuth(false);
    navigate(Routes.MAIN);
  };

  return logout;
};

export default useLogout;
