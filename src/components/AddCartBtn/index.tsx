import { ShoppingCartOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function AddCartBtn() {
  return (
    <Button variant="contained" size="medium">
      Add to Cart
      <ShoppingCartOutlined fontSize="medium" sx={{ color: 'primary.contrastText', ml: 1 }} />
    </Button>
  );
}
