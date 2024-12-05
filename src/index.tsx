import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';

import store from './redux/store';
import App from './components/app/app';

import './style.scss';
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Element with id 'root' not found");
}

const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
