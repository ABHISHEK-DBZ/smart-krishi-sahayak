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
    <Link to={to} className="group text-center p-4 bg-gray-50 rounded-xl hover:bg-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto shadow-md group-hover:shadow-lg transition-shadow">
            <Icon className="w-full h-full text-green-500" />
        </div>
        <p className="mt-3 font-semibold text-gray-700">{label}</p>
    </Link>
  );

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{t('dashboard.welcome')}</h1>
        <p className="text-green-100 text-lg">{t('app.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Today's Weather */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Cloud className="mr-3 text-blue-500" />
                    {t('dashboard.todayWeather')}
                </h2>
                {loadingWeather ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : weatherData && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <img src={weatherData.icon} alt={weatherData.description} className="mx-auto -mt-2 -mb-1" />
                            <p className="font-semibold">{weatherData.description}</p>
                            <p className="text-sm text-gray-500">{weatherData.location}</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-xl flex flex-col justify-center">
                            <Thermometer className="mx-auto mb-2 text-red-500" />
                            <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                            <p className="text-sm text-gray-600">{t('weather.temperature')}</p>
                        </div>
                        <div className="text-center p-4 bg-cyan-50 rounded-xl flex flex-col justify-center">
                            <Droplets className="mx-auto mb-2 text-cyan-500" />
                            <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                            <p className="text-sm text-gray-600">{t('weather.humidity')}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-100 rounded-xl flex flex-col justify-center">
                            <Wind className="mx-auto mb-2 text-gray-500" />
                            <p className="text-2xl font-bold">{weatherData.windSpeed} km/h</p>
                            <p className="text-sm text-gray-600">{t('weather.windSpeed')}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('dashboard.quickActions')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickAction to="/weather" icon={Cloud} label={t('navigation.weather')} />
                    <QuickAction to="/crop-info" icon={Sprout} label={t('navigation.crops')} />
                    <QuickAction to="/disease-detection" icon={Camera} label={t('navigation.diseases')} />
                    <QuickAction to="/mandi-prices" icon={BarChart2} label={t('navigation.prices')} />
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {/* Market Prices */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <DollarSign className="mr-3 text-green-500" />
                    {t('dashboard.marketPrices')}
                </h2>
                <div className="space-y-4">
                    {marketPrices.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <Sprout className="text-green-500 mr-3" />
                                <div>
                                    <h3 className="font-semibold">{item.crop}</h3>
                                    <p className="text-sm text-gray-700">₹{item.price} <span className="text-xs text-gray-500">/ Quintal</span></p>
                                </div>
                            </div>
                            <span className={`text-sm font-medium flex items-center ${
                                item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                                {item.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : item.trend === 'down' ? <TrendingUp size={16} className="mr-1 transform rotate-180" /> : <BarChart2 size={16} className="mr-1" />}
                                {item.change}%
                            </span>
                        </div>
                    ))}
                </div>
                <Link to="/mandi-prices" className="text-sm text-green-600 hover:underline mt-4 block text-right font-semibold">
                    {t('dashboard.viewAllPrices')}
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
