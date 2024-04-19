import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import App from './App'
import { Provider } from 'react-redux';
import { Provider as AlertProvider, positions, transitions } from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import store from './store';
import reportWebVitals from './reportWebVitals';

const options = {
  positions: positions.BOTTOM_CENTER,
  timeout: 3000,
  transitions: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <BrowserRouter>
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider >
  </Provider>
</BrowserRouter>,
);


reportWebVitals();
