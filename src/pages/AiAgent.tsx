import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, Send, User, Loader, BrainCircuit, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import axios from 'axios';

// Extend the Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const AiAgent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      
      // Set language based on current i18n language
      const langMap: { [key: string]: string } = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'pa': 'pa-IN'
      };
      
      recognitionInstance.lang = langMap[i18n.language] || 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [i18n.language]);
  
  useEffect(() => {
    // Add an initial greeting from the bot
    const greetingMessage = i18n.language === 'hi' 
      ? "नमस्ते! मैं आपका AI कृषि सहायक हूं। फसलों, मौसम, या सरकारी योजनाओं के बारे में पूछें।"
      : "Hello! I am your AI Agriculture Assistant. Ask me about crops, weather, or government schemes.";
    
    setMessages([
      { text: greetingMessage, sender: 'bot' }
    ]);
  }, [i18n.language]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language for speech
      const voiceLangMap: { [key: string]: string } = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'pa': 'pa-IN'
      };
      
      utterance.lang = voiceLangMap[i18n.language] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/agent/query', {
        query: currentInput,
      });
      
      const botResponse: Message = {
        text: response.data.reply,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botResponse]);

      // Auto-speak the bot response if not already speaking
      if (!isSpeaking) {
        speakText(response.data.reply);
      }

    } catch (error) {
      const errorText = i18n.language === 'hi' 
        ? "माफ करें, मुझे अभी अपने दिमाग से जुड़ने में परेशानी हो रही है। कृपया एक पल में फिर से कोशिश करें।"
        : "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.";
      
      const errorResponse: Message = {
        text: errorText,
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorResponse]);
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isVoiceSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const isSpeechSupported = 'speechSynthesis' in window;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-2xl">
        <div className="flex items-center">
          <div className="bg-orange-100 p-3 rounded-full mr-4">
            <BrainCircuit className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('aiagent.title')}</h1>
            <p className="text-gray-500">{t('aiagent.subtitle')}</p>
          </div>
        </div>
        
        {/* Voice Controls */}
        <div className="flex items-center space-x-2">
          {!isVoiceSupported && !isSpeechSupported && (
            <span className="text-sm text-gray-500">{t('aiagent.voiceNotSupported')}</span>
          )}
          
          {isSpeechSupported && (
            <button
              onClick={isSpeaking ? stopSpeaking : () => {}}
              disabled={!isSpeaking}
              className={`p-2 rounded-lg transition-colors ${
                isSpeaking 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title={isSpeaking ? t('aiagent.speaking') : t('aiagent.speak')}
            >
              {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                <Bot size={24} />
              </div>
            )}
            <div className={`px-4 py-3 rounded-2xl max-w-lg ${msg.sender === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
              <p>{msg.text}</p>
              {msg.sender === 'bot' && isSpeechSupported && (
                <button
                  onClick={() => speakText(msg.text)}
                  className="mt-2 p-1 text-gray-500 hover:text-orange-600 transition-colors"
                  title={t('aiagent.speak')}
                >
                  <Volume2 size={16} />
                </button>
              )}
            </div>
             {msg.sender === 'user' && (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                <User size={24} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-3 justify-start">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
              <Bot size={24} />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
        <div className="flex items-center bg-white border border-gray-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-orange-500">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('aiagent.placeholder')}
            className="w-full px-2 py-1 bg-transparent focus:outline-none"
            disabled={isLoading}
          />
          
          {isVoiceSupported && (
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading}
              className={`p-2 rounded-lg mr-2 transition-colors ${
                isListening 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
              title={isListening ? t('aiagent.stopListening') : t('aiagent.startListening')}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}
          
          <button
            onClick={handleSend}
            disabled={input.trim() === '' || isLoading}
            className="bg-orange-500 text-white rounded-lg p-2 disabled:bg-orange-300 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center">
            <span className="text-sm text-blue-600 animate-pulse">
              🎤 {t('aiagent.startListening')}...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAgent;
