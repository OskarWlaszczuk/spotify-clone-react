import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from "./core/App/index"
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from './core/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './core/theme';
import { Provider } from 'react-redux';
import { store } from './core/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
