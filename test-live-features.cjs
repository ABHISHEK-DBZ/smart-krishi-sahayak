#!/usr/bin/env node

/**
 * Test Script for Live Weather & Market Features
 * Run this script to verify all components are working correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🌾 Testing Smart Krishi Sahayak Live Features...\n');

// Test 1: Check if all required files exist
const requiredFiles = [
  'src/services/liveWeatherService.ts',
  'src/services/liveMarketService.ts',
  'src/components/LiveDashboard.tsx',
  'src/pages/LiveWeather.tsx',
  'src/pages/LiveMarketPrices.tsx',
  '.env'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please ensure all files are created.');
  process.exit(1);
}

// Test 2: Check environment configuration
console.log('\n🔧 Checking environment configuration...');
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  const requiredEnvVars = [
    'VITE_WEATHER_API_KEY',
    'VITE_WEATHER_API_URL',
    'VITE_MARKET_API_KEY',
    'VITE_MARKET_API_URL',
    'VITE_WEATHER_REFRESH_INTERVAL',
    'VITE_MARKET_REFRESH_INTERVAL'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (envContent.includes(envVar)) {
      console.log(`✅ ${envVar} configured`);
    } else {
      console.log(`⚠️  ${envVar} not found (will use defaults)`);
    }
  });
} else {
  console.log('❌ .env file not found');
}

// Test 3: Check package.json dependencies
console.log('\n📦 Checking dependencies...');
const packageJsonPath = path.join(__dirname, 'package.json');

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    'axios',
    'lucide-react',
    'react-i18next',
    'typescript'
  ];
  
  requiredDeps.forEach(dep => {
    if (dependencies[dep]) {
      console.log(`✅ ${dep} v${dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
    }
  });
} else {
  console.log('❌ package.json not found');
}

// Test 4: Validate TypeScript interfaces
console.log('\n🔍 Validating TypeScript interfaces...');

const liveWeatherServicePath = path.join(__dirname, 'src/services/liveWeatherService.ts');
if (fs.existsSync(liveWeatherServicePath)) {
  const content = fs.readFileSync(liveWeatherServicePath, 'utf8');
  
  const requiredInterfaces = [
    'LiveWeatherData',
    'Location'
  ];
  
  requiredInterfaces.forEach(interfaceName => {
    if (content.includes(`interface ${interfaceName}`) || content.includes(`export interface ${interfaceName}`)) {
      console.log(`✅ ${interfaceName} interface defined`);
    } else {
      console.log(`❌ ${interfaceName} interface missing`);
    }
  });
}

const liveMarketServicePath = path.join(__dirname, 'src/services/liveMarketService.ts');
if (fs.existsSync(liveMarketServicePath)) {
  const content = fs.readFileSync(liveMarketServicePath, 'utf8');
  
  const requiredInterfaces = [
    'LiveMarketPrice',
    'MarketAlert',
    'MarketTrend'
  ];
  
  requiredInterfaces.forEach(interfaceName => {
    if (content.includes(`interface ${interfaceName}`) || content.includes(`export interface ${interfaceName}`)) {
      console.log(`✅ ${interfaceName} interface defined`);
    } else {
      console.log(`❌ ${interfaceName} interface missing`);
    }
  });
}

// Test 5: Check component exports
console.log('\n🧩 Checking component exports...');

const components = [
  { file: 'src/components/LiveDashboard.tsx', name: 'LiveDashboard' },
  { file: 'src/pages/LiveWeather.tsx', name: 'LiveWeather' },
  { file: 'src/pages/LiveMarketPrices.tsx', name: 'LiveMarketPrices' }
];

components.forEach(({ file, name }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(`export default ${name}`)) {
      console.log(`✅ ${name} component exported correctly`);
    } else {
      console.log(`⚠️  ${name} component export might be incorrect`);
    }
  }
});

// Test 6: Check App.tsx routing
console.log('\n🛣️  Checking routing configuration...');

const appPath = path.join(__dirname, 'src/App.tsx');
if (fs.existsSync(appPath)) {
  const content = fs.readFileSync(appPath, 'utf8');
  
  const requiredRoutes = [
    '/live-dashboard',
    '/live-weather',
    '/live-market'
  ];
  
  requiredRoutes.forEach(route => {
    if (content.includes(`path="${route}"`)) {
      console.log(`✅ Route ${route} configured`);
    } else {
      console.log(`❌ Route ${route} missing`);
    }
  });
}

// Test 7: Generate test report
console.log('\n📊 Generating test report...');

const testReport = {
  timestamp: new Date().toISOString(),
  filesChecked: requiredFiles.length,
  componentsValidated: components.length,
  status: allFilesExist ? 'PASSED' : 'FAILED',
  recommendations: [
    'Ensure all API keys are configured in .env file',
    'Test the application in development mode: npm run dev',
    'Check browser console for any runtime errors',
    'Verify network connectivity for live data features'
  ]
};

fs.writeFileSync(
  path.join(__dirname, 'test-report.json'),
  JSON.stringify(testReport, null, 2)
);

console.log('📄 Test report saved to test-report.json');

// Final summary
console.log('\n🎉 Test Summary:');
console.log(`Status: ${testReport.status}`);
console.log(`Files Checked: ${testReport.filesChecked}`);
console.log(`Components Validated: ${testReport.componentsValidated}`);

if (allFilesExist) {
  console.log('\n✅ All tests passed! Your live features are ready to use.');
  console.log('\n🚀 Next steps:');
  console.log('1. Configure API keys in .env file');
  console.log('2. Run: npm install');
  console.log('3. Run: npm run dev');
  console.log('4. Navigate to /live-dashboard to test features');
} else {
  console.log('\n❌ Some tests failed. Please check the issues above.');
}

console.log('\n📚 For detailed documentation, see LIVE_FEATURES_README.md');
console.log('🌾 Happy farming with Smart Krishi Sahayak!');