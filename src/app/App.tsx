import '../shared/ui/main.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider, useSnackbar } from 'notistack';
import '../shared/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../shared/store/hooks';
import AppRoutes from '../shared/router/AppRoutes';
import tokenCache from '../shared/utils/tokenCache';
import { useApiClient } from '../api/hooks';
import useProduct from '../api/hooks/useProduct';
import useCart from '../api/hooks/useCart';
import { SnackbarMessages } from '../shared/types/enum';
import getSnackbarMessage from '../shared/utils/getSnackbarMessage';
import ColorModeProvider from '../shared/utils/theme/colorModeProvider';

const App = () => {
  const isAuthCustomer = useAppSelector((state) => state.auth.isLoggedIn);
  const { categories } = useAppSelector((state) => state.products);
  const { apiRoot, setAnonymousFlow, setTokenFlow } = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const { getCategories } = useProduct();
  const { fetchCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (!apiRoot) {
      const refreshToken = tokenCache.get().token;

      // if user has authorization
      // TODO handle anonymous refresh token
      if (isAuthCustomer && refreshToken) {
        setTokenFlow(refreshToken);
      } else {
        setAnonymousFlow();
      }
    } else {
      setIsLoading(false);
    }

    if (!isLoading) {
      const fetchCategories = async () => {
        await getCategories();
      };

      if (!categories.length) {
        fetchCategories().catch(() =>
          enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' }),
        );
      }
      fetchCart().catch(() => {
        enqueueSnackbar(getSnackbarMessage(SnackbarMessages.GENERAL_ERROR, t), { variant: 'error' });
      });
    }
  }, [
    apiRoot,
    setAnonymousFlow,
    setTokenFlow,
    isAuthCustomer,
    categories.length,
    getCategories,
    isLoading,
    fetchCart,
    enqueueSnackbar,
    t,
  ]);

  if (isLoading) {
    return <div>Loading...</div>; // TODO add loading spinner
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <CssBaseline />
      <ColorModeProvider>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SnackbarProvider>
      </ColorModeProvider>
    </LocalizationProvider>
  );
};

export default App;
