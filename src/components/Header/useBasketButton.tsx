import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../shared/types/enum';

const useBasketButton = () => {
  const navigate = useNavigate();

  const basketButton = () => {
    navigate(RoutePaths.BASKET);
  };

  return basketButton;
};

export default useBasketButton;
