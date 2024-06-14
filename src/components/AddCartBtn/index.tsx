import { ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

export default function AddCartBtn() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Button variant="contained" size="medium" sx={{ mb: 1 }}>
        Add to Cart
        <ShoppingCartOutlined fontSize="medium" sx={{ color: 'primary.contrastText', ml: 1 }} />
      </Button>
    </Box>
  );
}
