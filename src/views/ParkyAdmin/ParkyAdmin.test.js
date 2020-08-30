import React from 'react';
import ReactDOM from 'react-dom';
import ParkyAdmin from './ParkyAdmin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ParkyAdmin />, div);
  ReactDOM.unmountComponentAtNode(div);
});