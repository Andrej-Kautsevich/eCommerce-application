import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import LoginLogoutButtons from './LoginLogoutButtons';
import useBasketButton from './useBasketButton';
import HeaderLink from '../../shared/ui/HeaderLink';

const Header = () => {
  const basketButton = useBasketButton();

  return (
    <AppBar position="static" sx={{ width: '100vw', pr: 8, pl: 8 }} color="secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontFamily="Orbitron">
          <RouterLink to="/">Volcano Watch</RouterLink>
        </Typography>
        <HeaderLink underline="none">Watches</HeaderLink>
        <Link component={RouterLink} to="/">
          Watches
        </Link>

        <LoginLogoutButtons />

        <IconButton color="inherit" onClick={() => basketButton()}>
          <ShoppingBasket color="primary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
