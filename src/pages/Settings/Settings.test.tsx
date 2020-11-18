import { render, screen } from '@testing-library/react';
import React from 'react';
import Settings from './Settings';

test('renders without crashing', () => {
   render(<Settings />);
   const linkElement = screen.getByText(/Settings/i);
   expect(linkElement).toBeInTheDocument();
 });