import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from './context';
import Routes from '../shared/types/enum';

const useBasketButton = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext) as AuthContextType;

  const basketButton = () => {
    if (isAuth) {
      navigate(Routes.BASKET);
    } else {
      navigate(Routes.LOGIN);
    }
  };

  return basketButton;
};

export default useBasketButton;
