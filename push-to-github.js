const { execSync } = require('child_process');

console.log('🚀 Pushing Beloop AI to GitHub...\n');

try {
  // Check git status
  console.log('📊 Checking git status...');
  execSync('git status', { stdio: 'inherit' });
  
  // Add all files
  console.log('\n📁 Adding all files...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Commit changes
  console.log('\n💾 Committing changes...');
  execSync('git commit -m "🚀 Enhanced Beloop AI with local fallback system and premium features"', { stdio: 'inherit' });
  
  console.log('\n✅ Ready to push to GitHub!');
  console.log('\n📋 Next steps:');
  console.log('1. Create a new repository on GitHub');
  console.log('2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git');
  console.log('3. Run: git push -u origin main');
  console.log('\n🎉 Your enhanced Beloop AI is ready for deployment!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Make sure you have:');
  console.log('- Git installed and configured');
  console.log('- A GitHub account');
  console.log('- Created a repository on GitHub');
}
