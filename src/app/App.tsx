import '../shared/ui/main.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';
import { useAppSelector } from '../shared/store/hooks';
import AppRoutes from '../shared/router/AppRoutes';
import tokenCache from '../shared/utils/tokenCache';
import { useApiClient } from '../api/hooks';
import theme from '../shared/ui/theme';
import useProduct from '../api/hooks/useProduct';
import useCart from '../api/hooks/useCart';

const App = () => {
  const isAuthCustomer = useAppSelector((state) => state.auth.isLoggedIn);
  const { categories } = useAppSelector((state) => state.products);
  const { apiRoot, setAnonymousFlow, setTokenFlow } = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const { getCategories } = useProduct();
  const { fetchCart } = useCart();

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
        // eslint-disable-next-line no-console
        fetchCategories().catch((error) => console.log(error));
      }
      // eslint-disable-next-line no-console
      fetchCart().catch((error) => console.log(error));
    }
  }, [apiRoot, setAnonymousFlow, setTokenFlow, isAuthCustomer, categories.length, getCategories, isLoading, fetchCart]);

  if (isLoading) {
    return <div>Loading...</div>; // TODO add loading spinner
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
