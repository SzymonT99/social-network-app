import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { loadState } from './localStorage';

const initialState = loadState();

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();