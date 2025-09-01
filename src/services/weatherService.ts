import axios from 'axios';

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    rainfall: number;
    feelsLike: number;
    visibility: number;
    uv: number;
    pressure: number;
  };
  hourly: Array<{
    time: string;
    temp: number;
    humidity: number;
    rainfall: number;
    description: string;
  }>;
  daily: Array<{
    date: string;
    tempMax: number;
    tempMin: number;
    humidity: number;
    rainfall: number;
    description: string;
    windSpeed: number;
  }>;
  alerts?: Array<{
    event: string;
    description: string;
    start: number;
    end: number;
    severity: string;
  }>;
  agricultural: {
    soilMoisture: number;
    soilTemperature: number;
    evapotranspiration: number;
    growingDegreeDay: number;
  };
}

interface Location {
  lat: number;
  lon: number;
  name: string;
  state: string;
  country: string;
}

class WeatherService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private cachedWeatherData: Map<string, { data: WeatherData; timestamp: number }>;
  private readonly cacheExpiry = 1800000; // 30 minutes

  constructor() {
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY || '';
    this.apiUrl = 'https://api.openweathermap.org/data/3.0';
    this.cachedWeatherData = new Map();
  }

  async getLocationByName(cityName: string): Promise<Location | null> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/geo/1.0/direct?q=${cityName},IN&limit=1&appid=${this.apiKey}`
      );

      if (response.data && response.data.length > 0) {
        const location = response.data[0];
        return {
          lat: location.lat,
          lon: location.lon,
          name: location.name,
          state: location.state,
          country: location.country
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  async getCurrentLocation(): Promise<Location | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.get(
              `${this.apiUrl}/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${this.apiKey}`
            );

            if (response.data && response.data.length > 0) {
              const location = response.data[0];
              resolve({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                name: location.name,
                state: location.state,
                country: location.country
              });
            } else {
              resolve(null);
            }
          } catch (error) {
            console.error('Error getting location name:', error);
            resolve(null);
          }
        },
        () => resolve(null)
      );
    });
  }

  async getWeatherData(location: Location): Promise<WeatherData | null> {
    const cacheKey = `${location.lat},${location.lon}`;
    const cachedData = this.cachedWeatherData.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiry) {
      return cachedData.data;
    }

    try {
      const [currentWeather, forecast, agricultural] = await Promise.all([
        axios.get(
          `${this.apiUrl}/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${this.apiKey}`
        ),
        axios.get(
          `${this.apiUrl}/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${this.apiKey}`
        ),
        axios.get(
          `${this.apiUrl}/agro/1.0/weather?lat=${location.lat}&lon=${location.lon}&appid=${this.apiKey}`
        )
      ]);

      const weatherData: WeatherData = {
        current: {
          temp: currentWeather.data.main.temp,
          humidity: currentWeather.data.main.humidity,
          windSpeed: currentWeather.data.wind.speed,
          description: currentWeather.data.weather[0].description,
          rainfall: currentWeather.data.rain?.['1h'] || 0,
          feelsLike: currentWeather.data.main.feels_like,
          visibility: currentWeather.data.visibility,
          uv: currentWeather.data.uvi || 0,
          pressure: currentWeather.data.main.pressure
        },
        hourly: forecast.data.list.slice(0, 24).map((hour: any) => ({
          time: new Date(hour.dt * 1000).toLocaleTimeString(),
          temp: hour.main.temp,
          humidity: hour.main.humidity,
          rainfall: hour.rain?.['3h'] || 0,
          description: hour.weather[0].description
        })),
        daily: forecast.data.list.filter((item: any, index: number) => index % 8 === 0).map((day: any) => ({
          date: new Date(day.dt * 1000).toLocaleDateString(),
          tempMax: day.main.temp_max,
          tempMin: day.main.temp_min,
          humidity: day.main.humidity,
          rainfall: day.rain?.['3h'] || 0,
          description: day.weather[0].description,
          windSpeed: day.wind.speed
        })),
        agricultural: {
          soilMoisture: agricultural.data.soil.moisture,
          soilTemperature: agricultural.data.soil.temp,
          evapotranspiration: agricultural.data.et0 || 0,
          growingDegreeDay: agricultural.data.gdd || 0
        }
      };

      // Cache the data
      this.cachedWeatherData.set(cacheKey, {
        data: weatherData,
        timestamp: Date.now()
      });

      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  getWeatherAlerts(weatherData: WeatherData): Array<string> {
    const alerts: string[] = [];

    // Temperature alerts
    if (weatherData.current.temp > 35) {
      alerts.push('High temperature alert! Consider providing shade to sensitive crops.');
    } else if (weatherData.current.temp < 5) {
      alerts.push('Low temperature alert! Protect crops from frost damage.');
    }

    // Rainfall alerts
    if (weatherData.current.rainfall > 50) {
      alerts.push('Heavy rainfall alert! Ensure proper drainage in fields.');
    }

    // Wind alerts
    if (weatherData.current.windSpeed > 30) {
      alerts.push('Strong wind alert! Take measures to protect standing crops.');
    }

    // Humidity alerts
    if (weatherData.current.humidity > 85) {
      alerts.push('High humidity alert! Monitor for potential fungal diseases.');
    }

    return alerts;
  }

  getFarmingRecommendations(weatherData: WeatherData): Array<string> {
    const recommendations: string[] = [];
    const currentHour = new Date().getHours();

    // Time-based irrigation recommendation
    if (currentHour >= 6 && currentHour <= 8) {
      recommendations.push('Early morning is ideal for irrigation to minimize water loss.');
    }

    // Weather-based recommendations
    if (weatherData.current.temp > 30 && weatherData.current.humidity < 40) {
      recommendations.push('High evaporation conditions. Consider mulching to retain soil moisture.');
    }

    // Soil moisture based recommendations
    if (weatherData.agricultural.soilMoisture < 0.2) {
      recommendations.push('Low soil moisture detected. Irrigation may be needed.');
    }

    // Pest risk based on conditions
    if (weatherData.current.humidity > 80 && weatherData.current.temp > 25) {
      recommendations.push('Conditions favorable for fungal growth. Monitor crops closely.');
    }

    return recommendations;
  }

  isSuitableForSpraying(weatherData: WeatherData): boolean {
    return (
      weatherData.current.windSpeed < 10 &&
      !weatherData.current.rainfall &&
      weatherData.current.humidity < 85
    );
  }
}

export default new WeatherService();
