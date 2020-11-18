import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from "./NotFound";

test('renders without crashing', () => {
   render(<NotFound />);
   const linkElement = screen.getByText(/Not Found Page/i);
   expect(linkElement).toBeInTheDocument();
 });