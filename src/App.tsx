import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import CropInfo from './pages/CropInfo';
import DiseaseDetection from './pages/DiseaseDetection';
import MandiPrices from './pages/MandiPrices';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AiAgent from './pages/AiAgent';

const isAuthenticated = () => {
  // Temporary fix: always return true to bypass authentication
  return true; 
  // return localStorage.getItem('token') !== null;
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
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
  );
}

export default App;
