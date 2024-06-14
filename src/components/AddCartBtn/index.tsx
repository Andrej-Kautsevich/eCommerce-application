import { useLocation } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useCustomer } from '../../api/hooks';
import useCart from '../../api/hooks/useCart';
import { useAppDispatch } from '../../shared/store/hooks';
import { setProductList, setTotalProducts } from '../../shared/store/auth/cartSlice';

export default function AddCartBtn() {
  const { getCart } = useCustomer();
  const { addItem } = useCart();
  const dispatch = useAppDispatch();
  const productID = useLocation().pathname.split('/').slice(2).join();

  const addProduct = (productId: string) => async () => {
    try {
      const response = await getCart();
      const fetchAddItem = async () => {
        await addItem(response.body.results[0].version, productId);
        const updatedCart = await getCart();
        dispatch(setTotalProducts(updatedCart.body.results[0].totalLineItemQuantity));

        const itemList = updatedCart.body.results[0].lineItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }));
        dispatch(setProductList(itemList));
      };
      // eslint-disable-next-line no-console
      fetchAddItem().catch((error) => console.log(error));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Button variant="contained" size="medium" sx={{ mb: 1 }} onClick={addProduct(productID)}>
        Add to Cart
        <ShoppingCartOutlined fontSize="medium" sx={{ color: 'primary.contrastText', ml: 1 }} />
      </Button>
    </Box>
  );
}
