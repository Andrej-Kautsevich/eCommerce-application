import { Typography } from '@mui/material';
import PageTitle from '../components/PageTitle';
import MainLayout from '../shared/ui/MainLayout';

const BasketPage = () => {
  return (
    <MainLayout>
      <PageTitle>
        <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
          Your Cart
        </Typography>
      </PageTitle>
    </MainLayout>
  );
};

export default BasketPage;
