import { useState } from 'react';
import { Alert, AlertTitle, Box, Slide, Snackbar, Typography } from '@mui/material';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { setSubmitSuccess } from '../shared/store/auth/authSlice';
import CatalogPage from './CatalogPage';

const MainPage = () => {
  const { submitSuccess } = useAppSelector((state) => state.auth);
  const [openSnackBar, setOpenSnackBar] = useState(true); // Close error alert
  const dispatch = useAppDispatch();

  const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
    dispatch(setSubmitSuccess({ status: false }));
  };

  return (
    <div>
      <Header />
      <CatalogPage />
      <Box width="100vw" className="main-wrapper">
        <Typography gutterBottom variant="h2" component="h1" fontFamily="Orbitron" width="50vw" sx={{ pt: 15, pl: 8 }}>
          Find your dream watch
        </Typography>

        {submitSuccess.status && (
          <Slide in={openSnackBar} direction="right">
            <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleSnackBarClose}>
              <Alert sx={{ width: '100%' }} severity="success" onClose={handleSnackBarClose}>
                <AlertTitle>Success!</AlertTitle>
                {submitSuccess.message}
              </Alert>
            </Snackbar>
          </Slide>
        )}
      </Box>
    </div>
  );
};

export default MainPage;
