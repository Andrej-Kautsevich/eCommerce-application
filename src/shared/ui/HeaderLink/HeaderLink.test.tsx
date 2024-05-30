import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import customRender from '../../../test/test-render';
import HeaderLink from '.';
import theme from '../theme';

it('renders without crashing ', () => {
  const { container } = customRender(<HeaderLink to="/" />);

  expect(container.firstChild).toBeInTheDocument();
});

it('applies correct styles at current page', () => {
  customRender(
    <ThemeProvider theme={theme}>
      <HeaderLink page="active" to="/">
        Active link
      </HeaderLink>
    </ThemeProvider>,
  );

  const link = screen.getByText('Active link');

  expect(link).toHaveStyle({
    color: theme.palette?.text?.primary,
    fontWeight: 'bold',
    cursor: 'auto',
  });
});
