import { useEffect, useState } from 'react';
import { Button, List, Toolbar } from '@mui/material';
import { FilterListOff } from '@mui/icons-material';
import useProduct from '../../api/hooks/useProduct';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import CatalogFilterPanel from './CatalogFilterPanel';
import { setFilterParams } from '../../shared/store/auth/productsSlice';

const CatalogSideBar = () => {
  const { getAttributes } = useProduct();
  const dispatch = useAppDispatch();
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const { attributes, filterParams } = useAppSelector((state) => state.products);

  useEffect(() => {
    // eslint-disable-next-line no-console
    if (!attributes.length) getAttributes().catch((error) => console.log(error));

    // Disable button if no filterParams is selected
    setIsFilterApplied(
      filterParams.some((filterParam) => {
        const key = Object.keys(filterParam)[0];
        return filterParam[key] !== undefined;
      }),
    );
  }, [attributes, filterParams, dispatch, getAttributes]);

  const handleReset = () => {
    attributes.forEach((attribute) => {
      dispatch(setFilterParams({ [`variants.attributes.${attribute.name}.key`]: undefined }));
    });
  };

  return (
    <Toolbar>
      <List sx={{ width: '100%' }} component="ul">
        {attributes.map((attribute) => (
          <CatalogFilterPanel attribute={attribute} key={attribute.name} />
        ))}
        <Button
          fullWidth
          variant="contained"
          disabled={!isFilterApplied}
          onClick={handleReset}
          endIcon={<FilterListOff />}
        >
          Reset All Filters
        </Button>
      </List>
    </Toolbar>
  );
};

export default CatalogSideBar;
