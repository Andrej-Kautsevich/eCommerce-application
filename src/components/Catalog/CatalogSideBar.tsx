import { useEffect } from 'react';
import { List, Toolbar } from '@mui/material';
import useProduct from '../../api/hooks/useProduct';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import CatalogFilterPanel from './CatalogFilterPanel';

const CatalogSideBar = () => {
  const { getAttributes } = useProduct();
  const dispatch = useAppDispatch();

  const { attributes } = useAppSelector((state) => state.products);

  useEffect(() => {
    // eslint-disable-next-line no-console
    if (!attributes.length) getAttributes().catch((error) => console.log(error));
  }, [attributes, dispatch, getAttributes]);

  return (
    <Toolbar>
      <List sx={{ width: '100%' }} component="ul">
        {attributes.map((attribute) => (
          <CatalogFilterPanel attribute={attribute} />
        ))}
      </List>
    </Toolbar>
  );
};

export default CatalogSideBar;
