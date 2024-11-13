// assets/js/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const rootElement = document.getElementById('social-links-header');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
