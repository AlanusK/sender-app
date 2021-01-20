import '../../../jestGlobalmocks'
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Login from './Login';

test.skip('renders without crashing', () => {
  render(
    <MemoryRouter initialEntries={["/posts/590"]}>
      <Route path="/posts/:id">
        <Login />
      </Route>
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/login page/i);
  expect(linkElement).toBeInTheDocument();
});