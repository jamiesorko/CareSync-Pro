
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TranslationProvider } from './contexts/TranslationContext';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TranslationProvider initialLanguage="English">
        <App />
      </TranslationProvider>
    </React.StrictMode>
  );
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('SW registration failed: ', err);
    });
  });
}
