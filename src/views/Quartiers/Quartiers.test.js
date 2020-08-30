import React from 'react';
import ReactDOM from 'react-dom';
import Quartiers from './Quartiers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Quartiers />, div);
  ReactDOM.unmountComponentAtNode(div);
});