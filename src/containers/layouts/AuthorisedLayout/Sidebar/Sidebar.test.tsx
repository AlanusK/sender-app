import { render } from '@testing-library/react';
import React from 'react';
import Sidebar from './Sidebar';

test('renders without crashing', () => {
   render(<Sidebar />);
 });