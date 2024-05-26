import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Box, Drawer } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import LoginLogoutButtons from './LoginLogoutButtons';
import useBasketButton from './useBasketButton';

const Header = () => {
  const basketButton = useBasketButton();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 0 }} color="secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontFamily="Orbitron">
          <Link to="/">Volcano Watch</Link>
        </Typography>

        {/* Mobile view */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            onClick={handleDrawerToggle}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
            <Box sx={{ minWidth: '60dvw', p: 2, flexDirection: 'column' }}>
              <MenuItem>
                <LoginLogoutButtons />
              </MenuItem>
            </Box>
          </Drawer>
        </Box>

        {/* Desktop view */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <LoginLogoutButtons />
        </Box>

        <IconButton color="inherit" onClick={() => basketButton()}>
          <ShoppingBasket color="primary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
