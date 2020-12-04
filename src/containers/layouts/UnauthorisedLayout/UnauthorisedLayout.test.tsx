import { render } from '@testing-library/react';
import React from 'react';
import UnauthorisedLayout from './UnauthorisedLayout';

test('renders without crashing', () => {
   render(<UnauthorisedLayout />);
 });