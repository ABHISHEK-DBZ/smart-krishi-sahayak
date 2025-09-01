// AI Service Test Page
console.log('🌾 Smart Krishi Sahayak - AI Service Test');
console.log('Checking API Key Configuration...');

// Check if API key is available
const apiKey = import.meta?.env?.VITE_OPENAI_API_KEY;
console.log('API Key configured:', !!apiKey && apiKey !== 'your_openai_api_key_here');
console.log('API Key length:', apiKey ? apiKey.length : 0);

// Test AI Service
async function testAIService() {
  try {
    // Dynamic import to work in browser
    const { default: aiService } = await import('../services/aiService.ts');
    
    console.log('✅ AI Service imported successfully');
    console.log('🔑 AI Service configured:', aiService.isConfigured());
    
    if (aiService.isConfigured()) {
      console.log('🧠 Testing OpenAI API with real query...');
      
      // Test English query
      const response = await aiService.getAgricultureResponse('What is the best fertilizer for tomato plants?', 'en');
      console.log('🇺🇸 English Response:', response);
      
      // Test Hindi query
      const hindiResponse = await aiService.getAgricultureResponse('टमाटर के पौधों के लिए सबसे अच्छी खाद कौन सी है?', 'hi');
      console.log('🇮🇳 Hindi Response:', hindiResponse);
      
      console.log('✅ AI Service test completed successfully!');
    } else {
      console.log('⚠️ AI Service not configured - using fallback responses');
      const fallbackResponse = await aiService.getAgricultureResponse('Test query', 'en');
      console.log('📝 Fallback Response:', fallbackResponse);
    }
  } catch (error) {
    console.error('❌ Error testing AI service:', error);
  }
}

// Run test when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', testAIService);
} else {
  testAIService();
}
