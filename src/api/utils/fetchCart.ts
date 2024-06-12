import { useCustomer } from '../hooks';
import useCart from '../hooks/useCart';

const useFetchCart = () => {
  const { getCart } = useCustomer();
  const { createCart } = useCart();

  const fetchCart = async () => {
    const response = await getCart();

    if (response.body.results.length === 0) {
      await createCart();
    }
    // eslint-disable-next-line no-console
    console.log(response.body.results[0].id);
  };

  return fetchCart;
};

export default useFetchCart;
