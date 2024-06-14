import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';

const CartRemoveAllItems = () => {
  return (
    <Button variant="outlined" endIcon={<Delete />}>
      Remove all
    </Button>
  );
};

export default CartRemoveAllItems;
