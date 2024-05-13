import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import Error404 from '../shared/assets/icons/404.svg';
import Routes from '../shared/types/enum';

const Error404Page = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper-404">
      <Typography variant="h3" component="h6" sx={{ flexGrow: 1 }}>
        Oops, Something Went Wrong
      </Typography>
      <img src={Error404} alt="Error 404" />;
      <Button variant="contained" onClick={() => navigate(Routes.MAIN)}>
        Return to Homepage
      </Button>
    </div>
  );
};

export default Error404Page;
