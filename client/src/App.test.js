import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import store from './redux/store/store';
import App from './App';
import Landing from './components/Landing';

window.alert = jest.fn();
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    container
  );
});

it('renders welcome message', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('PUPPY CATALOG AND BEYOND')).toBeInTheDocument();
});
