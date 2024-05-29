import { useState } from 'react';
import { Alert, AlertTitle, Button, Slide, Snackbar, Typography } from '@mui/material';
import { ProductKey } from '../shared/types/type';
import useProductPageBtn from './ProductPage/productPageBtn';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { setSubmitSuccess } from '../shared/store/auth/authSlice';
import MainLayout from '../shared/ui/MainLayout';

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

  /* --- for test ↓ --- */
  const productPageBtn = useProductPageBtn();
  const productKey: ProductKey = { key: 'CASIO-MTP-1374D-1AVDF' };
  /* --- for test ↑ --- */

  return (
    <MainLayout>
      <Typography gutterBottom variant="h2" component="h1" fontFamily="Orbitron" width="50vw" sx={{ pt: 15, pl: 8 }}>
        Find your dream watch
      </Typography>

      {/* --- for test ↓ --- */}
      <Button variant="contained" sx={{ mr: 1, ml: 8 }} onClick={() => productPageBtn(productKey.key)}>
        product page
      </Button>
      {/* --- for test ↑ --- */}

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
