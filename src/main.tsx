import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config'

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  
  // Hide loading screen immediately when React app renders
  const hideLoading = () => {
    const loading = document.getElementById('loading-screen');
    if (loading) {
      loading.style.display = 'none';
    }
  };
  
  // Hide loading screen as soon as possible
  hideLoading();
  setTimeout(hideLoading, 100);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  
  // Fallback: force hide loading after 2 seconds
  setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) {
      loading.remove();
    }
  }, 2000);
  
} else {
  console.error('Root container not found');
  // If root not found, hide loading screen anyway
  const loading = document.getElementById('loading-screen');
  if (loading) {
    loading.innerHTML = '<div class="text-center"><h2>Error: App container not found</h2><button onclick="location.reload()" class="bg-green-600 text-white px-4 py-2 rounded mt-4">Reload Page</button></div>';
  }
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/smart-krishi-sahayak/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/smart-krishi-sahayak/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
