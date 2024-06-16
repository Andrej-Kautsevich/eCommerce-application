import { ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import useCart from '../../api/hooks/useCart';
import { useAppSelector } from '../../shared/store/hooks';
import { ProductIDCartBtnProps } from '../../shared/types/interface';

function AddCartBtn({ productID }: ProductIDCartBtnProps) {
  const { addItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();

  const addProduct = () => async () => {
    if (cart) {
      try {
        await addItem(cart.version, productID);
        await fetchCart();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding item to cart:', error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 3 }}>
      <Button variant="contained" onClick={addProduct()} sx={{ height: '50px', width: 200 }}>
        Add to Cart
        <ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText', ml: 1 }} />
      </Button>
    </Box>
  );
}

export default AddCartBtn;
