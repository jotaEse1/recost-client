import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  test('component should render', () => {
    render(
      <Router>
        <App />
      </Router>
    )

    screen.getByRole('loading');
  });

})
