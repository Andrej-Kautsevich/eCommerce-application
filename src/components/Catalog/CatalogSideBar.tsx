import { useEffect, useState } from 'react';
import { Button, List, Toolbar } from '@mui/material';
import { FilterListOff } from '@mui/icons-material';
import { ClientResponse, ErrorObject } from '@commercetools/platform-sdk';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import useProduct from '../../api/hooks/useProduct';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import CatalogFilterPanel from './CatalogFilterPanel';
import { setFilterParams } from '../../shared/store/auth/productsSlice';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

const CatalogSideBar = () => {
  const { t } = useTranslation();
  const { getAttributes } = useProduct();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const { attributes, filterParams } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!attributes.length)
      getAttributes().catch((e) => {
        // case if error is ClientResponse<ErrorObject>
        if (typeof e === 'object' && e !== null && 'body' in e) {
          const error = e as ClientResponse<ErrorObject>;
          enqueueSnackbar(error.body.message, { variant: 'error' });
        } else {
          enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' });
        }
      });

    // Disable button if no filterParams is selected
    setIsFilterApplied(
      filterParams.some((filterParam) => {
        const key = Object.keys(filterParam)[0];
        return filterParam[key] !== undefined;
      }),
    );
  }, [attributes, filterParams, dispatch, getAttributes, enqueueSnackbar, t]);

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
          {t('Reset All Filters')}
        </Button>
      </List>
    </Toolbar>
  );
};

export default CatalogSideBar;
