import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contact form inputs', () => {
  render(<App />);

  expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Phone/i)).toBeInTheDocument();
});

