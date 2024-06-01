import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import AppRoutes from './AppRoutes';
import { RoutePaths } from '../types/enum';
import customRender from '../../test/test-render';

it('handle routing between pages', async () => {
  customRender(
    <MemoryRouter initialEntries={[RoutePaths.MAIN]}>
      <AppRoutes />
    </MemoryRouter>,
  );

  const loginLink = screen.getByRole('button', { name: 'Login' });

  await waitFor(() => fireEvent.click(loginLink));

  expect(screen.getByText('Sign in')).toBeInTheDocument();
});

it('display error page', async () => {
  customRender(
    <MemoryRouter initialEntries={['/error']}>
      <AppRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByText('Oops, Something Went Wrong')).toBeInTheDocument();
});

it('renders basket page without crashing', () => {
  const { container } = customRender(
    <MemoryRouter initialEntries={[RoutePaths.BASKET]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(container.firstChild).toBeInTheDocument();
});

it('renders error404 page without crashing', () => {
  const { container } = customRender(
    <MemoryRouter initialEntries={['/error']}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(container.firstChild).toBeInTheDocument();
});

it('renders login page without crashing', () => {
  const { container } = customRender(
    <MemoryRouter initialEntries={[RoutePaths.LOGIN]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(container.firstChild).toBeInTheDocument();
});

it('renders main page without crashing', () => {
  const { container } = customRender(
    <MemoryRouter initialEntries={[RoutePaths.MAIN]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(container.firstChild).toBeInTheDocument();
});

it('renders registration page without crashing', () => {
  const { container } = customRender(
    <MemoryRouter initialEntries={[RoutePaths.REGISTRATION]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(container.firstChild).toBeInTheDocument();
});

it('renders catalog page without crashing', () => {
  const { container } = customRender(
    <MemoryRouter initialEntries={[RoutePaths.CATALOG]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(container.firstChild).toBeInTheDocument();
});
