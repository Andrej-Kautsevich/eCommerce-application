import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';
import PageTitle from '../components/PageTitle';
import MainLayout from '../shared/ui/MainLayout';
import { useCustomer } from '../api/hooks';
import CartItem from '../components/Cart/CartItem';

const BasketPage = () => {
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  const { getCart } = useCustomer();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await getCart();
      setCart(response.body.results[0]);
    };

    // eslint-disable-next-line no-console
    fetchCart().catch((error) => console.error('error fetching cart: ', error));

    // try {
    //   getCart()
    //     .then((res) => setCart(res.body))
    //     // eslint-disable-next-line no-console
    //     .catch((error) => console.log(error));
    // } catch (error) {
    //   throw new Error('error fetching cart');
    // }
  }, [getCart]);

  if (!cart || !cart.lineItems)
    return (
      <MainLayout>
        <PageTitle>
          <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
            Your Cart
          </Typography>
        </PageTitle>
      </MainLayout>
    );

  return (
    <MainLayout>
      <PageTitle>
        <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
          Your Cart
        </Typography>
      </PageTitle>
      {cart.lineItems.map((item) => (
        <CartItem item={item} />
      ))}
    </MainLayout>
  );
};

export default BasketPage;
