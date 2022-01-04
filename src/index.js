import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { loadState } from './localStorage';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from './theme/appTheme';

const initialState = loadState();

ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <Provider store={configureStore(initialState, {})}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
