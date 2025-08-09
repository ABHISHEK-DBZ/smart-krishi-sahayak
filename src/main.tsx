import React from 'react'
import ReactDOM from 'react-dom/client'
import MinimalApp from './MinimalApp.tsx'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root');

if (container) {
  // Clear any existing content and show a working message
  container.innerHTML = '<div style="text-align: center; padding: 50px; font-family: Arial;"><h2>🌾 Initializing Smart Krishi Sahayak...</h2><p>Setting up your agriculture assistant</p></div>';
  
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
    // Use minimal app first to test if basic React works
    const useMinimal = window.location.search.includes('minimal') || true; // Force minimal for debugging
    
    if (useMinimal) {
      console.log('Loading minimal app for testing...');
      root.render(
        <React.StrictMode>
          <MinimalApp />
        </React.StrictMode>,
      );
    } else {
      // Load i18n config asynchronously after React is ready
      import('./i18n/config').then(() => {
        console.log('i18n config loaded successfully');
        
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );
        
      }).catch((error) => {
        console.error('Failed to load i18n config:', error);
        // Render app without i18n if it fails
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );
      });
    }
    
  } catch (error) {
    console.error('Error in main.tsx:', error);
    // Emergency fallback
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; font-family: Arial;">
        <h2>🌾 Smart Krishi Sahayak</h2>
        <p>There was an issue loading the app. Please refresh the page.</p>
        <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
          Refresh Page
        </button>
        <pre style="background: #f3f4f6; padding: 10px; margin-top: 20px; font-size: 12px; text-align: left; overflow: auto;">
          Error: ${errorMessage}
        </pre>
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
