import React from 'react';
import ReactDOM from 'react-dom';
import ChangeProfile from './ChangeProfile';

it('Home renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChangeProfile />, div);
});