# AI Agent Setup Instructions

## OpenAI API Key Setup

1. **Get OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Create account or login
   - Generate new API key
   - Copy the key (starts with sk-proj- or sk-)

2. **Add API Key to Project:**
   - Create `.env` file in project root
   - Add: `VITE_OPENAI_API_KEY=your_actual_api_key_here`
   - Replace `your_actual_api_key_here` with your real API key

3. **Current Status:**
   - ✅ Desktop app is working perfectly
   - ✅ Web app loads properly in desktop app
   - ⚠️ AI Agent needs API key to work with OpenAI
   - ✅ Fallback responses work without API key

## Without API Key:
- AI Agent shows fallback agriculture tips
- All other features work normally

## With API Key:
- AI Agent uses OpenAI GPT-3.5 Turbo
- Intelligent responses to agriculture questions
- Context-aware conversations

## Files to Check:
- `.env.example` - Template file (safe to commit)
- `.env` - Your actual keys (never commit this)
- `src/services/aiService.ts` - AI service logic
- `src/services/advancedAiService.ts` - Advanced AI service

## Security Note:
Never commit `.env` file to GitHub - it's already in .gitignore
