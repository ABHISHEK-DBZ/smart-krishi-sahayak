import OpenAI from 'openai';

interface ConversationContext {
  id: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  userProfile: {
    language: string;
    location?: string;
    cropTypes?: string[];
    farmSize?: string;
    experience?: string;
  };
  sessionStartTime: Date;
  lastInteraction: Date;
}

interface AgricultureKnowledgeBase {
  crops: Record<string, any>;
  diseases: Record<string, any>;
  weather: Record<string, any>;
  schemes: Record<string, any>;
  practices: Record<string, any>;
}

class AdvancedAIService {
  private openai: OpenAI | null = null;
  private conversationContext: ConversationContext | null = null;
  private knowledgeBase: AgricultureKnowledgeBase;
  private isInitialized = false;

  constructor() {
    this.knowledgeBase = this.initializeKnowledgeBase();
    this.initializeOpenAI();
  }

  private initializeOpenAI() {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (apiKey && apiKey !== 'your_openai_api_key_here' && apiKey.length > 10) {
        this.openai = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true
        });
        this.isInitialized = true;
        console.log('Advanced OpenAI client initialized successfully');
      } else {
        console.log('OpenAI API key not found, using advanced fallback system');
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Error initializing Advanced OpenAI client:', error);
      this.openai = null;
      this.isInitialized = true;
    }
  }

  private initializeKnowledgeBase(): AgricultureKnowledgeBase {
    return {
      crops: {
        rice: {
          seasons: ['kharif'],
          duration: '120-150 days',
          waterRequirement: 'high',
          soilType: 'clay loam',
          diseases: ['blast', 'bacterial leaf blight', 'brown spot'],
          pests: ['stem borer', 'leaf folder', 'plant hopper'],
          fertilizer: 'NPK 120:60:40 kg/ha',
          varieties: ['Basmati', 'Sona Masoori', 'IR-64', 'PB-1121']
        },
        wheat: {
          seasons: ['rabi'],
          duration: '120-150 days',
          waterRequirement: 'moderate',
          soilType: 'loam',
          diseases: ['rust', 'smut', 'bunt'],
          pests: ['aphids', 'termites'],
          fertilizer: 'NPK 120:60:40 kg/ha',
          varieties: ['HD-2967', 'PBW-343', 'WH-542', 'DBW-17']
        },
        cotton: {
          seasons: ['kharif'],
          duration: '180-200 days',
          waterRequirement: 'moderate',
          soilType: 'black cotton soil',
          diseases: ['fusarium wilt', 'verticillium wilt'],
          pests: ['bollworm', 'aphids', 'whitefly'],
          fertilizer: 'NPK 80:40:40 kg/ha',
          varieties: ['Bt Cotton', 'RCH-2', 'MRC-7017']
        }
      },
      diseases: {
        blast: {
          symptoms: 'diamond-shaped lesions on leaves',
          treatment: 'tricyclazole fungicide',
          prevention: 'avoid excess nitrogen'
        },
        rust: {
          symptoms: 'orange-red pustules on leaves',
          treatment: 'propiconazole spray',
          prevention: 'use resistant varieties'
        }
      },
      weather: {
        monsoon: {
          timing: 'June-September',
          crops: ['rice', 'cotton', 'sugarcane'],
          precautions: 'ensure drainage, pest monitoring'
        },
        winter: {
          timing: 'October-March',
          crops: ['wheat', 'barley', 'mustard'],
          precautions: 'protect from frost, irrigation management'
        }
      },
      schemes: {
        pmkisan: {
          name: 'PM-KISAN',
          amount: '₹6000/year',
          eligibility: 'all farmer families',
          documents: ['aadhaar', 'bank account', 'land records']
        },
        pmfby: {
          name: 'Pradhan Mantri Fasal Bima Yojana',
          coverage: 'crop insurance',
          premium: '1.5-5% of sum insured',
          benefits: 'protection against natural calamities'
        }
      },
      practices: {
        organicFarming: {
          benefits: 'soil health, higher prices, sustainable',
          methods: ['composting', 'green manure', 'biopesticides']
        },
        waterConservation: {
          methods: ['drip irrigation', 'mulching', 'rainwater harvesting']
        }
      }
    };
  }

  public initializeConversation(language: string, userProfile?: Partial<ConversationContext['userProfile']>): string {
    this.conversationContext = {
      id: Math.random().toString(36).substr(2, 9),
      messages: [],
      userProfile: {
        language,
        ...userProfile
      },
      sessionStartTime: new Date(),
      lastInteraction: new Date()
    };

    // Add system prompt based on language and user profile
    const systemPrompt = this.generateSystemPrompt(language, userProfile);
    this.conversationContext.messages.push({
      role: 'system',
      content: systemPrompt,
      timestamp: new Date()
    });

    const greeting = this.generatePersonalizedGreeting(language);
    this.conversationContext.messages.push({
      role: 'assistant',
      content: greeting,
      timestamp: new Date()
    });

    return greeting;
  }

  private generateSystemPrompt(language: string, userProfile?: Partial<ConversationContext['userProfile']>): string {
    const basePrompts = {
      hi: `आप एक अत्यधिक बुद्धिमान और अनुभवी भारतीय कृषि विशेषज्ञ हैं जो AI तकनीक से लैस हैं। आपके पास निम्नलिखित क्षमताएं हैं:

🌾 विशेषज्ञता क्षेत्र:
- सभी प्रकार की फसलों की संपूर्ण जानकारी (खरीफ, रबी, जायद)
- मौसम आधारित कृषि सलाह और जलवायु अनुकूलन
- कीट-रोग पहचान और उनका जैविक/रासायनिक उपचार
- मिट्टी की जांच और पोषक तत्व प्रबंधन
- आधुनिक कृषि तकनीक और मशीनरी
- सरकारी योजनाओं की पूरी जानकारी
- बाजार की कीमतें और फसल की बिक्री रणनीति
- जैविक खेती और टिकाऊ कृषि

💡 आपकी विशेष क्षमताएं:
- संदर्भ को याद रखना और पिछली बातचीत का उपयोग करना
- व्यावहारिक और क्रियान्वित करने योग्य सलाह देना
- स्थानीय परिस्थितियों के अनुसार सुझाव देना
- चरणबद्ध समाधान प्रदान करना
- आपातकालीन स्थितियों में तत्काल मदद

🎯 आपका लक्ष्य:
- किसानों की आर्थिक स्थिति सुधारना
- फसल की गुणवत्ता और उत्पादकता बढ़ाना
- पर्यावरण अनुकूल खेती को बढ़ावा देना
- नई तकनीकों को सरल भाषा में समझाना`,

      en: `You are a highly intelligent and experienced Indian Agriculture Expert powered by AI technology. You have the following capabilities:

🌾 Areas of Expertise:
- Complete knowledge of all crop types (Kharif, Rabi, Zayad)
- Weather-based agricultural advice and climate adaptation
- Pest and disease identification with organic/chemical treatments
- Soil testing and nutrient management
- Modern agricultural techniques and machinery
- Complete knowledge of government schemes
- Market prices and crop selling strategies
- Organic farming and sustainable agriculture

💡 Your Special Abilities:
- Remembering context and using previous conversations
- Providing practical and actionable advice
- Suggesting solutions based on local conditions
- Providing step-by-step solutions
- Immediate help in emergency situations

🎯 Your Goals:
- Improve farmers' economic condition
- Enhance crop quality and productivity
- Promote environmentally friendly farming
- Explain new technologies in simple language`
    };

    let prompt = basePrompts[language as keyof typeof basePrompts] || basePrompts.en;

    // Add user profile context
    if (userProfile?.location) {
      prompt += language === 'hi' 
        ? `\n\n📍 किसान का स्थान: ${userProfile.location}` 
        : `\n\n📍 Farmer's Location: ${userProfile.location}`;
    }
    if (userProfile?.cropTypes && userProfile.cropTypes.length > 0) {
      prompt += language === 'hi'
        ? `\n🌱 मुख्य फसलें: ${userProfile.cropTypes.join(', ')}`
        : `\n🌱 Main Crops: ${userProfile.cropTypes.join(', ')}`;
    }
    if (userProfile?.farmSize) {
      prompt += language === 'hi'
        ? `\n📏 खेत का आकार: ${userProfile.farmSize}`
        : `\n📏 Farm Size: ${userProfile.farmSize}`;
    }

    return prompt;
  }

  private generatePersonalizedGreeting(language: string): string {
    const time = new Date().getHours();
    let timeGreeting = '';
    
    if (language === 'hi') {
      if (time < 12) timeGreeting = 'सुप्रभात';
      else if (time < 17) timeGreeting = 'नमस्कार';
      else timeGreeting = 'शुभ संध्या';
    } else {
      if (time < 12) timeGreeting = 'Good morning';
      else if (time < 17) timeGreeting = 'Good afternoon';
      else timeGreeting = 'Good evening';
    }

    const greetings = {
      hi: `${timeGreeting}! 🙏 मैं आपका AI कृषि विशेषज्ञ हूं। मैं आपकी खेती में सभी प्रकार की सहायता कर सकता हूं:

🌾 फसल की जानकारी और सलाह
🐛 कीट-रोग की पहचान और इलाज  
🌦️ मौसम आधारित सुझाव
💰 सरकारी योजनाओं की जानकारी
📈 बाजार की कीमतें और बिक्री रणनीति
🌱 आधुनिक कृषि तकनीक

आप मुझसे हिंदी या अंग्रेजी में कुछ भी पूछ सकते हैं। मैं आपकी बातचीत को याद रखूंगा और व्यक्तिगत सलाह दूंगा।`,

      en: `${timeGreeting}! 🙏 I'm your AI Agriculture Expert. I can help you with all aspects of farming:

🌾 Crop information and advice
🐛 Pest and disease identification & treatment
🌦️ Weather-based suggestions
💰 Government schemes information
📈 Market prices and selling strategies
🌱 Modern agricultural techniques

You can ask me anything in Hindi or English. I'll remember our conversation and provide personalized advice.`
    };

    return greetings[language as keyof typeof greetings] || greetings.en;
  }

  private analyzeQuery(query: string): {
    category: string;
    intent: string;
    entities: string[];
    urgency: 'low' | 'medium' | 'high';
    requiresPersonalizedAdvice: boolean;
  } {
    const queryLower = query.toLowerCase();
    
    // Category detection
    const categories = {
      crop: ['फसल', 'बुवाई', 'कटाई', 'crop', 'sowing', 'harvest', 'wheat', 'rice', 'cotton'],
      disease: ['रोग', 'बीमारी', 'कीट', 'disease', 'pest', 'infection', 'fungus'],
      weather: ['मौसम', 'बारिश', 'सूखा', 'weather', 'rain', 'drought', 'temperature'],
      scheme: ['योजना', 'सब्सिडी', 'scheme', 'subsidy', 'pm-kisan', 'insurance'],
      price: ['कीमत', 'बाजार', 'price', 'market', 'sell', 'buying'],
      soil: ['मिट्टी', 'खाद', 'soil', 'fertilizer', 'nutrient']
    };

    let category = 'general';
    let maxMatches = 0;

    for (const [cat, keywords] of Object.entries(categories)) {
      const matches = keywords.filter(keyword => queryLower.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        category = cat;
      }
    }

    // Urgency detection
    const urgencyKeywords = {
      high: ['जल्दी', 'तुरंत', 'आपातकाल', 'urgent', 'emergency', 'dying', 'help'],
      medium: ['समस्या', 'परेशानी', 'problem', 'issue', 'trouble']
    };

    let urgency: 'low' | 'medium' | 'high' = 'low';
    if (urgencyKeywords.high.some(word => queryLower.includes(word))) urgency = 'high';
    else if (urgencyKeywords.medium.some(word => queryLower.includes(word))) urgency = 'medium';

    // Extract entities (crop names, locations, etc.)
    const cropNames = ['धान', 'गेहूं', 'कपास', 'मक्का', 'rice', 'wheat', 'cotton', 'maize', 'sugarcane'];
    const entities = cropNames.filter(crop => queryLower.includes(crop));

    return {
      category,
      intent: category,
      entities,
      urgency,
      requiresPersonalizedAdvice: true
    };
  }

  private generateKnowledgeBasedResponse(analysis: any, language: string): string | null {
    if (!this.knowledgeBase) return null;

    if (analysis.category === 'crop' && analysis.entities.length > 0) {
      const crop = analysis.entities[0];
      const cropData = this.knowledgeBase.crops[crop] || 
                      this.knowledgeBase.crops[this.mapCropName(crop)];

      if (cropData) {
        return language === 'hi' 
          ? `${crop} के बारे में जानकारी:\n🌱 अवधि: ${cropData.duration}\n💧 पानी की आवश्यकता: ${cropData.waterRequirement}\n🏞️ मिट्टी: ${cropData.soilType}\n🌿 किस्में: ${cropData.varieties?.join(', ')}\n⚠️ मुख्य रोग: ${cropData.diseases?.join(', ')}`
          : `Information about ${crop}:\n🌱 Duration: ${cropData.duration}\n💧 Water requirement: ${cropData.waterRequirement}\n🏞️ Soil type: ${cropData.soilType}\n🌿 Varieties: ${cropData.varieties?.join(', ')}\n⚠️ Main diseases: ${cropData.diseases?.join(', ')}`;
      }
    }

    if (analysis.category === 'scheme') {
      const schemes = Object.values(this.knowledgeBase.schemes);
      return language === 'hi'
        ? `प्रमुख सरकारी योजनाएं:\n${schemes.map(s => `💰 ${s.name}: ${s.amount || s.benefits}`).join('\n')}`
        : `Major government schemes:\n${schemes.map(s => `💰 ${s.name}: ${s.amount || s.benefits}`).join('\n')}`;
    }

    return null;
  }

  private mapCropName(crop: string): string {
    const mapping: Record<string, string> = {
      'धान': 'rice',
      'गेहूं': 'wheat', 
      'कपास': 'cotton',
      'मक्का': 'maize'
    };
    return mapping[crop] || crop;
  }

  public async getAgricultureResponse(query: string, language: string = 'en'): Promise<string> {
    if (!this.isInitialized) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Update conversation context
    if (this.conversationContext) {
      this.conversationContext.messages.push({
        role: 'user',
        content: query,
        timestamp: new Date()
      });
      this.conversationContext.lastInteraction = new Date();
    }

    // Analyze the query
    const analysis = this.analyzeQuery(query);

    // Try knowledge base first for quick responses
    const knowledgeResponse = this.generateKnowledgeBasedResponse(analysis, language);
    
    if (this.openai && this.conversationContext) {
      try {
        // Use OpenAI with full context
        const messages = this.conversationContext.messages.slice(-10); // Keep last 10 messages for context

        const completion = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages as any,
          max_tokens: 600,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        });

        const response = completion.choices[0]?.message?.content || this.getAdvancedFallbackResponse(analysis, language);
        
        // Store assistant response
        this.conversationContext.messages.push({
          role: 'assistant',
          content: response,
          timestamp: new Date()
        });

        return response;
      } catch (error) {
        console.error('OpenAI API Error:', error);
        return knowledgeResponse || this.getAdvancedFallbackResponse(analysis, language);
      }
    } else {
      // Use advanced fallback system
      return knowledgeResponse || this.getAdvancedFallbackResponse(analysis, language);
    }
  }

  private getAdvancedFallbackResponse(analysis: any, language: string): string {
    const responses = {
      hi: {
        crop: [
          "फसल की सफलता के लिए सही समय पर बुवाई और उचित देखभाल जरूरी है। आपकी फसल कौन सी है?",
          "अच्छी फसल के लिए मिट्टी की जांच कराएं और संतुलित खाद का प्रयोग करें।",
          "बीज की गुणवत्ता और सिंचाई का सही प्रबंधन करें। क्या कोई विशेष समस्या है?"
        ],
        disease: [
          "कीट-रोग की सही पहचान जरूरी है। लक्षण बताएं ताकि सटीक इलाज बता सकूं।",
          "रोकथाम इलाज से बेहतर है। नियमित निरीक्षण और जैविक नीम का प्रयोग करें।",
          "तस्वीर भेज सकें तो बेहतर पहचान हो सकती है। कौन सी फसल में समस्या है?"
        ],
        weather: [
          "मौसम के अनुसार फसल का चुनाव और सिंचाई का प्रबंधन करें।",
          "अगले कुछ दिनों के मौसम की जानकारी लेकर खेती की योजना बनाएं।",
          "बारिश से पहले जल निकासी का प्रबंधन जरूर करें।"
        ],
        scheme: [
          "PM-KISAN, PMFBY जैसी योजनाओं का लाभ उठाएं। आधार और बैंक अकाउंट लिंक कराएं।",
          "सरकारी सब्सिडी की जानकारी के लिए कृषि विभाग से संपर्क करें।",
          "KCC (किसान क्रेडिट कार्ड) बनवाएं, इससे कम ब्याज पर लोन मिलता है।"
        ],
        price: [
          "बाजार की कीमतों की नियमित जानकारी रखें। e-NAM पोर्टल का प्रयोग करें।",
          "फसल को सही समय पर बेचें। भंडारण की सुविधा हो तो कीमत बढ़ने का इंतजार करें।",
          "मंडी की बजाय सीधे व्यापारियों से संपर्क करने पर बेहतर कीमत मिल सकती है।"
        ],
        general: [
          "आपकी खेती संबंधी समस्या के बारे में विस्तार से बताएं ताकि सही सलाह दे सकूं।",
          "कृषि में नई तकनीक का प्रयोग करें। ड्रिप इरिगेशन, ऑर्गेनिक फार्मिंग अच्छे विकल्प हैं।",
          "स्थानीय कृषि विशेषज्ञों से भी सलाह लेते रहें और किसान समूह से जुड़ें।"
        ]
      },
      en: {
        crop: [
          "For successful crops, proper timing of sowing and adequate care are essential. Which crop are you growing?",
          "For good crops, test your soil and use balanced fertilizers.",
          "Focus on seed quality and proper irrigation management. Do you have any specific issues?"
        ],
        disease: [
          "Proper identification of pests and diseases is crucial. Describe the symptoms for accurate treatment.",
          "Prevention is better than cure. Regular inspection and organic neem application are recommended.",
          "If you can send photos, better identification is possible. Which crop has the problem?"
        ],
        weather: [
          "Choose crops according to weather and manage irrigation accordingly.",
          "Plan farming activities based on weather forecast for the next few days.",
          "Ensure proper drainage management before rains."
        ],
        scheme: [
          "Benefit from schemes like PM-KISAN, PMFBY. Link Aadhaar and bank account.",
          "Contact agriculture department for government subsidy information.",
          "Get KCC (Kisan Credit Card) for low-interest loans."
        ],
        price: [
          "Keep regular track of market prices. Use e-NAM portal.",
          "Sell crops at the right time. If storage facilities available, wait for better prices.",
          "Direct contact with traders instead of mandis may get better prices."
        ],
        general: [
          "Please describe your farming issue in detail so I can provide proper advice.",
          "Use new technology in agriculture. Drip irrigation and organic farming are good options.",
          "Consult with local agriculture experts and join farmer groups."
        ]
      }
    };

    const categoryResponses = responses[language as keyof typeof responses]?.[analysis.category as keyof typeof responses['en']] ||
                             responses[language as keyof typeof responses]?.general ||
                             responses.en.general;

    let response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    // Add urgency-based prefix
    if (analysis.urgency === 'high') {
      response = language === 'hi' 
        ? `⚠️ तत्काल सहायता: ${response}`
        : `⚠️ Urgent Help: ${response}`;
    }

    return response;
  }

  public getConversationSummary(): string | null {
    if (!this.conversationContext) return null;

    const messageCount = this.conversationContext.messages.length;
    const duration = new Date().getTime() - this.conversationContext.sessionStartTime.getTime();
    const durationMinutes = Math.floor(duration / 60000);

    return `Session: ${messageCount} messages, ${durationMinutes} minutes, Language: ${this.conversationContext.userProfile.language}`;
  }

  public clearConversation(): void {
    this.conversationContext = null;
  }

  public isConfigured(): boolean {
    return this.isInitialized;
  }
}

export default new AdvancedAIService();
