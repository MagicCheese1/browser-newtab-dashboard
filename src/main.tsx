import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

// function to initialize React
function initApp() {

  const rootElement = document.getElementById('root');
  
  // check if the element really does not exist
  if (!rootElement) {
    console.error("The element #root is not found in the DOM.");
    return;
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// check if the DOM is already loaded
if (document.readyState === 'loading') {
  // if not, wait for the event
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // if yes (the script has been loaded in 'defer' for example), execute it
  initApp();
}