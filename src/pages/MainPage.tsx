import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const MainPage = () => {
  return (
    <div>
      <Header />
      <Box width="100vw" className="main-wrapper">
        <Typography gutterBottom variant="h2" component="p">
          Find your dream watch
        </Typography>
      </Box>
    </div>
  );
};

export default MainPage;
