import { useNavigate } from 'react-router-dom';

const useProductPageBtn = () => {
  const navigate = useNavigate();

  async function productPageBtn(key: string) {
    navigate(`/${key}`);
  }

  return productPageBtn;
};

export default useProductPageBtn;
