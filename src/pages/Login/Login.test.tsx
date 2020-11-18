import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login';

test('renders without crashing', () => {
  render(<Login />);
  const linkElement = screen.getByText(/login page/i);
  expect(linkElement).toBeInTheDocument();
});