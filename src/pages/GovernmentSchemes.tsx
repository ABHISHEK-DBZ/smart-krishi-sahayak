import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  DollarSign, 
  Users, 
  Calendar,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Search,
  Award,
  Info
} from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  benefits: string[];
  benefitsHindi: string[];
  eligibility: string[];
  eligibilityHindi: string[];
  documents: string[];
  documentsHindi: string[];
  applicationProcess: string[];
  applicationProcessHindi: string[];
  deadline: string;
  deadlineHindi: string;
  subsidy: string;
  subsidyHindi: string;
  category: 'Direct Benefit' | 'Soil Management' | 'Insurance' | 'Credit' | 'Infrastructure';
  status: 'active' | 'upcoming' | 'expired';
  link: string;
}

const GovernmentSchemes: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM-KISAN',
      nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
      description: 'A central sector scheme with 100% funding from Government of India. It has become operational from 1.12.2018. Under the scheme an income support of 6,000/- per year in three equal installments will be provided to all land holding farmer families.',
      descriptionHindi: 'भारत सरकार से 100% वित्त पोषण के साथ एक केंद्रीय क्षेत्र की योजना। यह 1.12.2018 से चालू हो गया है। योजना के तहत सभी भूमि धारक किसान परिवारों को तीन समान किस्तों में प्रति वर्ष 6,000/- की आय सहायता प्रदान की जाएगी।',
      benefits: ['₹6000 per year in 3 installments', 'Direct Benefit Transfer to bank account', 'Financial support for small and marginal farmers'],
      benefitsHindi: ['3 किस्तों में प्रति वर्ष ₹6000', 'बैंक खाते में प्रत्यक्ष लाभ हस्तांतरण', 'छोटे और सीमांत किसानों के लिए वित्तीय सहायता'],
      eligibility: ['All landholding farmer families', 'Must have cultivable land', 'Aadhaar card is mandatory'],
      eligibilityHindi: ['सभी भूमिधारक किसान परिवार', 'खेती योग्य भूमि होनी चाहिए', 'आधार कार्ड अनिवार्य है'],
      documents: ['Aadhaar Card', 'Land ownership documents (Khasra/Khatauni)', 'Bank account passbook'],
      documentsHindi: ['आधार कार्ड', 'भूमि स्वामित्व दस्तावेज (खसरा/खतौनी)', 'बैंक खाता पासबुक'],
      applicationProcess: ['Online registration on PM-KISAN portal', 'Through Common Service Centers (CSC)', 'State-designated nodal officers'],
      applicationProcessHindi: ['पीएम-किसान पोर्टल पर ऑनलाइन पंजीकरण', 'कॉमन सर्विस सेंटर (सीएससी) के माध्यम से', 'राज्य-नामित नोडल अधिकारी'],
      deadline: 'Ongoing',
      deadlineHindi: 'चालू है',
      subsidy: '₹6000/year',
      subsidyHindi: '₹6000/वर्ष',
      category: 'Direct Benefit',
      status: 'active',
      link: 'https://pmkisan.gov.in/'
    },
    {
      id: '2',
      name: 'Soil Health Card Scheme',
      nameHindi: 'मृदा स्वास्थ्य कार्ड योजना',
      description: 'A scheme to provide all farmers with a Soil Health Card, which provides information on the nutrient status of their soil along with recommendations on the appropriate dosage of nutrients to be applied for improving soil health and fertility.',
      descriptionHindi: 'सभी किसानों को मृदा स्वास्थ्य कार्ड प्रदान करने की एक योजना, जो उनकी मिट्टी की पोषक स्थिति के बारे में जानकारी प्रदान करती है और साथ ही मिट्टी के स्वास्थ्य और उर्वरता में सुधार के लिए लागू किए जाने वाले पोषक तत्वों की उचित खुराक पर सिफारिशें भी करती है।',
      benefits: ['Scientific basis for fertilizer application', 'Reduces cultivation cost', 'Improves soil health and crop yield'],
      benefitsHindi: ['उर्वरक आवेदन के लिए वैज्ञानिक आधार', 'खेती की लागत कम करता है', 'मृदा स्वास्थ्य और फसल की उपज में सुधार करता है'],
      eligibility: ['All farmers are eligible', 'Soil sample must be provided for testing'],
      eligibilityHindi: ['सभी किसान पात्र हैं', 'परीक्षण के लिए मिट्टी का नमूना प्रदान किया जाना चाहिए'],
      documents: ['Land records', 'Aadhaar card'],
      documentsHindi: ['भूमि रिकॉर्ड', 'आधार कार्ड'],
      applicationProcess: ['Contact local agriculture office or Krishi Vigyan Kendra (KVK)', 'Soil samples are collected by trained personnel', 'Card is delivered to the farmer'],
      applicationProcessHindi: ['स्थानीय कृषि कार्यालय या कृषि विज्ञान केंद्र (KVK) से संपर्क करें', 'प्रशिक्षित कर्मियों द्वारा मिट्टी के नमूने एकत्र किए जाते हैं', 'कार्ड किसान को दिया जाता है'],
      deadline: 'Every 2 years',
      deadlineHindi: 'हर 2 साल में',
      subsidy: 'Free soil testing and card',
      subsidyHindi: 'मुफ्त मिट्टी परीक्षण और कार्ड',
      category: 'Soil Management',
      status: 'active',
      link: 'https://soilhealth.dac.gov.in/'
    },
    {
      id: '3',
      name: 'PMFBY',
      nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
      description: 'Pradhan Mantri Fasal Bima Yojana is the government sponsored crop insurance scheme that integrates multiple stakeholders on a single platform.',
      descriptionHindi: 'प्रधानमंत्री फसल बीमा योजना सरकार द्वारा प्रायोजित फसल बीमा योजना है जो एक ही मंच पर कई हितधारकों को एकीकृत करती है।',
      benefits: ['Comprehensive risk coverage', 'Low premium for farmers', 'Use of technology for assessment'],
      benefitsHindi: ['व्यापक जोखिम कवरेज', 'किसानों के लिए कम प्रीमियम', 'मूल्यांकन के लिए प्रौद्योगिकी का उपयोग'],
      eligibility: ['All farmers including sharecroppers and tenant farmers', 'Must have insurable interest in the crop'],
      eligibilityHindi: ['बटाईदारों और काश्तकारों सहित सभी किसान', 'फसल में बीमा योग्य हित होना चाहिए'],
      documents: ['Land records', 'Sowing certificate', 'Bank account details'],
      documentsHindi: ['भूमि रिकॉर्ड', 'बुवाई प्रमाण पत्र', 'बैंक खाते का विवरण'],
      applicationProcess: ['Through banks, CSCs, or the National Crop Insurance Portal', 'Enrollment is compulsory for loanee farmers'],
      applicationProcessHindi: ['बैंकों, सीएससी, या राष्ट्रीय फसल बीमा पोर्टल के माध्यम से', 'ऋणी किसानों के लिए नामांकन अनिवार्य है'],
      deadline: 'Varies by crop and season',
      deadlineHindi: 'फसल और मौसम के अनुसार बदलता रहता है',
      subsidy: 'Uniform premium of 2% for Kharif, 1.5% for Rabi',
      subsidyHindi: 'खरीफ के लिए 2%, रबी के लिए 1.5% का समान प्रीमियम',
      category: 'Insurance',
      status: 'active',
      link: 'https://pmfby.gov.in/'
    },
    {
      id: '4',
      name: 'Kisan Credit Card (KCC)',
      nameHindi: 'किसान क्रेडिट कार्ड (केसीसी)',
      description: 'The KCC scheme aims at providing adequate and timely credit support from the banking system under a single window with flexible and simplified procedure to the farmers for their cultivation and other needs.',
      descriptionHindi: 'केसीसी योजना का उद्देश्य किसानों को उनकी खेती और अन्य जरूरतों के लिए लचीली और सरलीकृत प्रक्रिया के साथ एकल खिड़की के तहत बैंकिंग प्रणाली से पर्याप्त और समय पर ऋण सहायता प्रदान करना है।',
      benefits: ['Credit for crop production, post-harvest expenses', 'Consumption requirements of farmer household', 'Investment credit for farm assets'],
      benefitsHindi: ['फसल उत्पादन, कटाई के बाद के खर्चों के लिए ऋण', 'किसान परिवार की खपत की आवश्यकताएं', 'कृषि संपत्ति के लिए निवेश ऋण'],
      eligibility: ['All farmers - individuals/joint borrowers who are owner cultivators', 'Tenant farmers, oral lessees & sharecroppers'],
      eligibilityHindi: ['सभी किसान - व्यक्ति/संयुक्त उधारकर्ता जो मालिक कृषक हैं', 'किरायेदार किसान, मौखिक पट्टेदार और बटाईदार'],
      documents: ['Completed application form', 'Identity and address proof', 'Land documents'],
      documentsHindi: ['पूरा आवेदन पत्र', 'पहचान और पते का प्रमाण', 'भूमि दस्तावेज'],
      applicationProcess: ['Approach a bank branch', 'Fill the application form', 'Submit documents'],
      applicationProcessHindi: ['बैंक शाखा से संपर्क करें', 'आवेदन पत्र भरें', 'दस्तावेज जमा करें'],
      deadline: 'Ongoing',
      deadlineHindi: 'चालू है',
      subsidy: 'Interest subvention of 2% per annum',
      subsidyHindi: 'प्रति वर्ष 2% की ब्याज छूट',
      category: 'Credit',
      status: 'active',
      link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card-kcc'
    }
  ];

  const categories = useMemo(() => ['All', ...new Set(schemes.map(s => s.category))], []);

  const filteredSchemes = useMemo(() => schemes.filter(scheme => {
    const lang = i18n.language;
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.nameHindi.includes(searchTerm) ||
      (lang === 'hi' ? scheme.descriptionHindi : scheme.description).toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  }), [schemes, selectedCategory, searchTerm, i18n.language]);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'active': return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
      case 'upcoming': return { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'expired': return { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' };
      default: return { icon: Info, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const SchemeCard = ({ scheme }: { scheme: Scheme }) => {
    const StatusIcon = getStatusClasses(scheme.status).icon;
    const lang = i18n.language;
    return (
      <div
        className="border rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-white transform hover:-translate-y-1 cursor-pointer"
        onClick={() => setSelectedScheme(scheme)}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{lang === 'hi' ? scheme.nameHindi : scheme.name}</h3>
            <p className="text-sm text-gray-500">{scheme.category}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusClasses(scheme.status).bg} ${getStatusClasses(scheme.status).color}`}>
            <StatusIcon size={14} />
            {t(`schemes.status.${scheme.status}`)}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{lang === 'hi' ? scheme.descriptionHindi : scheme.description}</p>
        <div className="border-t pt-3 flex justify-between items-center text-sm">
          <div className="flex items-center text-green-600 font-medium">
            <DollarSign size={16} className="mr-1" /> {lang === 'hi' ? scheme.subsidyHindi : scheme.subsidy}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-1" /> {lang === 'hi' ? scheme.deadlineHindi : scheme.deadline}
          </div>
        </div>
      </div>
    );
  };

  const SchemeModal = ({ scheme, onClose }: { scheme: Scheme | null, onClose: () => void }) => {
    if (!scheme) return null;
    const lang = i18n.language;

    const DetailSection = ({ title, items, icon: Icon }: { title: string, items: string[], icon: React.ElementType }) => (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center text-gray-700">
          <Icon className="mr-2 text-orange-500" /> {title}
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
          {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="p-6 sticky top-0 bg-white border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{lang === 'hi' ? scheme.nameHindi : scheme.name}</h2>
                <p className="text-gray-500">{scheme.category}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <p className="text-gray-700">{lang === 'hi' ? scheme.descriptionHindi : scheme.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailSection title={t('schemes.benefits')} items={lang === 'hi' ? scheme.benefitsHindi : scheme.benefits} icon={Award} />
              <DetailSection title={t('schemes.eligibility')} items={lang === 'hi' ? scheme.eligibilityHindi : scheme.eligibility} icon={Users} />
              <DetailSection title={t('schemes.documents')} items={lang === 'hi' ? scheme.documentsHindi : scheme.documents} icon={FileText} />
              <DetailSection title={t('schemes.application')} items={lang === 'hi' ? scheme.applicationProcessHindi : scheme.applicationProcess} icon={Calendar} />
            </div>
          </div>
          <div className="p-6 sticky bottom-0 bg-white border-t flex justify-between items-center">
            <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center font-semibold">
              <ExternalLink className="mr-2" size={16} />
              {t('schemes.officialSite')}
            </a>
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
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <FileText className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('schemes.title')}</h1>
                    <p className="text-gray-500">{t('schemes.subtitle')}</p>
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
                        placeholder={t('schemes.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category === 'All' ? t('schemes.allCategories') : t(`schemes.categories.${category.toLowerCase().replace(' ', '')}`)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map(scheme => <SchemeCard key={scheme.id} scheme={scheme} />)}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 text-lg">{t('schemes.noResults')}</p>
        </div>
      )}

      <SchemeModal scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />
    </div>
  );
};

export default GovernmentSchemes;