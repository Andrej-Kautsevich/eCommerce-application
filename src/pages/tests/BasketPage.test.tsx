import { expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import customRender from '../../test/test-render';
import BasketPage from '../BasketPage';
import { lineItemMock, totalPriceMock } from '../../test/mock-data';

it('renders Empty cart when cart is empty', () => {
  customRender(
    <MemoryRouter>
      <BasketPage />
    </MemoryRouter>,
    { initialState: { cart: { lineItems: [] } } },
  );
  expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
});

it('renders cart items when there are items in the cart', () => {
  const lineItems = [lineItemMock];
  const cart = { totalPrice: totalPriceMock, lineItems };

  customRender(
    <MemoryRouter>
      <BasketPage />
    </MemoryRouter>,
    { initialState: { cart: { cart } } }, // mock redux store cart state
  );
  lineItems.forEach((item) => {
    expect(screen.getByText(item.name.en)).toBeInTheDocument();
  });
});
