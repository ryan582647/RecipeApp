import React from 'react';
import ReactDOM from 'react-dom';
import RecipeResults from './RecipeResults';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecipeResults />, div);
  ReactDOM.unmountComponentAtNode(div);
});