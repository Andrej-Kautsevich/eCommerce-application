import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../shared/types/enum';

const useProductPageBtn = () => {
  const navigate = useNavigate();

  async function productPageBtn(key: string) {
    navigate(`${RoutePaths.PRODUCT}/${key}`);
  }

  return productPageBtn;
};

export default useProductPageBtn;
