import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load components to improve initial loading
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));
const Navbar = lazy(() => import('./components/Navbar'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Weather = lazy(() => import('./pages/Weather'));
const CropInfo = lazy(() => import('./pages/CropInfo'));
const DiseaseDetection = lazy(() => import('./pages/DiseaseDetection'));
const MandiPrices = lazy(() => import('./pages/MandiPrices'));
const GovernmentSchemes = lazy(() => import('./pages/GovernmentSchemes'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AiAgent = lazy(() => import('./pages/AiAgent'));

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    flexDirection: 'column'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #16a34a',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ marginTop: '10px', color: '#6b7280' }}>Loading...</p>
  </div>
);

const isAuthenticated = () => {
  // Simplified auth check
  return true; 
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  console.log('App component loading...');
  
  return (
    <div className="app-root">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .app-root {
          min-height: 100vh;
          background-color: #f9fafb;
        }
      `}</style>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <Router basename="/smart-krishi-sahayak">
            <div className="min-h-screen bg-gray-50">
              {isAuthenticated() && (
                <Suspense fallback={<div>Loading navbar...</div>}>
                  <Navbar />
                </Suspense>
              )}
              <main className={isAuthenticated() ? "container mx-auto px-4 py-8" : ""}>
                <Suspense fallback={<LoadingSpinner />}>
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
                </Suspense>
              </main>
            </div>
          </Router>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;
