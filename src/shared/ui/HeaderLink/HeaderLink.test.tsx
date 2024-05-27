import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import customRender from '../../../test/test-render';
import HeaderLink from '.';
import theme from '../theme';

it('renders without crashing ', () => {
  const { container } = customRender(<HeaderLink />);

  expect(container.firstChild).toBeInTheDocument();
});

it('applies correct styles when linkVariant is active', () => {
  customRender(
    <ThemeProvider theme={theme}>
      <HeaderLink state="active">Active link</HeaderLink>
    </ThemeProvider>,
  );

  const link = screen.getByText('Active link');

  expect(link).toHaveStyle({
    color: theme.palette?.text?.primary,
    fontWeight: 'bold',
    cursor: 'auto',
  });
});
