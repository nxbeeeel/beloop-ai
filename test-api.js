// Test script to verify Gemini API key
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = 'AIzaSyAFp-khhWqeIVM4X26Uk34uN0ekjmKIyl0';

async function testAPI() {
  try {
    console.log('Testing Gemini API...');
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Try different model names
    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
    
    for (const modelName of models) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello, how are you?');
        const response = await result.response;
        console.log(`✅ ${modelName} works! Response:`, response.text());
        return modelName; // Found working model
      } catch (error) {
        console.log(`❌ ${modelName} failed:`, error.message);
      }
    }
    
    console.log('❌ No models worked. Please check your API key.');
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testAPI();
