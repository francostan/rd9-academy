import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Este es uno de los regalos
console.log('%cEste es uno de los regalos', 'color: #ff5f00; font-size: 14px; font-weight: bold;');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
