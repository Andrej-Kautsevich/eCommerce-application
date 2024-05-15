import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const MainPage = () => {
  return (
    <div>
      <Header />
      <Box width="100vw" className="main-wrapper">
        <Typography gutterBottom variant="h2" component="h1" fontFamily="Orbitron" width="50vw" sx={{ pt: 15, pl: 8 }}>
          Find your dream watch
        </Typography>
      </Box>
    </div>
  );
};

export default MainPage;
