import { render, screen } from "@testing-library/react";
import React from "react";
import Dashboard from './Dashboard';

test('renders button text', () => {
   render(<Dashboard />);
   const linkElement = screen.getByText(/Dashboard/i);
   expect(linkElement).toBeInTheDocument();
 });
