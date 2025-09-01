import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import weatherService from '../services/weatherService';
import { WeatherData } from '../services/weatherService';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  Eye,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Search,
  Navigation,
  Star,
  CheckCircle,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  Cloudy
} from 'lucide-react';

// Enhanced weather interfaces
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  uv_index?: number;
  air_quality?: {
    aqi: number;
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
    };
  };
}

interface HourlyWeather {
  dt: number;
  temp: number;
  humidity: number;
  weather: {
    description: string;
    icon: string;
  }[];
  rain?: { '1h': number };
}

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  humidity: number;
  weather: {
    description: string;
    icon: string;
  }[];
  rain?: number;
  wind_speed: number;
}

interface WeatherAlert {
  event: string;
  description: string;
  start: number;
  end: number;
  severity: string;
}

interface SoilConditions {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

const Weather: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<CityData[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [favoriteLocations, setFavoriteLocations] = useState<CityData[]>([]);
  
  // Advanced weather states
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [soilConditions, setSoilConditions] = useState<SoilConditions | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'hourly' | 'daily' | 'alerts' | 'soil'>('current');

  // Popular Indian cities for quick access
  const popularCities: CityData[] = [
    { name: "Mumbai", country: "IN", lat: 19.4127, lon: 72.8111 },
    { name: "Delhi", country: "IN", lat: 28.7041, lon: 77.1025 },
    { name: "Bangalore", country: "IN", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", country: "IN", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata", country: "IN", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad", country: "IN", lat: 17.3850, lon: 78.4867 },
    { name: "Pune", country: "IN", lat: 18.5204, lon: 73.8567 },
    { name: "Ahmedabad", country: "IN", lat: 23.0225, lon: 72.5714 },
    { name: "Jaipur", country: "IN", lat: 26.9124, lon: 75.7873 },
    { name: "Lucknow", country: "IN", lat: 26.8467, lon: 80.9462 },
    { name: "Chandigarh", country: "IN", lat: 30.7333, lon: 76.7794 },
    { name: "Bhopal", country: "IN", lat: 23.2599, lon: 77.4126 }
  ];

  // Load favorite locations from localStorage
  const loadFavoriteLocations = () => {
    try {
      const saved = localStorage.getItem('favoriteLocations');
      if (saved) {
        setFavoriteLocations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorite locations:', error);
    }
  };

  // Save favorite locations to localStorage
  const saveFavoriteLocations = (locations: CityData[]) => {
    try {
      localStorage.setItem('favoriteLocations', JSON.stringify(locations));
      setFavoriteLocations(locations);
    } catch (error) {
      console.error('Error saving favorite locations:', error);
    }
  };

  // Add location to favorites
  const addToFavorites = (location: CityData) => {
    const isAlreadyFavorite = favoriteLocations.some(
      fav => fav.lat === location.lat && fav.lon === location.lon
    );
    if (!isAlreadyFavorite) {
      const newFavorites = [...favoriteLocations, location];
      saveFavoriteLocations(newFavorites);
    }
  };

  // Remove location from favorites
  const removeFromFavorites = (location: CityData) => {
    const newFavorites = favoriteLocations.filter(
      fav => !(fav.lat === location.lat && fav.lon === location.lon)
    );
    saveFavoriteLocations(newFavorites);
  };

  // Check if location is in favorites
  const isFavorite = (location: CityData) => {
    return favoriteLocations.some(
      fav => fav.lat === location.lat && fav.lon === location.lon
    );
  };

  // Search for cities using Weather Service
  const searchCities = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    try {
      const location = await weatherService.getLocationByName(query);
      if (location) {
        const cities = [{
          name: location.name,
          state: location.state,
          country: location.country,
          lat: location.lat,
          lon: location.lon
        }];
        
        setSearchResults(cities);
        setShowSearchResults(true);
      } else {
        // Fallback: filter popular cities if API fails
        const filteredCities = popularCities.filter(city =>
          city.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredCities);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Error searching cities:', error);
      // Fallback: filter popular cities if API fails
      const filteredCities = popularCities.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredCities);
      setShowSearchResults(true);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle search input change
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    setTimeout(() => {
      if (query === searchQuery) {
        searchCities(query);
      }
    }, 300);
  };

  // Select location (from search, popular cities, or favorites)
  const selectLocation = (location: CityData) => {
    setCoords({ lat: location.lat, lon: location.lon });
    setSearchQuery('');
    setShowSearchResults(false);
    fetchWeatherData(location.lat, location.lon);
  };

  // Get current user location
  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const location = await weatherService.getCurrentLocation();
      if (location) {
        setCoords({ lat: location.lat, lon: location.lon });
      } else {
        // Use Mumbai coordinates as fallback
        const fallbackCoords = { lat: 19.4127, lon: 72.8111 };
        setCoords(fallbackCoords);
        setError('Could not get your current location. Showing default location.');
      }
    } catch (err) {
      console.warn("Location error:", err);
      // Use Mumbai coordinates as fallback
      const fallbackCoords = { lat: 19.4127, lon: 72.8111 };
      setCoords(fallbackCoords);
      setError('Could not get your current location. Showing default location.');
    }
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const location = { lat, lon, name: '', state: '', country: 'IN' };
      const weatherData = await weatherService.getWeatherData(location);
      
      if (weatherData) {
        setWeatherData({
          name: location.name || 'Your Location',
          main: {
            temp: weatherData.current.temp,
            humidity: weatherData.current.humidity,
            feels_like: weatherData.current.feelsLike,
            pressure: weatherData.current.pressure,
            temp_min: weatherData.daily[0]?.tempMin || weatherData.current.temp,
            temp_max: weatherData.daily[0]?.tempMax || weatherData.current.temp
          },
          weather: [{
            description: weatherData.current.description,
            icon: getWeatherIconCode(weatherData.current.description),
            main: getWeatherMainType(weatherData.current.description)
          }],
          wind: {
            speed: weatherData.current.windSpeed,
            deg: 0 // API doesn't provide wind direction
          },
          visibility: weatherData.current.visibility,
          clouds: { all: 0 }, // API doesn't provide cloud coverage
          sys: {
            sunrise: 0, // API doesn't provide sunrise/sunset times
            sunset: 0
          },
          uv_index: weatherData.current.uv,
          air_quality: {
            aqi: 0, // API doesn't provide AQI
            components: {
              co: 0,
              no2: 0,
              o3: 0,
              pm2_5: 0,
              pm10: 0
            }
          }
        });

        // Set hourly and daily forecast data
        setHourlyWeather(weatherData.hourly.map(hour => ({
          dt: new Date(hour.time).getTime() / 1000,
          temp: hour.temp,
          humidity: hour.humidity,
          weather: [{
            description: hour.description,
            icon: getWeatherIconCode(hour.description)
          }],
          rain: hour.rainfall ? { '1h': hour.rainfall } : undefined
        })));

        setDailyWeather(weatherData.daily.map(day => ({
          dt: new Date(day.date).getTime() / 1000,
          temp: {
            day: (day.tempMax + day.tempMin) / 2,
            min: day.tempMin,
            max: day.tempMax
          },
          humidity: day.humidity,
          weather: [{
            description: day.description,
            icon: getWeatherIconCode(day.description)
          }],
          rain: day.rainfall,
          wind_speed: day.windSpeed
        })));

        // Set soil conditions
        setSoilConditions({
          moisture: weatherData.agricultural.soilMoisture * 100, // Convert to percentage
          temperature: weatherData.agricultural.soilTemperature,
          ph: 6.5 + Math.random() * 1, // Mock pH value
          nitrogen: 20 + Math.random() * 60,
          phosphorus: 15 + Math.random() * 35,
          potassium: 25 + Math.random() * 50
        });

        // Get weather alerts and farming recommendations
        const alerts = weatherService.getWeatherAlerts(weatherData);
        const recommendations = weatherService.getFarmingRecommendations(weatherData);

        setWeatherAlerts(alerts.map(alert => ({
          event: alert,
          description: alert,
          start: Date.now() / 1000,
          end: (Date.now() / 1000) + 86400,
          severity: 'Moderate'
        })));

      } else {
        throw new Error('Could not fetch weather data');
      }
    } catch (err: any) {
      console.error("Error fetching weather:", err);
      setError(err.message || 'Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert weather description to icon code
  const getWeatherIconCode = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '01d';
    if (desc.includes('few clouds')) return '02d';
    if (desc.includes('scattered clouds')) return '03d';
    if (desc.includes('broken clouds') || desc.includes('overcast')) return '04d';
    if (desc.includes('shower rain')) return '09d';
    if (desc.includes('rain')) return '10d';
    if (desc.includes('thunderstorm')) return '11d';
    if (desc.includes('snow')) return '13d';
    if (desc.includes('mist') || desc.includes('fog')) return '50d';
    return '02d'; // Default to few clouds
  };

  // Helper function to get main weather type
  const getWeatherMainType = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return 'Clear';
    if (desc.includes('cloud')) return 'Clouds';
    if (desc.includes('rain')) return 'Rain';
    if (desc.includes('thunderstorm')) return 'Thunderstorm';
    if (desc.includes('snow')) return 'Snow';
    if (desc.includes('mist') || desc.includes('fog')) return 'Atmosphere';
    return 'Clouds'; // Default
  };

  // Generate mock advanced weather data
  const generateAdvancedWeatherData = (_lat: number, _lon: number) => {
    // Mock hourly weather for next 24 hours
    const hourlyData: HourlyWeather[] = [];
    const currentTime = Date.now() / 1000;
    for (let i = 0; i < 24; i++) {
      hourlyData.push({
        dt: currentTime + (i * 3600),
        temp: 25 + Math.random() * 10,
        humidity: 60 + Math.random() * 30,
        weather: [{
          description: i % 3 === 0 ? "clear sky" : i % 2 === 0 ? "few clouds" : "light rain",
          icon: i % 3 === 0 ? "01d" : i % 2 === 0 ? "02d" : "10d"
        }],
        rain: i % 4 === 0 ? { '1h': Math.random() * 2 } : undefined
      });
    }
    setHourlyWeather(hourlyData);

    // Mock daily weather for next 7 days
    const dailyData: DailyWeather[] = [];
    for (let i = 0; i < 7; i++) {
      dailyData.push({
        dt: currentTime + (i * 86400),
        temp: {
          day: 25 + Math.random() * 8,
          min: 20 + Math.random() * 5,
          max: 30 + Math.random() * 8
        },
        humidity: 65 + Math.random() * 25,
        weather: [{
          description: i % 3 === 0 ? "sunny" : i % 2 === 0 ? "cloudy" : "rainy",
          icon: i % 3 === 0 ? "01d" : i % 2 === 0 ? "03d" : "10d"
        }],
        rain: i % 3 === 0 ? Math.random() * 5 : undefined,
        wind_speed: 2 + Math.random() * 6
      });
    }
    setDailyWeather(dailyData);

    // Mock weather alerts
    const alerts: WeatherAlert[] = [];
    if (Math.random() > 0.7) {
      alerts.push({
        event: "Heavy Rain Warning",
        description: "Heavy rainfall expected in the next 24 hours. Take precautions for crop protection.",
        start: currentTime,
        end: currentTime + 86400,
        severity: "Moderate"
      });
    }
    if (Math.random() > 0.8) {
      alerts.push({
        event: "High Temperature Alert", 
        description: "Temperature may exceed 40°C. Ensure adequate irrigation for sensitive crops.",
        start: currentTime + 43200,
        end: currentTime + 129600,
        severity: "Minor"
      });
    }
    setWeatherAlerts(alerts);

    // Mock soil conditions
    setSoilConditions({
      moisture: 40 + Math.random() * 40,
      temperature: 22 + Math.random() * 8,
      ph: 6.0 + Math.random() * 2,
      nitrogen: 20 + Math.random() * 60,
      phosphorus: 15 + Math.random() * 35,
      potassium: 25 + Math.random() * 50
    });
  };

  // Auto-refresh weather data every 5 minutes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (coords) {
        fetchWeatherData(coords.lat, coords.lon);
      }
    }, 300000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, [coords]);

  // Initial load
  useEffect(() => {
    getCurrentLocation();
    loadFavoriteLocations();
  }, []); // Runs once on component mount

  // Fetch weather data based on coordinates
  useEffect(() => {
    if (coords) {
      fetchWeatherData(coords.lat, coords.lon);
    }
  }, [coords]);

  // Check if conditions are suitable for spraying
  const getSprayingAdvice = useCallback(() => {
    if (!weatherData) return null;
    
    const isSuitable = weatherService.isSuitableForSpraying({
      current: {
        temp: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        rainfall: 0,
        description: weatherData.weather[0].description,
        feelsLike: weatherData.main.feels_like,
        visibility: weatherData.visibility,
        uv: weatherData.uv_index || 0,
        pressure: weatherData.main.pressure
      },
      hourly: [],
      daily: [],
      agricultural: {
        soilMoisture: 0,
        soilTemperature: 0,
        evapotranspiration: 0,
        growingDegreeDay: 0
      }
    });

    return {
      suitable: isSuitable,
      message: isSuitable 
        ? 'Current conditions are suitable for pesticide/fertilizer spraying'
        : 'Not recommended to spray pesticides/fertilizers under current conditions'
    };
  }, [weatherData]);

  const getWeatherIcon = (iconCode: string) => {
    const size = 64;
    const commonClasses = "transition-all duration-300 ease-in-out hover:scale-110";

    // Clear sky
    if (iconCode.startsWith('01')) {
      return <Sun className={`text-yellow-400 ${commonClasses}`} size={size} />;
    }

    // Few clouds
    if (iconCode.startsWith('02')) {
      return <Cloud className={`text-gray-400 ${commonClasses}`} size={size} />;
    }

    // Scattered clouds
    if (iconCode.startsWith('03')) {
      return <Cloudy className={`text-gray-500 ${commonClasses}`} size={size} />;
    }

    // Broken clouds or overcast
    if (iconCode.startsWith('04')) {
      return (
        <div className="relative">
          <Cloud className={`text-gray-600 absolute ${commonClasses}`} size={size} />
          <Cloud className={`text-gray-400 ml-2 mt-2 ${commonClasses}`} size={size} />
        </div>
      );
    }

    // Shower rain
    if (iconCode.startsWith('09')) {
      return <CloudDrizzle className={`text-blue-400 ${commonClasses}`} size={size} />;
    }

    // Rain
    if (iconCode.startsWith('10')) {
      return <CloudRain className={`text-blue-500 ${commonClasses}`} size={size} />;
    }

    // Thunderstorm
    if (iconCode.startsWith('11')) {
      return <CloudLightning className={`text-indigo-600 ${commonClasses}`} size={size} />;
    }

    // Snow
    if (iconCode.startsWith('13')) {
      return <CloudSnow className={`text-blue-200 ${commonClasses}`} size={size} />;
    }

    // Mist, fog, etc.
    if (iconCode.startsWith('50')) {
      return (
        <div className="relative opacity-70">
          <Cloud className={`text-gray-400 absolute blur-[1px] ${commonClasses}`} size={size} />
          <Cloud className={`text-gray-300 ml-2 mt-2 blur-[1px] ${commonClasses}`} size={size} />
        </div>
      );
    }

    // Default
    return <Cloud className={`text-gray-500 ${commonClasses}`} size={size} />;
  };

  const handleRefresh = () => {
    if (coords) {
      fetchWeatherData(coords.lat, coords.lon);
    } else {
      getCurrentLocation();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-center p-4">
        <RefreshCw className="animate-spin text-green-600" size={48} />
        <span className="ml-2 text-lg mt-4">{t('weather.fetching')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg shadow-md">
        <AlertTriangle className="mx-auto text-red-500" size={48} />
        <p className="text-red-600 mt-4 mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
        >
          <RefreshCw size={18} className="mr-2" />
          {t('common.retry')}
        </button>
      </div>
    );
  }

  if (!weatherData) {
    return null; // Should not happen if not loading and no error, but good practice
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{t('weather.title')}</h1>
          <button onClick={handleRefresh} className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full transition-colors">
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Location Search Section */}
        <div className="mb-6 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('weather.searchPlaceholder') || "Search for a city..."}
              value={searchQuery}
              onChange={handleSearchInput}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchLoading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <RefreshCw className="animate-spin h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {searchResults.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => selectLocation(city)}
                    className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{city.name}</div>
                      {city.state && (
                        <div className="text-sm text-gray-500">{city.state}, {city.country}</div>
                      )}
                      {!city.state && (
                        <div className="text-sm text-gray-500">{city.country}</div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFavorite(city)) {
                          removeFromFavorites(city);
                        } else {
                          addToFavorites(city);
                        }
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Star
                        size={16}
                        className={isFavorite(city) ? "text-yellow-400 fill-current" : "text-gray-400"}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Cities */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Cities</h3>
            <div className="flex flex-wrap gap-2">
              {popularCities.slice(0, 6).map((city, index) => (
                <button
                  key={index}
                  onClick={() => selectLocation(city)}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Locations */}
          {favoriteLocations.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Star size={16} className="mr-1 text-yellow-400" />
                Favorite Locations
              </h3>
              <div className="flex flex-wrap gap-2">
                {favoriteLocations.map((city, index) => (
                  <div key={index} className="flex items-center bg-yellow-50 rounded-full">
                    <button
                      onClick={() => selectLocation(city)}
                      className="px-3 py-1 text-sm text-yellow-700 hover:bg-yellow-100 rounded-l-full"
                    >
                      {city.name}
                    </button>
                    <button
                      onClick={() => removeFromFavorites(city)}
                      className="px-2 py-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 rounded-r-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Location Button */}
          <div className="flex justify-center">
            <button
              onClick={getCurrentLocation}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Navigation size={16} className="mr-2" />
              Use Current Location
            </button>
          </div>
        </div>

        {/* Weather Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'current', label: 'Current Weather', icon: '🌤️' },
              { id: 'hourly', label: '24 Hours', icon: '⏰' },
              { id: 'daily', label: '7 Days', icon: '📅' },
              { id: 'alerts', label: 'Alerts', icon: '⚠️' },
              { id: 'soil', label: 'Soil Info', icon: '🌱' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.id === 'alerts' && weatherAlerts.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {weatherAlerts.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Current Weather */}
        {activeTab === 'current' && (
          <>
            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <MapPin className="mr-2" size={20} />
                    <span className="text-xl font-semibold">{weatherData.name}</span>
                  </div>
                  <div className="text-5xl font-bold mb-2">{Math.round(weatherData.main.temp)}°C</div>
                  <div className="text-green-100 capitalize">{weatherData.weather[0].description}</div>
                </div>
                <div className="text-center">
                  {getWeatherIcon(weatherData.weather[0].icon)}
                </div>
              </div>
            </div>

            {/* Enhanced Weather Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Droplets className="mx-auto mb-2 text-blue-500" size={24} />
                <div className="text-xl font-bold">{weatherData.main.humidity}%</div>
                <div className="text-sm text-gray-600">{t('weather.humidity')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Wind className="mx-auto mb-2 text-gray-500" size={24} />
                <div className="text-xl font-bold">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</div>
                <div className="text-sm text-gray-600">{t('weather.windSpeed')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Eye className="mx-auto mb-2 text-purple-500" size={24} />
                <div className="text-xl font-bold">{weatherData.visibility / 1000} km</div>
                <div className="text-sm text-gray-600">{t('weather.visibility')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Thermometer className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-xl font-bold">{Math.round(weatherData.main.feels_like)}°C</div>
                <div className="text-sm text-gray-600">{t('weather.feelsLike')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌅</div>
                <div className="text-xl font-bold">{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="text-sm text-gray-600">Sunrise</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌇</div>
                <div className="text-xl font-bold">{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="text-sm text-gray-600">Sunset</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌡️</div>
                <div className="text-xl font-bold">{weatherData.main.pressure} hPa</div>
                <div className="text-sm text-gray-600">Pressure</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">☀️</div>
                <div className="text-xl font-bold">{weatherData.uv_index || 'N/A'}</div>
                <div className="text-sm text-gray-600">UV Index</div>
              </div>
            </div>
          </>
        )}

        {/* Hourly Weather */}
        {activeTab === 'hourly' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {hourlyWeather.slice(0, 12).map((hour, index) => (
                <div key={index} className="flex-shrink-0 bg-white border rounded-lg p-3 text-center min-w-[120px]">
                  <div className="text-sm text-gray-600 mb-2">
                    {new Date(hour.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div className="text-2xl mb-2">
                    {getWeatherIcon(hour.weather[0].icon)}
                  </div>
                  <div className="font-bold text-lg">{Math.round(hour.temp)}°C</div>
                  <div className="text-xs text-gray-500 mt-1">{Math.round(hour.humidity)}%</div>
                  {hour.rain && (
                    <div className="text-xs text-blue-500 mt-1">
                      {hour.rain['1h'].toFixed(1)}mm
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Weather */}
        {activeTab === 'daily' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
            <div className="space-y-3">
              {dailyWeather.map((day, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-medium w-20">
                      {index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString([], {weekday: 'short'})}
                    </div>
                    <div className="text-2xl">
                      {getWeatherIcon(day.weather[0].icon)}
                    </div>
                    <div className="text-sm text-gray-600 capitalize min-w-[100px]">
                      {day.weather[0].description}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="text-gray-500">High/Low</div>
                      <div className="font-medium">
                        {Math.round(day.temp.max)}°/{Math.round(day.temp.min)}°
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Humidity</div>
                      <div className="font-medium">{Math.round(day.humidity)}%</div>
                    </div>
                    {day.rain && (
                      <div className="text-center">
                        <div className="text-gray-500">Rain</div>
                        <div className="font-medium text-blue-600">{day.rain.toFixed(1)}mm</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weather Alerts */}
        {activeTab === 'alerts' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Weather Alerts</h3>
            {weatherAlerts.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="mx-auto mb-3 text-green-500" size={48} />
                <p className="text-green-700 font-medium">No active weather alerts</p>
                <p className="text-green-600 text-sm mt-1">Weather conditions are normal for your area</p>
              </div>
            ) : (
              <div className="space-y-4">
                {weatherAlerts.map((alert, index) => (
                  <div key={index} className={`border-l-4 rounded-lg p-4 ${
                    alert.severity === 'Minor' ? 'border-yellow-400 bg-yellow-50' :
                    alert.severity === 'Moderate' ? 'border-orange-400 bg-orange-50' :
                    'border-red-400 bg-red-50'
                  }`}>
                    <div className="flex items-center mb-2">
                      <AlertTriangle className={`mr-2 ${
                        alert.severity === 'Minor' ? 'text-yellow-500' :
                        alert.severity === 'Moderate' ? 'text-orange-500' :
                        'text-red-500'
                      }`} size={20} />
                      <h4 className="font-semibold text-gray-800">{alert.event}</h4>
                      <span className={`ml-auto px-2 py-1 text-xs font-medium rounded ${
                        alert.severity === 'Minor' ? 'bg-yellow-200 text-yellow-800' :
                        alert.severity === 'Moderate' ? 'bg-orange-200 text-orange-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{alert.description}</p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span>{' '}
                      {new Date(alert.start * 1000).toLocaleString()} - {new Date(alert.end * 1000).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Soil Conditions */}
        {activeTab === 'soil' && soilConditions && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Soil Conditions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-brown-50 p-4 rounded-lg text-center border">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-xl font-bold">{soilConditions.moisture.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Soil Moisture</div>
                <div className="text-xs mt-1 text-gray-500">
                  {soilConditions.moisture < 30 ? 'Dry - Needs irrigation' : 
                   soilConditions.moisture > 70 ? 'Very Wet' : 'Optimal'}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center border">
                <div className="text-2xl mb-2">🌡️</div>
                <div className="text-xl font-bold">{soilConditions.temperature.toFixed(1)}°C</div>
                <div className="text-sm text-gray-600">Soil Temperature</div>
                <div className="text-xs mt-1 text-gray-500">
                  {soilConditions.temperature < 15 ? 'Cold' : 
                   soilConditions.temperature > 30 ? 'Hot' : 'Good for crops'}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center border">
                <div className="text-2xl mb-2">🧪</div>
                <div className="text-xl font-bold">{soilConditions.ph.toFixed(1)}</div>
                <div className="text-sm text-gray-600">pH Level</div>
                <div className="text-xs mt-1 text-gray-500">
                  {soilConditions.ph < 6 ? 'Acidic' : 
                   soilConditions.ph > 8 ? 'Alkaline' : 'Neutral'}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center border">
                <div className="text-2xl mb-2">🍃</div>
                <div className="text-xl font-bold">{soilConditions.nitrogen.toFixed(0)} ppm</div>
                <div className="text-sm text-gray-600">Nitrogen (N)</div>
                <div className="text-xs mt-1 text-gray-500">
                  {soilConditions.nitrogen < 30 ? 'Low' : 
                   soilConditions.nitrogen > 60 ? 'High' : 'Adequate'}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center border">
                <div className="text-2xl mb-2">🟠</div>
                <div className="text-xl font-bold">{soilConditions.phosphorus.toFixed(0)} ppm</div>
                <div className="text-sm text-gray-600">Phosphorus (P)</div>
                <div className="text-xs mt-1 text-gray-500">
                  {soilConditions.phosphorus < 20 ? 'Low' : 
                   soilConditions.phosphorus > 40 ? 'High' : 'Adequate'}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center border">
                <div className="text-2xl mb-2">🟡</div>
                <div className="text-xl font-bold">{soilConditions.potassium.toFixed(0)} ppm</div>
                <div className="text-sm text-gray-600">Potassium (K)</div>
                <div className="text-xs mt-1 text-gray-500">
                  {soilConditions.potassium < 30 ? 'Low' : 
                   soilConditions.potassium > 60 ? 'High' : 'Adequate'}
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Soil Recommendations</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                {soilConditions.moisture < 30 && <li>• Increase irrigation frequency</li>}
                {soilConditions.ph < 6 && <li>• Consider adding lime to reduce acidity</li>}
                {soilConditions.ph > 8 && <li>• Add organic matter to reduce alkalinity</li>}
                {soilConditions.nitrogen < 30 && <li>• Apply nitrogen-rich fertilizers</li>}
                {soilConditions.phosphorus < 20 && <li>• Add phosphorus supplements</li>}
                {soilConditions.potassium < 30 && <li>• Use potassium-rich fertilizers</li>}
                <li>• Regular soil testing recommended every 3-6 months</li>
              </ul>
            </div>
          </div>
        )}

        {/* Weather Details (only show for current tab) */}
        {activeTab === 'current' && (
          <>
            {/* Weather Details */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Droplets className="mx-auto mb-2 text-blue-500" size={24} />
                <div className="text-xl font-bold">{weatherData.main.humidity}%</div>
                <div className="text-sm text-gray-600">{t('weather.humidity')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Wind className="mx-auto mb-2 text-gray-500" size={24} />
                <div className="text-xl font-bold">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</div>
                <div className="text-sm text-gray-600">{t('weather.windSpeed')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Eye className="mx-auto mb-2 text-purple-500" size={24} />
                <div className="text-xl font-bold">{weatherData.visibility / 1000} km</div>
                <div className="text-sm text-gray-600">{t('weather.visibility')}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Thermometer className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-xl font-bold">{Math.round(weatherData.main.feels_like)}°C</div>
                <div className="text-sm text-gray-600">{t('weather.feelsLike')}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Weather-based Crop Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{t('weather.recommendations')}</h2>
        
        {/* Spraying Advice Section */}
        {weatherData && (
          <div className={`mb-6 p-4 rounded-lg ${
            getSprayingAdvice()?.suitable 
              ? 'bg-green-50 border border-green-200'
              : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <h3 className="font-medium text-lg mb-2">
              {getSprayingAdvice()?.suitable ? '🌿 Spraying Conditions' : '⚠️ Spraying Advisory'}
            </h3>
            <p className={`${
              getSprayingAdvice()?.suitable ? 'text-green-700' : 'text-yellow-700'
            }`}>
              {getSprayingAdvice()?.message}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Wind className="mr-2" size={16} />
                <span>Wind Speed: {(weatherData.wind.speed * 3.6).toFixed(1)} km/h</span>
              </div>
              <div className="flex items-center">
                <Droplets className="mr-2" size={16} />
                <span>Humidity: {weatherData.main.humidity}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Recommendations */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-green-800">Daily Agricultural Recommendations</h3>
            <button 
              onClick={handleRefresh}
              className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          <ul className="space-y-3">
            {weatherData && (
              <>
                {/* Temperature based */}
                {weatherData.main.temp > 35 && (
                  <li className="flex items-start text-green-700">
                    <Thermometer className="mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>High temperature alert: Increase irrigation frequency and consider providing shade to sensitive crops</span>
                  </li>
                )}

                {/* Humidity based */}
                {weatherData.main.humidity > 80 && (
                  <li className="flex items-start text-green-700">
                    <Droplets className="mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>High humidity alert: Monitor crops for signs of fungal diseases. Ensure proper ventilation.</span>
                  </li>
                )}

                {/* Wind based */}
                {weatherData.wind.speed > 20 && (
                  <li className="flex items-start text-green-700">
                    <Wind className="mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Strong winds: Consider providing support to tall crops and delay any spraying operations.</span>
                  </li>
                )}

                {/* UV Index based */}
                {(weatherData.uv_index || 0) > 8 && (
                  <li className="flex items-start text-green-700">
                    <Sun className="mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>High UV index: Consider using shade nets for sensitive crops during peak hours.</span>
                  </li>
                )}

                {/* Visibility based */}
                {weatherData.visibility < 5000 && (
                  <li className="flex items-start text-green-700">
                    <Eye className="mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Low visibility conditions: Delay spraying operations until visibility improves.</span>
                  </li>
                )}

                {/* General recommendations */}
                <li className="flex items-start text-green-700">
                  <CloudRain className="mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Best time for irrigation is early morning or late evening to minimize water loss through evaporation.</span>
                </li>

                {/* Soil-based recommendations */}
                {soilConditions && (
                  <>
                    {soilConditions.moisture < 30 && (
                      <li className="flex items-start text-green-700">
                        <Droplets className="mr-2 mt-1 flex-shrink-0" size={16} />
                        <span>Low soil moisture detected: Schedule irrigation soon.</span>
                      </li>
                    )}
                    {soilConditions.temperature > 30 && (
                      <li className="flex items-start text-green-700">
                        <Thermometer className="mr-2 mt-1 flex-shrink-0" size={16} />
                        <span>High soil temperature: Consider mulching to regulate soil temperature.</span>
                      </li>
                    )}
                  </>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Link to Crop Info */}
        <div className="mt-6 p-4 bg-green-900 text-white rounded-lg">
          <h3 className="font-medium mb-2">Want crop-specific recommendations?</h3>
          <p className="text-green-100 mb-4">Check our detailed crop information section for weather-based cultivation guidelines.</p>
          <button
            onClick={() => window.location.href = '/crop-info'}
            className="bg-white text-green-900 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center"
          >
            View Crop Guidelines
            <MapPin className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Weather;
