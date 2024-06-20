import { expect, it } from 'vitest';
import App from './App';
import customRender from '../test/test-render';

it('renders without crashing', () => {
  const { container } = customRender(<App />);
  expect(container.firstChild).toBeInTheDocument();
});
