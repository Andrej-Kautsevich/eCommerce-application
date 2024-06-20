import { FC, ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import Header from '../../../components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box height="100%" minHeight="100vh" sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ pb: 3 }}>
        <Header />
        <Box component="main">{children}</Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
