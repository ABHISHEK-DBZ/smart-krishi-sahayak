import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sprout, 
  Leaf, 
  ShoppingCart,
  BookOpen,
  Calendar,
  MapPin,
  Search,
  Info
} from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  nameHindi: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual';
  soilType: string;
  soilTypeHindi: string;
  waterRequirement: string;
  waterRequirementHindi: string;
  growthPeriod: string;
  growthPeriodHindi: string;
  seedVarieties: string[];
  seedVarietiesHindi: string[];
  fertilizer: string[];
  fertilizerHindi: string[];
  bestPractices: string[];
  bestPracticesHindi: string[];
  image: string;
}

const CropInfo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeason, setFilterSeason] = useState('All');

  const crops: Crop[] = [
    {
      id: '1',
      name: 'Rice',
      nameHindi: 'चावल',
      season: 'Kharif',
      soilType: 'Clayey, Loamy',
      soilTypeHindi: 'चिकनी, दोमट',
      waterRequirement: 'High (1200-1800mm)',
      waterRequirementHindi: 'उच्च (1200-1800 मिमी)',
      growthPeriod: '120-150 days',
      growthPeriodHindi: '120-150 दिन',
      seedVarieties: ['IR64', 'Pusa Basmati 1121', 'Swarna'],
      seedVarietiesHindi: ['आईआर64', 'पूसा बासमती 1121', 'स्वर्ण'],
      fertilizer: ['Urea', 'DAP', 'MOP', 'Zinc Sulphate'],
      fertilizerHindi: ['यूरिया', 'डीएपी', 'एमओपी', 'जिंक सल्फेट'],
      bestPractices: [
        'Maintain 2-5cm water level in field',
        'Transplant 25-30 day old seedlings',
        'Apply fertilizers in 3 split doses',
        'Control weeds at 20-25 days after transplanting'
      ],
      bestPracticesHindi: [
        'खेत में 2-5 सेमी पानी का स्तर बनाए रखें',
        '25-30 दिन पुराने अंकुरों का प्रत्यारोपण करें',
        '3 विभाजित खुराकों में उर्वरक डालें',
        'प्रत्यारोपण के 20-25 दिन बाद खरपतवार नियंत्रित करें'
      ],
      image: '/images/rice.jpg'
    },
    {
      id: '2',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      season: 'Rabi',
      soilType: 'Well-drained Loamy',
      soilTypeHindi: 'अच्छी जल निकासी वाली दोमट',
      waterRequirement: 'Medium (400-600mm)',
      waterRequirementHindi: 'मध्यम (400-600 मिमी)',
      growthPeriod: '120-140 days',
      growthPeriodHindi: '120-140 दिन',
      seedVarieties: ['HD-2967', 'PBW-343', 'WH-711'],
      seedVarietiesHindi: ['एचडी-2967', 'पीबीडब्ल्यू-343', 'डब्ल्यूएच-711'],
      fertilizer: ['Urea', 'DAP', 'MOP'],
      fertilizerHindi: ['यूरिया', 'डीएपी', 'एमओपी'],
      bestPractices: [
        'Sow between October-December',
        'Maintain row spacing of 20-22.5cm',
        'First irrigation at Crown Root Initiation stage (20-25 DAS)',
        'Control yellow rust with timely fungicide spray'
      ],
      bestPracticesHindi: [
        'अक्टूबर-दिसंबर के बीच बुवाई करें',
        'पंक्ति की दूरी 20-22.5 सेमी बनाए रखें',
        'क्राउन रूट इनिशिएशन चरण (20-25 डीएएस) पर पहली सिंचाई करें',
        'समय पर कवकनाशी स्प्रे से पीले रस्ट को नियंत्रित करें'
      ],
      image: '/images/wheat.jpg'
    },
    {
      id: '3',
      name: 'Cotton',
      nameHindi: 'कपास',
      season: 'Kharif',
      soilType: 'Black cotton soil, Alluvial',
      soilTypeHindi: 'काली कपास मिट्टी, जलोढ़',
      waterRequirement: 'Medium (500-800mm)',
      waterRequirementHindi: 'मध्यम (500-800 मिमी)',
      growthPeriod: '180-200 days',
      growthPeriodHindi: '180-200 दिन',
      seedVarieties: ['Bt Cotton varieties', 'Desi cotton'],
      seedVarietiesHindi: ['बीटी कपास की किस्में', 'देसी कपास'],
      fertilizer: ['Urea', 'DAP', 'MOP', 'Boron'],
      fertilizerHindi: ['यूरिया', 'डीएपी', 'एमओपी', 'बोरॉन'],
      bestPractices: [
        'Maintain proper plant spacing (e.g., 45x15cm)',
        'Regular monitoring for pink bollworm',
        'Use drip irrigation for water efficiency',
        'Harvest when bolls are fully opened and fluffy'
      ],
      bestPracticesHindi: [
        'उचित पौधे की दूरी बनाए रखें (जैसे, 45x15 सेमी)',
        'गुलाबी सुंडी के लिए नियमित निगरानी करें',
        'जल दक्षता के लिए ड्रिप सिंचाई का उपयोग करें',
        'जब डोडे पूरी तरह से खुल जाएं और फूल जाएं तब कटाई करें'
      ],
      image: '/images/cotton.jpg'
    },
    {
      id: '4',
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      season: 'Annual',
      soilType: 'Deep, well-drained Loamy',
      soilTypeHindi: 'गहरी, अच्छी जल निकासी वाली दोमट',
      waterRequirement: 'High (1500-2000mm)',
      waterRequirementHindi: 'उच्च (1500-2000 मिमी)',
      growthPeriod: '12-18 months',
      growthPeriodHindi: '12-18 महीने',
      seedVarieties: ['Co-86032', 'Co-0238', 'CoC-671'],
      seedVarietiesHindi: ['सीओ-86032', 'सीओ-0238', 'सीओसी-671'],
      fertilizer: ['Urea', 'SSP', 'MOP', 'FYM'],
      fertilizerHindi: ['यूरिया', 'एसएसपी', 'एमओपी', 'एफवाईएम'],
      bestPractices: [
        'Plant setts in furrows 1.2m apart',
        'Apply pre-emergence herbicides for weed control',
        'Earthing up at 2 months to support the plant',
        'Harvest when sucrose content is optimal (10-12 months)'
      ],
      bestPracticesHindi: [
        '1.2 मीटर की दूरी पर खांचों में सेट लगाएं',
        'खरपतवार नियंत्रण के लिए उद्भव-पूर्व शाकनाशियों का प्रयोग करें',
        'पौधे को सहारा देने के लिए 2 महीने पर मिट्टी चढ़ाएं',
        'जब सुक्रोज की मात्रा इष्टतम हो (10-12 महीने) तब कटाई करें'
      ],
      image: '/images/sugarcane.jpg'
    }
  ];

  const seasons = useMemo(() => ['All', ...new Set(crops.map(c => c.season))], []);

  const filteredCrops = useMemo(() => crops.filter(crop => {
    const lang = i18n.language;
    const matchesSearch = searchTerm === '' || 
      (lang === 'hi' ? crop.nameHindi : crop.name).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = filterSeason === 'All' || crop.season === filterSeason;
    return matchesSearch && matchesSeason;
  }), [crops, searchTerm, filterSeason, i18n.language]);

  const CropCard = ({ crop }: { crop: Crop }) => {
    const lang = i18n.language;
    return (
      <div
        onClick={() => setSelectedCrop(crop)}
        className="border rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-white transform hover:-translate-y-1 cursor-pointer"
      >
        <div className="flex items-center mb-3">
          <Leaf className="text-green-500 mr-3" />
          <h3 className="font-bold text-lg text-gray-800">{lang === 'hi' ? crop.nameHindi : crop.name}</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar size={14} className="mr-2" /> {t(`crops.seasons.${crop.season.toLowerCase()}`)}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={14} className="mr-2" /> {lang === 'hi' ? crop.soilTypeHindi : crop.soilType}
          </div>
        </div>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold">
          {t('crops.viewDetails')}
        </button>
      </div>
    );
  };

  const CropModal = ({ crop, onClose }: { crop: Crop | null, onClose: () => void }) => {
    if (!crop) return null;
    const lang = i18n.language;

    const DetailSection = ({ title, items, icon: Icon }: { title: string, items: string[], icon: React.ElementType }) => (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center text-gray-700">
                <Icon className="mr-2 text-green-500" /> {title}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="p-6 sticky top-0 bg-white border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">{lang === 'hi' ? crop.nameHindi : crop.name}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <DetailSection title={t('crops.growingInfo')} items={[
                            `${t('crops.season')}: ${t(`crops.seasons.${crop.season.toLowerCase()}`)}`,
                            `${t('crops.growthPeriod')}: ${lang === 'hi' ? crop.growthPeriodHindi : crop.growthPeriod}`,
                            `${t('crops.soilType')}: ${lang === 'hi' ? crop.soilTypeHindi : crop.soilType}`,
                            `${t('crops.waterRequirement')}: ${lang === 'hi' ? crop.waterRequirementHindi : crop.waterRequirement}`
                        ]} icon={Info} />
                        <DetailSection title={t('crops.seedsAndFertilizers')} items={[
                            `${t('crops.seedVarieties')}: ${(lang === 'hi' ? crop.seedVarietiesHindi : crop.seedVarieties).join(', ')}`,
                            `${t('crops.fertilizers')}: ${(lang === 'hi' ? crop.fertilizerHindi : crop.fertilizer).join(', ')}`
                        ]} icon={ShoppingCart} />
                    </div>
                    <DetailSection title={t('crops.bestPractices')} items={lang === 'hi' ? crop.bestPracticesHindi : crop.bestPractices} icon={BookOpen} />
                </div>
                <div className="p-6 sticky bottom-0 bg-white border-t flex justify-end">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                        {t('common.close')}
                    </button>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-8 p-4 md:p-0">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Sprout className="h-8 w-8 text-green-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('crops.title')}</h1>
                    <p className="text-gray-500">{t('crops.subtitle')}</p>
                </div>
            </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-50 p-4 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder={t('crops.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <select
                    value={filterSeason}
                    onChange={(e) => setFilterSeason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                    {seasons.map(season => (
                        <option key={season} value={season}>
                            {season === 'All' ? t('crops.allSeasons') : t(`crops.seasons.${season.toLowerCase()}`)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map(crop => <CropCard key={crop.id} crop={crop} />)}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 text-lg">{t('crops.noResults')}</p>
        </div>
      )}

      <CropModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
    </div>
  );
};

export default CropInfo;
