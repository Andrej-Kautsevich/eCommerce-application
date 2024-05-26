import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import LoginLogoutButtons from './LoginLogoutButtons';
import useBasketButton from './useBasketButton';
import HeaderLink from '../../shared/ui/HeaderLink';
import { RoutePaths } from '../../shared/types/enum';

const Header = () => {
  const basketButton = useBasketButton();

  return (
    <AppBar position="static" sx={{ width: '100vw', pr: 8, pl: 8 }} color="secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontFamily="Orbitron">
          <Link component={RouterLink} to={RoutePaths.MAIN} underline="none" color="text.primary">
            Volcano Watch
          </Link>
        </Typography>
        <HeaderLink linkVariant="active" underline="none" href="/">
          Watches
        </HeaderLink>
        <HeaderLink underline="none" sx={{ ml: 1 }}>
          Accessories
        </HeaderLink>

        <LoginLogoutButtons />

        <IconButton color="inherit" onClick={() => basketButton()}>
          <ShoppingBasket color="primary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
