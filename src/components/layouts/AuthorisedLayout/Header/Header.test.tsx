import { render } from '@testing-library/react';
import React from 'react';
import CustomHeader from './Header';

test('renders without crashing', () => {
   render(<CustomHeader />);
 });