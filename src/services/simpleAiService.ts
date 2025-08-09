// Simple fallback AI service without OpenAI dependency for testing
class SimpleAIService {
  async getAgricultureResponse(_query: string, language: string = 'en'): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      hi: [
        "धान की खेती के लिए उचित जल प्रबंधन और समय पर बुवाई जरूरी है। सितंबर-अक्टूबर में बुवाई करें।",
        "गेहूं की अच्छी फसल के लिए अक्टूबर-नवंबर में बुवाई करें। मिट्टी में नमी होना चाहिए।",
        "कपास की फसल में कीट प्रबंधन के लिए नीम का तेल का प्रयोग करें और नियमित निरीक्षण करते रहें।",
        "PM-KISAN योजना के लिए आधार कार्ड और बैंक अकाउंट लिंक करवाएं। ऑनलाइन आवेदन कर सकते हैं।",
        "सूखे से बचाव के लिए ड्रिप इरिगेशन सिस्टम का इस्तेमाल करें और जल संरक्षण करें।",
        "मिट्टी की जांच कराकर उपयुक्त उर्वरक का प्रयोग करें। जैविक खाद भी मिलाएं।"
      ],
      en: [
        "For rice cultivation, proper water management and timely sowing are essential. Sow during September-October.",
        "For good wheat crop, sow during October-November period when soil has adequate moisture.",
        "Use neem oil for pest management in cotton crops and conduct regular field inspections.",
        "Link Aadhaar card and bank account for PM-KISAN scheme benefits. Apply online through the portal.",
        "Use drip irrigation system to prevent drought damage and practice water conservation.",
        "Test your soil and use appropriate fertilizers. Mix organic compost for better results."
      ]
    };

    const langResponses = responses[language as keyof typeof responses] || responses.en;
    return langResponses[Math.floor(Math.random() * langResponses.length)];
  }

  isConfigured(): boolean {
    return true; // Always return true for simple service
  }
}

export default new SimpleAIService();
