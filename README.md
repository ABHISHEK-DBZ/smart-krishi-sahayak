# 🌾 Smart Krishi Sahayak - Advanced Agriculture Assistant

![Smart Krishi Sahayak](https://img.shields.io/badge/Smart%20Krishi%20Sahayak-Agriculture%20Assistant-green?style=for-the-badge&logo=leaf)

**Smart Krishi Sahayak** is a comprehensive agriculture assistance application designed specifically for Indian farmers. The app provides advanced weather forecasting, AI-powered disease detection, crop information, market prices, and government schemes information in multiple Indian languages.

## ✨ Key Features

### �️ **Advanced 5-Tab Weather System**
- **Current Weather**: Real-time conditions with detailed metrics
- **24-Hour Forecast**: Hourly predictions with rain probability
- **7-Day Forecast**: Weekly weather planning for farmers
- **Weather Alerts**: Critical warnings for crop protection
- **Soil Analysis**: NPK levels, pH monitoring, moisture content with recommendations
- **Location Search**: Search any city with favorites management
- **Agricultural Recommendations**: Weather-based farming advice

### 🔬 **AI-Powered Disease Detection**
- **Smart Plant Recognition**: Advanced image validation - no more false positives!
- **Accurate Disease Identification**: Fixed the "watch detected as rice disease" issue
- **Confidence Scoring**: Visual 25-85% accuracy indicators
- **Comprehensive Analysis**: Symptoms, causes, treatment, prevention, and pesticide recommendations
- **Image Quality Validation**: Automatic brightness, contrast, and resolution checks
- **Multi-language Error Messages**: Hindi + English validation feedback

### 🌱 **Crop Information Database**
- Detailed crop cultivation guides
- Seed varieties and recommendations
- Soil compatibility analysis
- Seasonal planting calendars
- Best practices and care instructions

### � **Market Prices (Mandi Rates)**
- Real-time commodity pricing
- Historical price trends
- Market analysis and predictions
- Price alerts for specific crops
- Multi-location price comparison

### 🏛️ **Government Schemes Portal**
- PM-KISAN, PMFBY, and other scheme information
- Eligibility criteria and application procedures
- Required documentation checklists
- Scheme benefits calculator
- Direct links to government portals

### 🗣️ **Multi-Language Support (7 Languages)**
- **Hindi (हिंदी)**, **Marathi (मराठी)**, **Gujarati (ગુજરાતી)**
- **Tamil (தமிழ்)**, **Telugu (తెలుగు)**, **Punjabi (ਪੰਜਾਬੀ)**, **English**
- **Voice Support**: Speech recognition and text-to-speech in all languages
- **Regional Content**: Localized farming information

### 🤖 **AI Assistant**
- Voice-enabled crop consultation
- Natural language query processing
- Personalized farming recommendations
- Expert agricultural advice

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Internationalization**: React i18next
- **HTTP Client**: Axios

## 📱 App Architecture

The app follows a modular architecture with separate pages for each feature:

```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx      # Navigation component
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Weather.tsx     # Weather information
│   ├── CropInfo.tsx    # Crop details and guides
│   ├── DiseaseDetection.tsx # Disease detection
│   ├── MandiPrices.tsx # Market prices
│   ├── GovernmentSchemes.tsx # Govt schemes
│   └── Profile.tsx     # User profile
├── i18n/               # Internationalization
│   ├── config.ts       # i18n configuration
│   └── locales/        # Translation files
│       ├── en.json     # English translations
│       └── hi.json     # Hindi translations
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-krishi-sahayak
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_AGMARKNET_API_URL=https://api.data.gov.in/resource/
VITE_API_BASE_URL=your_backend_api_url
```

### API Integration

The app integrates with several APIs:

- **OpenWeatherMap API**: For weather data
- **Agmarknet API**: For mandi prices
- **Government APIs**: For scheme information

## 📊 Features Overview

### Dashboard
- Welcome screen with quick access to all features
- Today's weather summary
- Market price highlights
- Recent alerts and notifications

### Weather Module
- Current weather conditions
- 7-day forecast
- Weather-based farming recommendations
- Location-based weather data

### Crop Information
- Comprehensive crop database
- Seed varieties and recommendations
- Soil compatibility information
- Best practices for cultivation

### Disease Detection
- Image-based disease identification
- Treatment recommendations
- Pesticide safety guidelines
- Prevention strategies

### Mandi Prices
- Real-time market prices
- Price trend analysis
- Multi-location price comparison
- Market timing recommendations

### Government Schemes
- Active scheme listings
- Eligibility checker
- Application process guides
- Direct portal links

## 🌐 Multilingual Support

The app supports:
- **Hindi (हिंदी)**: Primary language for farmers
- **English**: Secondary language support

Switch languages using the language toggle in the navigation bar.

## 📱 Mobile Responsive

The app is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🎯 Target Users

- Small and marginal farmers
- Agricultural extension workers
- Farm advisors
- Agricultural students
- Rural entrepreneurs

## 🚀 Future Enhancements

- **AI-powered crop disease detection**: Advanced image recognition
- **Voice assistant**: Hindi voice commands for farmers
- **IoT sensor integration**: Real-time field monitoring
- **Blockchain integration**: Supply chain transparency
- **Offline mode**: Core features without internet
- **GPS integration**: Location-based recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and queries:
- Email: abhibro936@gmail.com
- Website: https://smartkrishisahayak.com
- Phone: +91-7841938644

## 🙏 Acknowledgments

- Thanks to all farmers who provided feedback
- Government of India for open data APIs
- Open source community for amazing tools
- Agriculture departments for domain knowledge

---

**Smart Krishi Sahayak** - Empowering Farmers with Technology 🌾
