import React, { useState } from 'react';
import { RefreshCw, AlertTriangle, Sun, CloudRain, Wind } from 'lucide-react';

const Weather: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Example mock data
  const weatherData = {
    location: 'Mumbai',
    temp: 32,
    humidity: 78,
    wind: 12,
    condition: 'Sunny',
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin mb-4">
          <RefreshCw size={48} className="text-green-500" />
        </div>
        <div className="text-lg text-gray-700 mb-4">Loading weather data...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-4">
          <AlertTriangle size={48} className="text-red-500" />
        </div>
        <div className="text-lg text-red-700 mb-4">{error}</div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="weather-page-container p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Weather Dashboard</h1>
      <div className="bg-green-50 rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          <Sun size={32} className="text-yellow-400 mr-2" />
          <span className="text-xl font-semibold">{weatherData.location}</span>
        </div>
        <div className="text-5xl font-bold mb-2">{weatherData.temp}°C</div>
        <div className="text-green-800 mb-4">{weatherData.condition}</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <CloudRain size={24} className="text-blue-400 mb-1" />
            <span className="font-bold">{weatherData.humidity}%</span>
            <span className="text-xs text-gray-600">Humidity</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind size={24} className="text-gray-500 mb-1" />
            <span className="font-bold">{weatherData.wind} km/h</span>
            <span className="text-xs text-gray-600">Wind</span>
          </div>
          <div className="flex flex-col items-center">
            <Sun size={24} className="text-yellow-400 mb-1" />
            <span className="font-bold">{weatherData.temp}°C</span>
            <span className="text-xs text-gray-600">Temperature</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleRefresh}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Refresh
      </button>
    </div>
  );
};

export default Weather;
