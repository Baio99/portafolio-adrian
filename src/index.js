import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n/index';
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);