export interface WeatherData {
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
  rain?: {
    '1h': number;
    '3h'?: number;
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

export interface HourlyWeather {
  dt: number;
  temp: number;
  humidity: number;
  weather: {
    description: string;
    icon: string;
  }[];
  rain?: { '1h': number };
}

export interface DailyWeather {
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

export interface WeatherAlert {
  event: string;
  description: string;
  start: number;
  end: number;
  severity: 'Minor' | 'Moderate' | 'Severe';
}

export interface SoilConditions {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface WeatherRecommendation {
  type: 'weather' | 'soil' | 'crop';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  actionItems: string[];
}

export interface WeatherSettings {
  units: 'metric' | 'imperial';
  language: string;
  refreshInterval: number;
  alertsEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface AgroMetData {
  soilTemperature?: number;
  soilMoisture?: number;
  leafWetness?: number;
  rainfall?: number;
  evapotranspiration?: number;
  growingDegreeDay?: number;
}

export type WeatherUnit = 'metric' | 'imperial';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'ms' | 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';
