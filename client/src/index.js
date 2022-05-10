import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { /*BrowserRouter,*/ MemoryRouter } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

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
