export interface Crop {
  id: number;
  name: {
    en: string;
    hi: string;
  };
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual';
  image: string;
  description: {
    en: string;
    hi: string;
  };
  growingInfo: {
    growthPeriod: { en: string; hi: string; };
    soilType: { en: string; hi: string; };
    waterRequirement: { en: string; hi: string; };
  };
  seedsAndFertilizers: {
    seedVarieties: { en: string[]; hi: string[]; };
    fertilizers: {
      en: { name: string; stage: string; }[];
      hi: { name: string; stage: string; }[];
    };
  };
}

export const cropData: Crop[] = [
  {
    id: 1,
    name: { en: 'Rice (Paddy)', hi: 'चावल (धान)' },
    season: 'Kharif',
    image: '/images/crops/rice.jpg',
    description: {
      en: 'A staple food grain for a large part of the world\'s human population, especially in Asia. It is the agricultural commodity with the third-highest worldwide production.',
      hi: 'यह दुनिया की मानव आबादी के एक बड़े हिस्से के लिए, विशेष रूप से एशिया में, एक मुख्य खाद्य अनाज है। यह दुनिया भर में तीसरे सबसे अधिक उत्पादन वाली कृषि वस्तु है।'
    },
    growingInfo: {
      growthPeriod: { en: '120-150 days', hi: '120-150 दिन' },
      soilType: { en: 'Clayey Loam', hi: 'चिकनी दोमट' },
      waterRequirement: { en: 'High (150-250 cm)', hi: 'उच्च (150-250 सेमी)' },
    },
    seedsAndFertilizers: {
      seedVarieties: {
        en: ['Basmati-370', 'Pusa-1121', 'IR-64'],
        hi: ['बासमती-370', 'पूसा-1121', 'आईआर-64']
      },
      fertilizers: {
        en: [
          { name: 'Urea', stage: 'Tillering' },
          { name: 'DAP', stage: 'Transplanting' },
          { name: 'MOP', stage: 'Panicle Initiation' }
        ],
        hi: [
          { name: 'यूरिया', stage: 'कल्ले निकलते समय' },
          { name: 'डीएपी', stage: 'रोपाई के समय' },
          { name: 'एमओपी', stage: 'बाली निकलते समय' }
        ]
      }
    }
  },
  {
    id: 2,
    name: { en: 'Wheat', hi: 'गेहूँ' },
    season: 'Rabi',
    image: '/images/crops/wheat.jpg',
    description: {
      en: 'A cereal grain, which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
      hi: 'एक अनाज, जो दुनिया भर में एक मुख्य भोजन है। गेहूं की कई प्रजातियां मिलकर ट्रिटिकम जीनस बनाती हैं; सबसे व्यापक रूप से उगाया जाने वाला सामान्य गेहूं है।'
    },
    growingInfo: {
      growthPeriod: { en: '100-120 days', hi: '100-120 दिन' },
      soilType: { en: 'Well-drained Loam', hi: 'अच्छी जल निकासी वाली दोमट' },
      waterRequirement: { en: 'Moderate (45-65 cm)', hi: 'मध्यम (45-65 सेमी)' },
    },
    seedsAndFertilizers: {
      seedVarieties: {
        en: ['HD-2967', 'PBW-343', 'Kundan'],
        hi: ['एचडी-2967', 'पीबीडब्ल्यू-343', 'कुंदन']
      },
      fertilizers: {
        en: [
          { name: 'Urea', stage: 'First Irrigation' },
          { name: 'SSP', stage: 'Sowing' },
          { name: 'Zinc Sulphate', stage: 'Tillering' }
        ],
        hi: [
          { name: 'यूरिया', stage: 'पहली सिंचाई' },
          { name: 'एसएसपी', stage: 'बुवाई' },
          { name: 'जिंक सल्फेट', stage: 'कल्ले निकलते समय' }
        ]
      }
    }
  },
  {
    id: 3,
    name: { en: 'Cotton', hi: 'कपास' },
    season: 'Kharif',
    image: '/images/crops/cotton.jpg',
    description: {
      en: 'A soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of the cotton plants of the genus Gossypium in the mallow family Malvaceae.',
      hi: 'एक नरम, रोएंदार स्टेपल फाइबर जो एक बोल, या सुरक्षात्मक मामले में, मालवेसी परिवार में गॉसिपियम जीनस के कपास के पौधों के बीजों के आसपास उगता है।'
    },
    growingInfo: {
      growthPeriod: { en: '160-180 days', hi: '160-180 दिन' },
      soilType: { en: 'Black Cotton Soil', hi: 'काली कपास मिट्टी' },
      waterRequirement: { en: 'Moderate (70-120 cm)', hi: 'मध्यम (70-120 सेमी)' },
    },
    seedsAndFertilizers: {
      seedVarieties: {
        en: ['BT Cotton', 'MCU-5', 'Suvin'],
        hi: ['बीटी कॉटन', 'एमसीयू-5', 'सुविन']
      },
      fertilizers: {
        en: [
          { name: 'Urea', stage: 'Flowering' },
          { name: 'Potash', stage: 'Boll Formation' },
          { name: 'Magnesium Sulphate', stage: 'Square Formation' }
        ],
        hi: [
          { name: 'यूरिया', stage: 'फूल आने पर' },
          { name: 'पोटाश', stage: 'बोल बनने पर' },
          { name: 'मैग्नीशियम सल्फेट', stage: 'स्क्वायर बनने पर' }
        ]
      }
    }
  },
  {
    id: 4,
    name: { en: 'Sugarcane', hi: 'गन्ना' },
    season: 'Annual',
    image: '/images/crops/sugarcane.jpg',
    description: {
      en: 'A species of tall, perennial grass that is used for sugar production. The plants are 2–6 m (6–20 ft) tall with stout, jointed, fibrous stalks that are rich in sucrose.',
      hi: 'एक लंबी, बारहमासी घास की प्रजाति जिसका उपयोग चीनी उत्पादन के लिए किया जाता है। पौधे 2-6 मीटर (6-20 फीट) लंबे होते हैं, जिनमें मोटे, जुड़े हुए, रेशेदार डंठल होते हैं जो सुक्रोज से भरपूर होते हैं।'
    },
    growingInfo: {
      growthPeriod: { en: '10-18 months', hi: '10-18 महीने' },
      soilType: { en: 'Loamy soil with good drainage', hi: 'अच्छी जल निकासी वाली दोमट मिट्टी' },
      waterRequirement: { en: 'High (150-250 cm)', hi: 'उच्च (150-250 सेमी)' },
    },
    seedsAndFertilizers: {
      seedVarieties: {
        en: ['Co-86032', 'Co-0238', 'CoJ-64'],
        hi: ['सीओ-86032', 'सीओ-0238', 'सीओजे-64']
      },
      fertilizers: {
        en: [
          { name: 'Urea', stage: 'Tillering' },
          { name: 'Phosphorus', stage: 'Planting' },
          { name: 'Potassium', stage: 'Grand Growth Phase' }
        ],
        hi: [
          { name: 'यूरिया', stage: 'कल्ले निकलते समय' },
          { name: 'फॉस्फोरस', stage: 'रोपण' },
          { name: 'पोटेशियम', stage: 'बढ़वार की अवस्था' }
        ]
      }
    }
  },
  {
    id: 5,
    name: { en: 'Soybean', hi: 'सोयाबीन' },
    season: 'Kharif',
    image: '/images/crops/soybean.jpg',
    description: {
      en: 'A species of legume native to East Asia, widely grown for its edible bean, which has numerous uses. It is a rich source of protein.',
      hi: 'पूर्वी एशिया की मूल निवासी फली की एक प्रजाति, जो इसके खाद्य बीन के लिए व्यापक रूप से उगाई जाती है, जिसके कई उपयोग हैं। यह प्रोटीन का एक समृद्ध स्रोत है।'
    },
    growingInfo: {
      growthPeriod: { en: '90-110 days', hi: '90-110 दिन' },
      soilType: { en: 'Well-drained sandy loam', hi: 'अच्छी जल निकासी वाली रेतीली दोमट' },
      waterRequirement: { en: 'Moderate (45-70 cm)', hi: 'मध्यम (45-70 सेमी)' },
    },
    seedsAndFertilizers: {
      seedVarieties: {
        en: ['JS-335', 'JS-9560', 'NRC-37'],
        hi: ['जेएस-335', 'जेएस-9560', 'एनआरसी-37']
      },
      fertilizers: {
        en: [
          { name: 'DAP', stage: 'Sowing' },
          { name: 'Sulphur', stage: 'Flowering' },
          { name: 'Potash', stage: 'Pod filling' }
        ],
        hi: [
          { name: 'डीएपी', stage: 'बुवाई' },
          { name: 'सल्फर', stage: 'फूल आने पर' },
          { name: 'पोटाश', stage: 'फली भरने पर' }
        ]
      }
    }
  },
  {
    id: 6,
    name: { en: 'Mustard', hi: 'सरसों' },
    season: 'Rabi',
    image: '/images/crops/mustard.jpg',
    description: {
      en: 'A plant species in the genera Brassica and Sinapis in the family Brassicaceae. Mustard seed is used as a spice. Grinding and mixing the seeds with water, vinegar, or other liquids creates the yellow condiment known as prepared mustard.',
      hi: 'ब्रैसिसेकी परिवार में ब्रैसिका और सिनापिस जेनेरा में एक पौधे की प्रजाति। सरसों के बीज का उपयोग मसाले के रूप में किया जाता है। बीजों को पीसकर पानी, सिरका, या अन्य तरल पदार्थों के साथ मिलाने से तैयार सरसों के रूप में जाना जाने वाला पीला मसाला बनता है।'
    },
    growingInfo: {
      growthPeriod: { en: '110-140 days', hi: '110-140 दिन' },
      soilType: { en: 'Light to heavy sandy loam', hi: 'हल्की से भारी रेतीली दोमट' },
      waterRequirement: { en: 'Low (25-40 cm)', hi: 'कम (25-40 सेमी)' },
    },
    seedsAndFertilizers: {
      seedVarieties: {
        en: ['Pusa Bold', 'RH-30', 'Varuna'],
        hi: ['पूसा बोल्ड', 'आरएच-30', 'वरुणा']
      },
      fertilizers: {
        en: [
          { name: 'Urea', stage: '30 days after sowing' },
          { name: 'Sulphur', stage: 'Sowing' },
          { name: 'Boron', stage: 'Flowering' }
        ],
        hi: [
          { name: 'यूरिया', stage: 'बुवाई के 30 दिन बाद' },
          { name: 'सल्फर', stage: 'बुवाई' },
          { name: 'बोरॉन', stage: 'फूल आने पर' }
        ]
      }
    }
  }
];
