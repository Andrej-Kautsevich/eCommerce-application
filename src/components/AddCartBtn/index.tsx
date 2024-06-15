import { ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import useCart from '../../api/hooks/useCart';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setCartUpdate, setCurrencyProductCount, setProductList } from '../../shared/store/auth/cartSlice';
import { Status } from '../../shared/types/enum';

interface AddCartBtnProps {
  productID: string;
}

export default function AddCartBtn({ productID }: AddCartBtnProps) {
  const { addItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();
  const dispatch = useAppDispatch();

  const addProduct = () => async () => {
    try {
      // const fetchAddItem = async () => {
      await addItem(cart.version, productID);
      await fetchCart();
      const itemList = cart.lineItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
      }));
      dispatch(setProductList(itemList));
      itemList.forEach((item) => {
        if (item.productId === productID) {
          dispatch(setCurrencyProductCount(item.quantity));
        }
      });
      dispatch(setCartUpdate({ status: true, message: Status.ADD }));
      // };
      // eslint-disable-next-line no-console
      // fetchAddItem().catch((error) => console.log(error));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding item to cart:', error);
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
