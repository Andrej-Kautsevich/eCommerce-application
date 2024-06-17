import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Error404 from '../shared/assets/icons/404.svg';
import { RoutePaths } from '../shared/types/enum';

const Error404Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box component="main" display="flex" flexDirection="column" gap={3} alignItems="center" pt={1}>
      <Typography variant="h3" component="h6" textAlign="center" sx={{ flexGrow: 1 }}>
        {t('Oops, Something Went Wrong')}
      </Typography>
      <img src={Error404} alt="Error 404" />;
      <Button variant="contained" onClick={() => navigate(RoutePaths.MAIN)}>
        {t('Return to Homepage')}
      </Button>
    </Box>
  );
};

export default Error404Page;
