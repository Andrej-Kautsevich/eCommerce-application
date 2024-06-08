import { useState } from 'react';
import { Alert, AlertTitle, Slide, Snackbar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { setSubmitSuccess } from '../shared/store/auth/authSlice';
import MainLayout from '../shared/ui/MainLayout';
import mainImageBackground from '../shared/assets/images/backgroundMainPage.jpg';

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
            Find your dream watch
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
    </MainLayout>
  );
};

export default MainPage;
