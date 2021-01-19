import { render, screen } from '@testing-library/react';
import React from 'react';
import Register from './Register';

test.skip('renders without crashing', () => {
  render(<Register />);
  const linkElement = screen.getByText(/register page/i);
  expect(linkElement).toBeInTheDocument();
});