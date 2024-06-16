import { Button } from '@mui/material';
import useCart from '../../api/hooks/useCart';
import { useAppSelector } from '../../shared/store/hooks';
import { ProductIDCartBtnProps } from '../../shared/types/interface';

function DeleteCartBtn({ itemID, quantity }: ProductIDCartBtnProps) {
  const { changeItemQuantity, deleteItem } = useCart();
  const cart = useAppSelector((state) => state.cart.cart);
  const { fetchCart } = useCart();
  const lessQuantity = quantity! - 1;

  const deleteProduct = () => async () => {
    if (cart) {
      try {
        if (quantity! > 1) {
          await changeItemQuantity(cart.version, itemID!, lessQuantity);
        } else {
          await deleteItem(cart.version, itemID!);
        }

        await fetchCart();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding item to cart:', error);
      }
    }
  };

  return (
    <Button
      variant="contained"
      onClick={deleteProduct()}
      disabled={quantity! < 1}
      sx={{ mb: 3, height: '50px', width: 200 }}
    >
      Remove from Cart
    </Button>
  );
}

export default DeleteCartBtn;
