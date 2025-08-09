import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root');

if (container) {
  // Clear any existing content
  container.innerHTML = '<div style="text-align: center; padding: 50px; font-family: Arial;"><h2>🌾 Loading Smart Krishi Sahayak...</h2><p>Initializing full application</p></div>';
  
  const root = ReactDOM.createRoot(container);
  
  // Hide loading screen immediately
  const hideLoading = () => {
    const loading = document.getElementById('loading-screen');
    if (loading) {
      loading.style.display = 'none';
    }
  };
  
  hideLoading();
  
  try {
    console.log('Loading full Smart Krishi Sahayak app...');
    
    // Load i18n config asynchronously
    import('./i18n/config').then(() => {
      console.log('i18n config loaded successfully');
      
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
      
      console.log('Full app rendered successfully');
      
    }).catch((error) => {
      console.error('Failed to load i18n config:', error);
      // Try to render app without i18n
      console.log('Attempting to load app without i18n...');
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
    });
    
  } catch (error) {
    console.error('Error in main.tsx:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; font-family: Arial;">
        <h2>🌾 Smart Krishi Sahayak</h2>
        <p style="color: red;">Error loading full app: ${errorMessage}</p>
        <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
  
} else {
  console.error('Root container not found');
  document.body.innerHTML = `
    <div style="text-align: center; padding: 50px; font-family: Arial;">
      <h2>🌾 Smart Krishi Sahayak</h2>
      <p style="color: red;">Error: Could not find app container</p>
      <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}

// Register Service Worker for PWA functionality
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
