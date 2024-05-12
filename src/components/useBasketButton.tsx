import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from './context';

const useBasketButton = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext) as AuthContextType;

  const basketButton = () => {
    if (isAuth) {
      navigate('/basket');
    } else {
      navigate('/login');
    }
  };

  return basketButton;
};

export default useBasketButton;
