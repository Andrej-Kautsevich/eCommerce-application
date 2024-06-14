import { LineItem } from '@commercetools/platform-sdk';
import { Divider, List } from '@mui/material';
import CartItem from './CartItem/CartItem';

interface CartItemProps {
  items: LineItem[];
}

const CartItems = ({ items }: CartItemProps) => {
  return (
    <List component="ul">
      {items.map((item, index) => (
        <>
          {index !== 0 && <Divider component="li" />}
          <CartItem item={item} />
        </>
      ))}
    </List>
  );
};

export default CartItems;
