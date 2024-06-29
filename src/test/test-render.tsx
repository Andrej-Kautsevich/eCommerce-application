import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store from '../shared/store';
import ApiClientProvider from '../api/ApiClientProvider';
import createTestStore from './test-store';

interface WrapperProps {
  children: ReactNode;
}

interface CustomRenderOptions extends RenderOptions {
  initialState?: Record<string, unknown>;
}

const customRender = (
  ui: React.ReactElement,
  { initialState, ...renderOptions }: CustomRenderOptions = {},
): RenderResult => {
  const Wrapper: FC<WrapperProps> = ({ children }) => {
    const testStore = createTestStore(initialState);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <SnackbarProvider maxSnack={3}>
          <Provider store={initialState ? testStore : store}>
            <ApiClientProvider>{children}</ApiClientProvider>
          </Provider>
        </SnackbarProvider>
      </LocalizationProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default customRender;
