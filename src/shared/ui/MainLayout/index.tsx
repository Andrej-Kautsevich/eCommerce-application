import { FC, ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import Header from '../../../components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mb: 3 }}>
      <Header />
      <Box component="main">{children}</Box>
    </Container>
  );
};

export default MainLayout;
