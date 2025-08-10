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

// Enhanced Beautiful Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Beautiful gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50"></div>
    
    {/* Animated background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full animate-bounce"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-32 w-12 h-12 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-20 right-40 w-14 h-14 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
    
    {/* Main loading content */}
    <div className="relative z-10 text-center animate-fade-in-scale">
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-24 h-24 border-4 border-green-200 rounded-full animate-spin mx-auto"></div>
        {/* Inner ring */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-green-600 border-r-green-500 rounded-full animate-spin mx-auto" style={{ animationDuration: '0.8s' }}></div>
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          स्मार्ट कृषि सहायक
        </h2>
        <p className="text-green-700 font-semibold">लोड हो रहा है...</p>
        <p className="text-green-600 text-sm">Smart Agriculture Assistant Loading...</p>
      </div>
      
      {/* Progress dots */}
      <div className="flex justify-center space-x-2 mt-6">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
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
