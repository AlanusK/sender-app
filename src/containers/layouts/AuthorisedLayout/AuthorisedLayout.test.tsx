import { render } from '@testing-library/react';
import React from 'react';
import AuthorisedLayout from './AuthorisedLayout';

test('renders without crashing', () => {
   render(<AuthorisedLayout />);
 });