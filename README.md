# Smart Krishi Sahayak - Agriculture Assistant App

A comprehensive agriculture assistant app that provides real-time weather updates, crop information, disease detection, mandi prices, and government schemes for farmers.

## 🌟 Features

### 🤖 AI Agriculture Agent
- GPT-powered farming assistant
- Real-time farming advice and solutions
- Crop-specific recommendations
- Disease diagnosis and treatment suggestions
- Government scheme guidance
- Voice interaction support
- Multilingual responses (Hindi/English)

### 🌦️ Weather Module
- Real-time weather forecast (rainfall, humidity, temperature)
- Location-based weather data
- Weather-based crop disease prediction
- 7-day weather forecast

### 🌾 Crop Information
- Detailed crop information including seed types and best practices
- Soil compatibility guidance
- Fertilizer and pesticide recommendations
- Seasonal planting guides

### 🐛 Disease & Pesticide Recommendation
- AI-powered crop disease detection from images
- Pesticide usage recommendations
- Safety guidelines and dosage information
- Common disease database

### 📈 Mandi Price Module
- Daily market prices from Agmarknet
- Crop-wise and location-wise filtering
- Price trend analysis
- Market recommendations

### 💰 Government Scheme Information
- Latest government schemes and subsidies
- Eligibility criteria and application process
- Direct links to official portals
- Multi-language support

### 🔔 Smart Alerts
- Weather warnings and forecasts
- Crop care reminders
- Price alerts and market updates
- Government scheme notifications

### 🌍 Multilingual Support
- Hindi and English language support
- Easy language switching
- Localized content for farmers

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
# OpenAI API for AI Agriculture Agent
VITE_OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# Weather API (Optional - has fallback data)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

# Government APIs (Optional - has fallback data)
VITE_AGMARKNET_API_URL=https://api.data.gov.in/resource/
```

### Setting up OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the key and add it to your `.env` file
5. Restart the development server

**Note**: The AI Agent will work with sample responses if no API key is provided, but for genuine agricultural advice, an OpenAI API key is required.

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
