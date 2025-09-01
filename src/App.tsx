import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import LiveWeather from './pages/LiveWeather';
import MandiPrices from './pages/MandiPrices';
import LiveMarketPrices from './pages/LiveMarketPrices';
import CropInfo from './pages/CropInfo';
import AiAgent from './pages/AiAgent';
import DiseaseDetection from './pages/DiseaseDetection';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import LiveDashboard from './components/LiveDashboard';
import ErrorBoundary from './components/ErrorBoundary';

const isAuthenticated = () => {
  // Check if user is logged in (you can implement proper authentication logic)
  return localStorage.getItem('isAuthenticated') === 'true' || true; // Default to true for demo
};

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  console.log('🌾 Smart Krishi Sahayak App loading...');
  
  return (
    <ErrorBoundary>
      <Router basename="/smart-krishi-sahayak">
        <div className="min-h-screen bg-gray-50">
          {isAuthenticated() && <Navbar />}
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Main Dashboard Routes */}
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/live-dashboard" element={<PrivateRoute><LiveDashboard /></PrivateRoute>} />
              
              {/* Weather Routes */}
              <Route path="/weather" element={<PrivateRoute><Weather /></PrivateRoute>} />
              <Route path="/live-weather" element={<PrivateRoute><LiveWeather /></PrivateRoute>} />
              
              {/* Market Routes */}
              <Route path="/mandi-prices" element={<PrivateRoute><MandiPrices /></PrivateRoute>} />
              <Route path="/live-market" element={<PrivateRoute><LiveMarketPrices /></PrivateRoute>} />
              
              {/* Agricultural Information Routes */}
              <Route path="/crop-info" element={<PrivateRoute><CropInfo /></PrivateRoute>} />
              <Route path="/disease-detection" element={<PrivateRoute><DiseaseDetection /></PrivateRoute>} />
              <Route path="/government-schemes" element={<PrivateRoute><GovernmentSchemes /></PrivateRoute>} />
              
              {/* AI and Tools Routes */}
              <Route path="/agent" element={<PrivateRoute><AiAgent /></PrivateRoute>} />
              <Route path="/ai-agent" element={<PrivateRoute><AiAgent /></PrivateRoute>} />
              
              {/* User Routes */}
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
