import OpenAI from 'openai';

class AIService {
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (apiKey && apiKey !== 'your_openai_api_key_here') {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }

  async getAgricultureResponse(query: string, language: string = 'en'): Promise<string> {
    if (!this.openai) {
      return this.getFallbackResponse(language);
    }

    try {
      const systemPrompt = language === 'hi' 
        ? `आप एक विशेषज्ञ भारतीय कृषि सलाहकार हैं। आप भारतीय किसानों की फसलों, मौसम, सरकारी योजनाओं, रोग नियंत्रण, और कृषि तकनीकों के बारे में मदद करते हैं। हमेशा व्यावहारिक, सटीक और उपयोगी जानकारी दें। भारतीय खेती के संदर्भ में जवाब दें।`
        : `You are an expert Indian Agriculture Advisor. You help Indian farmers with crops, weather, government schemes, disease control, and farming techniques. Always provide practical, accurate and useful information. Answer in the context of Indian farming.`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: query
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || this.getFallbackResponse(language);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return this.getErrorResponse(language);
    }
  }

  private getFallbackResponse(language: string): string {
    const responses = {
      hi: [
        "धान की खेती के लिए उचित जल प्रबंधन और समय पर बुवाई जरूरी है।",
        "गेहूं की अच्छी फसल के लिए अक्टूबर-नवंबर में बुवाई करें।",
        "कपास की फसल में कीट प्रबंधन के लिए नीम का तेल का प्रयोग करें।",
        "PM-KISAN योजना के लिए आधार कार्ड और बैंक अकाउंट लिंक करवाएं।",
        "सूखे से बचाव के लिए ड्रिप इरिगेशन सिस्टम का इस्तेमाल करें।"
      ],
      en: [
        "For rice cultivation, proper water management and timely sowing are essential.",
        "For good wheat crop, sow during October-November period.",
        "Use neem oil for pest management in cotton crops.",
        "Link Aadhaar card and bank account for PM-KISAN scheme benefits.",
        "Use drip irrigation system to prevent drought damage."
      ]
    };

    const langResponses = responses[language as keyof typeof responses] || responses.en;
    return langResponses[Math.floor(Math.random() * langResponses.length)];
  }

  private getErrorResponse(language: string): string {
    return language === 'hi' 
      ? "माफ करें, अभी कुछ तकनीकी समस्या है। कृपया बाद में पूछें। इस बीच स्थानीय कृषि विशेषज्ञ से संपर्क करें।"
      : "Sorry, there's a technical issue right now. Please try again later. Meanwhile, consult your local agriculture expert.";
  }

  isConfigured(): boolean {
    return this.openai !== null;
  }
}

export default new AIService();
