import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config' // Import i18n synchronously

console.log('🌾 Initializing Smart Krishi Sahayak...');

// Hide loading screen immediately
const hideLoadingScreen = () => {
  const loading = document.getElementById('loading-screen');
  if (loading) {
    loading.style.display = 'none';
    console.log('✅ Loading screen hidden');
  }
};

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  
  try {
    // Hide loading screen before rendering
    hideLoadingScreen();
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('✅ Smart Krishi Sahayak loaded successfully!');
    
    // Ensure loading screen is hidden after render
    setTimeout(hideLoadingScreen, 100);
    
  } catch (error) {
    console.error('❌ Error loading app:', error);
    hideLoadingScreen();
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; font-family: Arial; color: #333; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 style="color: #16a34a; margin-bottom: 20px;">🌾 Smart Krishi Sahayak</h2>
        <p style="color: red; margin: 20px 0;">Loading error occurred</p>
        <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 20px;">
          🔄 Refresh App
        </button>
      </div>
    `;
  }
} else {
  console.error('❌ Root container not found');
  hideLoadingScreen();
  document.body.innerHTML = `
    <div style="text-align: center; padding: 50px; font-family: Arial; color: #333; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h2 style="color: #16a34a; margin-bottom: 20px;">🌾 Smart Krishi Sahayak</h2>
      <p style="color: red; margin: 20px 0;">App container missing</p>
      <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 20px;">
        🔄 Refresh Page
      </button>
    </div>
  `;
}
