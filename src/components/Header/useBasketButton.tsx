import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '../../shared/types/enum';
import { RootState } from '../../shared/store';

const useBasketButton = () => {
  const navigate = useNavigate();
  const isAuthCustomer = useSelector((state: RootState) => state.auth.isLoggedIn);

  const basketButton = () => {
    if (isAuthCustomer) {
      navigate(Routes.BASKET);
    } else {
      navigate(Routes.LOGIN);
    }
  };

  return basketButton;
};

export default useBasketButton;
