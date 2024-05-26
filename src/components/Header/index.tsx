import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LoginLogoutButtons from './LoginLogoutButtons';
import useBasketButton from './useBasketButton';

const Header = () => {
  const basketButton = useBasketButton();

  return (
    <AppBar position="static" sx={{ width: '100vw', pr: 8, pl: 8 }} color="secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontFamily="Orbitron">
          <Link to="/">Volcano Watch</Link>
        </Typography>

        <LoginLogoutButtons />

        <IconButton color="inherit" onClick={() => basketButton()}>
          <ShoppingBasket color="primary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
