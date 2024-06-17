import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useTranslation } from 'react-i18next';
import MainLayout from '../shared/ui/MainLayout';
import mainImageBackground from '../shared/assets/images/backgroundMainPage.jpg';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <Grid container sx={{ padding: 0 }}>
        <Grid xs={12} sm={6}>
          <Typography
            gutterBottom
            variant="h2"
            component="h1"
            fontFamily="Orbitron"
            width="100%"
            sx={{ pt: 15, pl: 8 }}
          >
            {t('Find your dream watch')}
          </Typography>
        </Grid>
        <Grid
          minHeight={200}
          xs={12}
          sm={6}
          sx={{
            backgroundImage: `url(${mainImageBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </Grid>
    </MainLayout>
  );
};

export default MainPage;
