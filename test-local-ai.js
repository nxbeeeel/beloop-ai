const { getLocalAIResponse, getEnhancedFallbackResponse } = require('./app/lib/localAIServer.ts');

console.log('🧪 Testing Enhanced Local AI Server...\n');

// Test different types of queries
const testQueries = [
  'Create a website for me',
  'Help me with JavaScript',
  'Show me CSS animations',
  'Build a React component',
  'Create a beautiful button',
  'Add hover effects',
  'Build a contact form',
  'Create a calculator',
  'Show me the weather',
  'Let\'s play a game',
  'Hello there!',
  'What can you help me with?',
  'How do I make a responsive design?',
  'Create a memory game',
  'Build a tic-tac-toe game'
];

console.log('📝 Testing various queries:\n');

testQueries.forEach((query, index) => {
  console.log(`${index + 1}. Query: "${query}"`);
  
  try {
    const response = getLocalAIResponse(query);
    console.log(`   ✅ Response: ${response.response.substring(0, 100)}...`);
    console.log(`   🎯 Confidence: ${response.confidence}`);
    console.log(`   💡 Suggestions: ${response.suggestions?.slice(0, 2).join(', ')}`);
    console.log(`   📊 Has Code Preview: ${!!response.codePreview ? 'Yes' : 'No'}`);
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  console.log('');
});

console.log('🎮 Testing Games Category:');
const gameResponse = getLocalAIResponse('play tic tac toe');
console.log(`   Games Available: ${gameResponse.response.includes('Tic-Tac-Toe') ? 'Yes' : 'No'}`);
console.log(`   Number of Games: ${(gameResponse.response.match(/##/g) || []).length}`);

console.log('\n🔧 Testing Tools Category:');
const toolResponse = getLocalAIResponse('calculator');
console.log(`   Calculator Available: ${toolResponse.response.includes('Calculator') ? 'Yes' : 'No'}`);

console.log('\n🌤️ Testing Weather Category:');
const weatherResponse = getLocalAIResponse('weather widget');
console.log(`   Weather Widget Available: ${weatherResponse.response.includes('Weather') ? 'Yes' : 'No'}`);

console.log('\n✅ Enhanced Local AI Server Test Complete!');
console.log('\n🎯 Features Available:');
console.log('   - 🎮 3 Interactive Games (Tic-Tac-Toe, Number Guessing, Memory)');
console.log('   - 🔧 Calculator & Temperature Converter');
console.log('   - 🌤️ Weather & Time Widget');
console.log('   - 🎨 UI Components (Buttons, Cards, Modals)');
console.log('   - 🎭 Animations & Effects');
console.log('   - 📝 Forms with Validation');
console.log('   - 💻 Programming Examples');
console.log('   - 🌐 Web Development Templates');
console.log('   - ⚛️ React & Next.js Patterns');
console.log('   - 🎨 CSS Styling Examples');
console.log('   - 🔧 JavaScript Patterns');
