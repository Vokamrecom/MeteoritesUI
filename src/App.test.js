import { render, screen } from '@testing-library/react';
import App from './App';

test('renders meteorites dashboard title', () => {
  render(<App />);
  const heading = screen.getByText(/meteorites dashboard/i);
  expect(heading).toBeInTheDocument();
});
