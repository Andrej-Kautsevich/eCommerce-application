import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CartTotalPriceProps {
  totalPrice: CentPrecisionMoney;
}

const CartTotalPrice = ({ totalPrice }: CartTotalPriceProps) => {
  const { t } = useTranslation();

  const { centAmount } = totalPrice;
  const total = `$${centAmount / 100}`;

  return (
    <Typography variant="h5" component="div">
      {t('Total')}
      {': '}
      <Typography variant="h4" component="span">
        {total}
      </Typography>
    </Typography>
  );
};

export default CartTotalPrice;
