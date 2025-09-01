import OpenAI from 'openai';

class AIService {
  private openai: OpenAI | null = null;

  constructor() {
    this.initializeOpenAI();
  }

  private initializeOpenAI() {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (apiKey && apiKey !== 'your_openai_api_key_here' && apiKey.length > 10) {
        this.openai = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
        });
        console.log('OpenAI client initialized successfully');
      } else {
        console.log('OpenAI API key not found or invalid, using fallback responses');
      }
    } catch (error) {
      console.error('Error initializing OpenAI client:', error);
      this.openai = null;
    }
  }

  async getAgricultureResponse(query: string, language: string = 'en'): Promise<string> {
    if (!this.openai) {
      return this.getFallbackResponse(language);
    }

    try {
      const systemPrompt = language === 'hi' 
        ? `आप एक विशेषज्ञ भारतीय कृषि सलाहकार हैं। निम्नलिखित निर्देशों का पालन करें:

1. सिर्फ कृषि संबंधित प्रश्नों का उत्तर दें
2. किसी विशेष फसल के बारे में पूछे जाने पर:
   - उस फसल की बुवाई का सही समय
   - आवश्यक मिट्टी और जलवायु
   - बीज की मात्रा और दूरी
   - सिंचाई की आवश्यकता
   - उर्वरक की मात्रा और समय
   - सामान्य कीट और बीमारियां
   - फसल की कटाई का समय
3. मौसम संबंधित सलाह:
   - वर्तमान मौसम के अनुसार फसल सुरक्षा
   - सिंचाई की योजना
4. सरकारी योजनाओं के लिए:
   - योजना का नाम और लाभ
   - पात्रता मानदंड
   - आवेदन प्रक्रिया
5. बीमारी नियंत्रण के लिए:
   - बीमारी के लक्षण
   - उपचार के तरीके
   - रोकथाम के उपाय

केवल प्रासंगिक, व्यावहारिक और प्रमाणित जानकारी दें। अनावश्यक विवरण न दें।`
        : `You are an expert Indian Agriculture Advisor. Follow these instructions:

1. Answer only agriculture-related questions
2. When asked about a specific crop:
   - Proper sowing time
   - Required soil and climate
   - Seed rate and spacing
   - Irrigation requirements
   - Fertilizer amount and timing
   - Common pests and diseases
   - Harvesting time
3. For weather-related advice:
   - Crop protection based on current weather
   - Irrigation planning
4. For government schemes:
   - Scheme name and benefits
   - Eligibility criteria
   - Application process
5. For disease control:
   - Disease symptoms
   - Treatment methods
   - Prevention measures

Provide only relevant, practical, and verified information. Avoid unnecessary details.`;

      // Enhance query with agricultural context
      const enhancedQuery = `कृषि सलाह: ${query}` // Add agriculture context prefix for Hindi
        
      // Add example format to help model structure response
      const formatExample = language === 'hi' 
        ? "\n\nउत्तर का प्रारूप:\n1. मुख्य जानकारी\n2. व्यावहारिक सुझाव\n3. सावधानियां"
        : "\n\nResponse format:\n1. Key information\n2. Practical advice\n3. Precautions";

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: enhancedQuery + formatExample
          }
        ],
        max_tokens: 400, // Reduced for more concise responses
        temperature: 0.5, // Lower temperature for more focused responses
        presence_penalty: -0.1, // Slightly discourage introducing new topics
        frequency_penalty: 0.3, // Encourage response variety while staying on topic
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
        `कृपया अपना प्रश्न विशिष्ट रूप से पूछें:
1. किसी विशेष फसल के बारे में
2. मौसम के अनुसार खेती की जानकारी
3. सरकारी योजनाओं की जानकारी
4. कीट या बीमारी नियंत्रण
5. खेती की नई तकनीकें`,
        
        `में आपकी सहायता कर सकता हूं:
1. फसल चक्र की योजना
2. उन्नत बीज चयन
3. उर्वरक प्रबंधन
4. सिंचाई की विधियां
5. फसल सुरक्षा`,
        
        `कृपया बताएं:
1. आपकी फसल कौन सी है?
2. वर्तमान समस्या क्या है?
3. आपके क्षेत्र का मौसम कैसा है?
4. क्या आप किसी विशेष योजना में रुचि रखते हैं?`
      ],
      en: [
        `Please ask your question specifically about:
1. A particular crop
2. Season-specific farming advice
3. Government scheme information
4. Pest or disease control
5. Modern farming techniques`,
        
        `I can help you with:
1. Crop rotation planning
2. Improved seed selection
3. Fertilizer management
4. Irrigation methods
5. Crop protection`,
        
        `Please tell me:
1. What crop are you growing?
2. What is your current concern?
3. How is the weather in your area?
4. Are you interested in any specific scheme?`
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
