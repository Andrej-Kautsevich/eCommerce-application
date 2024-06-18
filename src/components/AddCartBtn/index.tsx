import { useState } from 'react';
import { ShoppingCartOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, styled } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import useCart from '../../api/hooks/useCart';
import { useAppSelector } from '../../shared/store/hooks';
import { ProductIDCartBtnProps } from '../../shared/types/interface';
import { SnackbarMessages } from '../../shared/types/enum';
import getSnackbarMessage from '../../shared/utils/getSnackbarMessage';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    size: 'small',
  },
  [theme.breakpoints.up('sm')]: {
    size: 'large',
  },
}));

function AddCartBtn({ productID }: ProductIDCartBtnProps) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const addProduct = () => async () => {
    if (cart) {
      try {
        setLoading(true);
        await addItem(cart.version, productID!);
        await fetchCart();
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_SUCCESS, t), { variant: 'success' });
        setLoading(false);
      } catch (error) {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.ADD_ITEM_FETCH_ERROR, t), { variant: 'error' });
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 3 }}>
      <StyledLoadingButton
        loading={loading}
        fullWidth
        variant="contained"
        onClick={addProduct()}
        loadingPosition="end"
        endIcon={<ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText' }} />}
      >
        <span>{t('Add to Cart')}</span>
      </StyledLoadingButton>
    </Box>
  );
}

export default AddCartBtn;
