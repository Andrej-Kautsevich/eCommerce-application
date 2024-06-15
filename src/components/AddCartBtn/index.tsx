import { useLocation } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useCustomer } from '../../api/hooks';
import useCart from '../../api/hooks/useCart';
import { useAppDispatch } from '../../shared/store/hooks';
import {
  setCartUpdate,
  setCurrencyProductCount,
  setProductList,
  setTotalProducts,
} from '../../shared/store/auth/cartSlice';
import { Status } from '../../shared/types/enum';

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
          productId: item.productId,
          quantity: item.quantity,
        }));
        dispatch(setProductList(itemList));
        for (let i = 0; i < itemList.length; i += 1) {
          if (itemList[i].productId === productID) {
            dispatch(setCurrencyProductCount(itemList[i].quantity));
          }
        }
        dispatch(setCartUpdate({ status: true, message: Status.ADD }));
      };
      // eslint-disable-next-line no-console
      fetchAddItem().catch((error) => console.log(error));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Button variant="contained" onClick={addProduct(productID)} sx={{ mb: 3, height: '50px', width: 200 }}>
      Add to Cart
      <ShoppingCartOutlined fontSize="large" sx={{ color: 'primary.contrastText', ml: 1 }} />
    </Button>
  );
}
