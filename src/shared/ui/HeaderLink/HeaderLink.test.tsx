import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import customRender from '../../../test/test-render';
import HeaderLink from '.';
import theme from '../theme';

it('renders without crashing ', () => {
  const { container } = customRender(
    <BrowserRouter>
      <HeaderLink to="/" />
    </BrowserRouter>,
  );

  expect(container.firstChild).toBeInTheDocument();
});

it('applies correct styles at current page', () => {
  customRender(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HeaderLink to="/">Active link</HeaderLink>
      </BrowserRouter>
    </ThemeProvider>,
  );

  const link = screen.getByText('Active link');

  expect(link).toHaveStyle({
    color: theme.palette?.text?.primary,
    fontWeight: 'bold',
    cursor: 'auto',
  });
});
