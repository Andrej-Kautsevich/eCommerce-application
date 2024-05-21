import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, Slide, Typography } from '@mui/material';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { setSubmitSuccess } from '../shared/store/auth/authSlice';

const MainPage = () => {
  const { submitSuccess } = useAppSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(true); // Close error alert
  const dispatch = useAppDispatch();

  // Automatically close the alert after 2 seconds
  // TODO add animation on close icon
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      dispatch(setSubmitSuccess({ status: false }));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Box width="100vw" className="main-wrapper">
        <Typography gutterBottom variant="h2" component="h1" fontFamily="Orbitron" width="50vw" sx={{ pt: 15, pl: 8 }}>
          Find your dream watch
        </Typography>

        {submitSuccess.status && (
          <Slide in={showAlert} mountOnEnter unmountOnExit direction="right">
            <Alert
              sx={{ position: 'absolute', zIndex: 'tooltip', left: '10%', bottom: '10%' }}
              severity="success"
              onClose={() => {
                setShowAlert(false);
                dispatch(setSubmitSuccess({ status: false }));
              }}
            >
              <AlertTitle>Success!</AlertTitle>
              {submitSuccess.message}
            </Alert>
          </Slide>
        )}
      </Box>
    </div>
  );
};

export default MainPage;
