import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind,
  TrendingUp,
  Sprout,
  DollarSign,
  Camera,
  BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WeatherData {
    temperature: number;
    humidity: number;
    description: string;
    icon: string;
    windSpeed: number;
    location: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeather(true);
      try {
        // In a real app, get user's location
        const lat = 28.6139; // Delhi
        const lon = 77.2090;
        const apiKey = (import.meta as any).env.VITE_OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();

        setWeatherData({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          description: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
          location: data.name,
        });
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        // Set mock data on failure
        setWeatherData({
            temperature: 28,
            humidity: 65,
            description: 'Haze',
            icon: 'https://openweathermap.org/img/wn/50d@2x.png',
            windSpeed: 12,
            location: 'Delhi'
        });
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  const marketPrices = [
    { crop: 'Rice', price: 2150, change: 5.2, trend: 'up' },
    { crop: 'Wheat', price: 2050, change: -2.1, trend: 'down' },
    { crop: 'Cotton', price: 5800, change: 8.3, trend: 'up' },
    { crop: 'Sugarcane', price: 350, change: 0, trend: 'stable' }
  ];

  const QuickAction = ({ to, icon: Icon, label }: { to: string, icon: React.ElementType, label: string }) => (
    <Link 
      to={to} 
      className="group relative p-3 lg:p-6 bg-gradient-to-br from-white via-gray-50 to-green-50 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-green-100 overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Icon container */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-2 lg:p-4 rounded-xl lg:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-2 lg:mb-4">
          <Icon className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
          <div className="absolute inset-0 bg-white/20 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Label */}
        <p className="font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300 text-sm lg:text-lg text-center leading-tight">
          {label}
        </p>
        
        {/* Hover indicator */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 lg:h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full group-hover:w-12 lg:group-hover:w-16 transition-all duration-500"></div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6 lg:space-y-10 p-3 lg:p-6 min-h-screen animate-fade-in-scale">
      {/* Enhanced Welcome Section - Responsive */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white p-6 lg:p-10 rounded-2xl lg:rounded-3xl shadow-2xl">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-5 lg:top-10 left-5 lg:left-10 w-16 lg:w-32 h-16 lg:h-32 bg-white rounded-full opacity-10"></div>
          <div className="absolute top-10 lg:top-20 right-10 lg:right-20 w-10 lg:w-20 h-10 lg:h-20 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-5 lg:bottom-10 left-16 lg:left-1/3 w-8 lg:w-16 h-8 lg:h-16 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-10 lg:bottom-20 right-5 lg:right-10 w-12 lg:w-24 h-12 lg:h-24 bg-white rounded-full opacity-10"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="w-full lg:w-auto">
              <h1 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                {t('dashboard.welcome')}
              </h1>
              <p className="text-green-100 text-base lg:text-xl font-medium leading-relaxed max-w-full lg:max-w-2xl">
                {t('app.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 lg:mt-6 space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs lg:text-sm font-semibold">आज का दिन</span>
                </div>
                <div className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs lg:text-sm font-semibold">{new Date().toLocaleDateString('hi-IN')}</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="hidden lg:block relative">
              <div className="w-24 lg:w-32 h-24 lg:h-32 bg-white/20 rounded-full animate-pulse"></div>
              <Sprout className="absolute inset-0 m-auto w-12 lg:w-16 h-12 lg:h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-8">
        <div className="xl:col-span-2 space-y-4 lg:space-y-8">
            {/* Enhanced Today's Weather - Mobile Responsive */}
            <div className="card bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 backdrop-blur-sm border border-blue-200/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 space-y-3 sm:space-y-0">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center">
                        <div className="p-2 lg:p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl lg:rounded-2xl shadow-lg mr-3 lg:mr-4">
                            <Cloud className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <span className="text-lg lg:text-3xl">{t('dashboard.todayWeather')}</span>
                    </h2>
                    <div className="px-3 py-1 lg:px-4 lg:py-2 bg-blue-100 rounded-full">
                        <span className="text-blue-800 font-semibold text-xs lg:text-sm">Live Data</span>
                    </div>
                </div>
                
                {loadingWeather ? (
                    <div className="flex justify-center items-center h-32 lg:h-48">
                        <div className="relative">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-12 h-12 lg:w-16 lg:h-16 border-4 border-transparent border-t-blue-600 border-r-blue-500 rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>
                        </div>
                    </div>
                ) : weatherData && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                        <div className="text-center p-3 lg:p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <img src={weatherData.icon} alt={weatherData.description} className="mx-auto w-12 h-12 lg:w-16 lg:h-16 drop-shadow-lg" />
                            <p className="font-bold text-sm lg:text-lg text-blue-800 mt-2">{weatherData.description}</p>
                            <p className="text-xs lg:text-sm text-blue-600 font-medium">{weatherData.location}</p>
                        </div>
                        <div className="text-center p-3 lg:p-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-2 lg:p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl lg:rounded-2xl w-fit mx-auto mb-2 lg:mb-3">
                                <Thermometer className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                            </div>
                            <p className="text-2xl lg:text-3xl font-bold text-red-700">{weatherData.temperature}°C</p>
                            <p className="text-xs lg:text-sm text-red-600 font-semibold">{t('weather.temperature')}</p>
                        </div>
                        <div className="text-center p-3 lg:p-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-2 lg:p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl lg:rounded-2xl w-fit mx-auto mb-2 lg:mb-3">
                                <Droplets className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                            </div>
                            <p className="text-2xl lg:text-3xl font-bold text-cyan-700">{weatherData.humidity}%</p>
                            <p className="text-xs lg:text-sm text-cyan-600 font-semibold">{t('weather.humidity')}</p>
                        </div>
                        <div className="text-center p-3 lg:p-6 bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-2 lg:p-3 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl lg:rounded-2xl w-fit mx-auto mb-2 lg:mb-3">
                                <Wind className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                            </div>
                            <p className="text-2xl lg:text-3xl font-bold text-gray-700">{weatherData.windSpeed}</p>
                            <p className="text-xs lg:text-xs text-gray-600 font-semibold">km/h</p>
                            <p className="text-xs lg:text-sm text-gray-600 font-semibold">{t('weather.windSpeed')}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Quick Actions - Mobile Responsive */}
            <div className="card bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-8 space-y-3 sm:space-y-0">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center">
                        <div className="p-2 lg:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl shadow-lg mr-3 lg:mr-4">
                            <Sprout className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <span className="text-lg lg:text-3xl">{t('dashboard.quickActions')}</span>
                    </h2>
                    <div className="px-3 py-1 lg:px-4 lg:py-2 bg-green-100 rounded-full">
                        <span className="text-green-800 font-semibold text-xs lg:text-sm">Quick Access</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                    <QuickAction to="/weather" icon={Cloud} label={t('navigation.weather')} />
                    <QuickAction to="/crop-info" icon={Sprout} label={t('navigation.crops')} />
                    <QuickAction to="/disease-detection" icon={Camera} label={t('navigation.diseases')} />
                    <QuickAction to="/mandi-prices" icon={BarChart2} label={t('navigation.prices')} />
                </div>
            </div>
        </div>

        <div className="space-y-4 lg:space-y-8">
            {/* Enhanced Market Prices - Mobile Responsive */}
            <div className="card bg-gradient-to-br from-white via-yellow-50/30 to-green-50/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 space-y-3 sm:space-y-0">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center">
                        <div className="p-2 lg:p-3 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl lg:rounded-2xl shadow-lg mr-3 lg:mr-4">
                            <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <span className="text-lg lg:text-3xl">{t('dashboard.marketPrices')}</span>
                    </h2>
                    <div className="px-3 py-1 lg:px-4 lg:py-2 bg-yellow-100 rounded-full">
                        <span className="text-yellow-800 font-semibold text-xs lg:text-sm">Today's Rates</span>
                    </div>
                </div>
                
                <div className="space-y-3 lg:space-y-4">
                    {marketPrices.map((item, index) => (
                        <div key={index} className="group p-3 lg:p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 lg:space-x-4">
                                    <div className="p-2 lg:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl shadow-lg">
                                        <Sprout className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base lg:text-lg text-gray-800 group-hover:text-green-700 transition-colors">
                                            {item.crop}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <p className="text-lg lg:text-xl font-bold text-green-600">₹{item.price}</p>
                                            <span className="text-xs lg:text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg">
                                                / Quintal
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className={`inline-flex items-center px-2 py-1 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-md ${
                                        item.trend === 'up' 
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                                            : item.trend === 'down' 
                                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' 
                                            : 'bg-gradient-to-r from-gray-500 to-slate-600 text-white'
                                    }`}>
                                        {item.trend === 'up' ? (
                                            <TrendingUp size={14} className="mr-1" />
                                        ) : item.trend === 'down' ? (
                                            <TrendingUp size={14} className="mr-1 transform rotate-180" />
                                        ) : (
                                            <BarChart2 size={14} className="mr-1" />
                                        )}
                                        {Math.abs(item.change)}%
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">
                                        {item.trend === 'up' ? 'बढ़ा' : item.trend === 'down' ? 'घटा' : 'स्थिर'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <Link 
                    to="/mandi-prices" 
                    className="group mt-4 lg:mt-6 flex items-center justify-center space-x-2 w-full py-3 lg:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:from-green-600 hover:to-emerald-700 text-sm lg:text-base"
                >
                    <span>{t('dashboard.viewAllPrices')}</span>
                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
