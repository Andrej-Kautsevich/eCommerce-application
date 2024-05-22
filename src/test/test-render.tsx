import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store from '../shared/store';
import ApiClientProvider from '../api/ApiClientProvider';

interface WrapperProps {
  children: ReactNode;
}

const customRender = (ui: React.ReactElement, { ...renderOptions }: RenderOptions = {}): RenderResult => {
  const Wrapper: FC<WrapperProps> = ({ children }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <Provider store={store}>
          <ApiClientProvider>{children}</ApiClientProvider>
        </Provider>
      </LocalizationProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default customRender;
