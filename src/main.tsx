import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import CropInfo from './pages/CropInfo';
import DiseaseDetection from './pages/DiseaseDetection';
import MandiPrices from './pages/MandiPrices';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Profile from './pages/Profile';
import AiAgent from './pages/AiAgent';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'
import './i18n/config';

console.log('🌾 Starting Full Smart Krishi Sahayak Application...');

// Hide loading screen immediately
const loadingElement = document.getElementById('loading-screen');
if (loadingElement) {
  loadingElement.style.display = 'none';
  console.log('✅ Loading screen hidden - starting full app');
}

const isAuthenticated = () => true; // Simplified auth for farmers

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const FullKrishiApp = () => {
  console.log('🚀 Full Krishi App component rendering...');
  
  return (
    <ErrorBoundary>
      <Router basename="/smart-krishi-sahayak">
        <div className="min-h-screen bg-gray-50">
          {isAuthenticated() && <Navbar />}
          <main className={isAuthenticated() ? "container mx-auto px-4 py-8" : ""}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/weather" element={<PrivateRoute><Weather /></PrivateRoute>} />
              <Route path="/crop-info" element={<PrivateRoute><CropInfo /></PrivateRoute>} />
              <Route path="/disease-detection" element={<PrivateRoute><DiseaseDetection /></PrivateRoute>} />
              <Route path="/mandi-prices" element={<PrivateRoute><MandiPrices /></PrivateRoute>} />
              <Route path="/schemes" element={<PrivateRoute><GovernmentSchemes /></PrivateRoute>} />
              <Route path="/agent" element={<PrivateRoute><AiAgent /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

const container = document.getElementById('root');

if (container) {
  try {
    console.log('🔧 Creating React root for full application...');
    const root = ReactDOM.createRoot(container);
    root.render(<FullKrishiApp />);
    console.log('✅ Full Smart Krishi Sahayak loaded successfully!');
    
    // Register Service Worker after full app loads
    setTimeout(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/smart-krishi-sahayak/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker registered for full app:', registration);
          })
          .catch((error) => {
            console.log('⚠️ Service Worker registration failed:', error);
          });
      }
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error loading full app:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; background: #f0f8ff; color: #333; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 style="color: #16a34a; margin-bottom: 20px;">🌾 Smart Krishi Sahayak</h2>
        <p style="color: red; margin: 20px 0;">Full App Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 15px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
          🔄 Reload Full App
        </button>
      </div>
    `;
  }
} else {
  console.error('❌ No root container found for full app');
}
