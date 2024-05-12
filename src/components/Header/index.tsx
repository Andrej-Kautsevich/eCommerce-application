import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Buttons from './Buttons';
import useBasketButton from '../useBasketButton';

const Header = () => {
  const basketButton = useBasketButton();

  return (
    <AppBar position="static" sx={{ width: '100vw', pr: 8, pl: 8 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">eCommerce-Application </Link>
        </Typography>

        <Buttons />

        <IconButton color="inherit" onClick={() => basketButton()}>
          <ShoppingBasket />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
