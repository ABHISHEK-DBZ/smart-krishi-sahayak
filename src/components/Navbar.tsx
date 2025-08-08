import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Cloud, 
  Sprout, 
  Bug, 
  TrendingUp, 
  FileText, 
  User,
  Languages,
  Bot,
  ChevronDown
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('navigation.dashboard') },
    { path: '/weather', icon: Cloud, label: t('navigation.weather') },
    { path: '/crop-info', icon: Sprout, label: t('navigation.crops') },
    { path: '/disease-detection', icon: Bug, label: t('navigation.diseases') },
    { path: '/mandi-prices', icon: TrendingUp, label: t('navigation.prices') },
    { path: '/schemes', icon: FileText, label: t('navigation.schemes') },
    { path: '/agent', icon: Bot, label: t('navigation.agent') },
    { path: '/profile', icon: User, label: t('navigation.profile') },
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-green-500">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-800">
              {t('app.title')}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'text-gray-600 hover:text-green-800 hover:bg-green-50'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center space-x-1 px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <Languages className="h-4 w-4" />
              <span>{currentLanguage.nativeName}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-green-50 transition-colors
                        ${i18n.language === language.code 
                          ? 'bg-green-100 text-green-800' 
                          : 'text-gray-700'
                        }`}
                    >
                      {language.nativeName} ({language.name})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-green-50 border-t">
        <div className="flex overflow-x-auto py-2 px-4 space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center min-w-16 py-2 px-3 rounded-md text-xs transition-colors
                  ${isActive 
                    ? 'bg-green-200 text-green-800' 
                    : 'text-gray-600 hover:text-green-800'
                  }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
