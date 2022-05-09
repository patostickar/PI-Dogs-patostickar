import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { /*BrowserRouter,*/ MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
