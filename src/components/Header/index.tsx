import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import LoginLogoutButtons from './LoginLogoutButtons';
import HeaderLink from '../../shared/ui/HeaderLink';
import { RoutePaths } from '../../shared/types/enum';
import BasketButton from './BasketButton';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeButton from './ThemeButton';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 0 }} color="transparent" enableColorOnDark>
      <Toolbar sx={{ pl: { xs: 2, sm: 0, md: 0 }, pr: { xs: 2, sm: 0, md: 0 } }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontFamily="Orbitron">
          <Link component={RouterLink} to={RoutePaths.MAIN} underline="none" color="text.primary">
            Volcano Watch
          </Link>
        </Typography>
        {/* Mobile view */}
        <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
          <IconButton onClick={handleDrawerToggle} size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
            <Box
              sx={{ minWidth: '60dvw', p: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
            >
              <HeaderLink component={RouterLink} underline="none" to={RoutePaths.WATCHES}>
                Watches
              </HeaderLink>
              <HeaderLink component={RouterLink} underline="none" to={RoutePaths.ABOUT}>
                About Us
              </HeaderLink>

              <LoginLogoutButtons />
              <BasketButton />
              <ThemeButton />
            </Box>
          </Drawer>
        </Box>

        {/* Desktop view */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { xs: 1, sm: 1, md: 5 } }}>
          <HeaderLink component={RouterLink} underline="none" to={RoutePaths.WATCHES}>
            Watches
          </HeaderLink>
          <HeaderLink component={RouterLink} underline="none" to={RoutePaths.ABOUT}>
            About Us
          </HeaderLink>
          <LoginLogoutButtons />
          <BasketButton />
          <ThemeButton />
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
