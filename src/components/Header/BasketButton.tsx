import { ShoppingBasket } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import LinkRouter from '../../shared/ui/LinkRouter';
import { RoutePaths } from '../../shared/types/enum';
import { useAppSelector } from '../../shared/store/hooks';

const BasketButton = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const itemsInCart = cart?.lineItems.reduce((acc, lineItem) => acc + lineItem.quantity, 0);

  return (
    <LinkRouter to={RoutePaths.BASKET}>
      <IconButton color="inherit" size="large" aria-label="basket">
        <Badge badgeContent={itemsInCart} color="primary">
          <ShoppingBasket color="primary" />
        </Badge>
      </IconButton>
    </LinkRouter>
  );
};

export default BasketButton;
