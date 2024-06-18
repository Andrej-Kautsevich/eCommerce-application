import useCustomer from './useCustomer';

const usePromoCode = () => {
  const { getPromoCodes } = useCustomer();

  const fetchPromoCodes = async () => {
    try {
      const response = await getPromoCodes();
      // eslint-disable-next-line no-console
      console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching promo codes:', error);
    }
  };
  return { fetchPromoCodes };
};
export default usePromoCode;
