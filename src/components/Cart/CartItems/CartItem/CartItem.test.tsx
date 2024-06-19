import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import customRender from '../../../../test/test-render';
import CartItem from './CartItem';
import { lineItemMock } from '../../../../test/mock-data';

it('renders items ', () => {
  customRender(
    <MemoryRouter>
      <CartItem item={lineItemMock} />
    </MemoryRouter>,
  );
  expect(screen.getByText(lineItemMock.name.en)).toBeInTheDocument();
});
