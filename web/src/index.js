import React from 'react';
import ReactDOM from 'react-dom';
import SnackbarProvider from 'react-simple-snackbar';
import './styles/index.scss';
import App from './components/App';

ReactDOM.render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
  document.getElementById('root'),
);
