import { useEffect } from 'react';
import { Button } from '@mui/material';
import useProduct from '../../api/hooks/useProduct';
import { useAppSelector } from '../../shared/store/hooks';

const CatalogSideBar = () => {
  const { getCategories } = useProduct();

  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories();
    };
    if (!categories.length) {
      // eslint-disable-next-line no-console
      fetchCategories().catch((error) => console.log(error));
    }
  });

  return <Button variant="contained">Get Categories</Button>;
};

export default CatalogSideBar;
