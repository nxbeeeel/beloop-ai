const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up GitHub repository for Beloop AI...\n');

try {
  // Check if git is installed
  execSync('git --version', { stdio: 'pipe' });
  console.log('✅ Git is installed');
} catch (error) {
  console.log('❌ Git is not installed. Please install Git first.');
  process.exit(1);
}

// Check if we're in a git repository
try {
  execSync('git status', { stdio: 'pipe' });
  console.log('✅ Already in a git repository');
} catch (error) {
  console.log('📁 Initializing git repository...');
  execSync('git init', { stdio: 'inherit' });
}

// Create .gitignore if it doesn't exist
const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test`;

if (!fs.existsSync('.gitignore')) {
  fs.writeFileSync('.gitignore', gitignoreContent);
  console.log('✅ Created .gitignore file');
} else {
  console.log('✅ .gitignore already exists');
}

// Add all files to git
console.log('📦 Adding files to git...');
execSync('git add .', { stdio: 'inherit' });

// Create initial commit
console.log('💾 Creating initial commit...');
execSync('git commit -m "Initial commit: Beloop AI - Enhanced AI Chat with Local Fallback System"', { stdio: 'inherit' });

console.log('\n🎉 Repository setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Go to GitHub.com and create a new repository');
console.log('2. Copy the repository URL');
console.log('3. Run these commands:');
console.log('   git remote add origin <YOUR_REPOSITORY_URL>');
console.log('   git branch -M main');
console.log('   git push -u origin main');
console.log('\n💡 Or run: node setup-github-remote.js <YOUR_REPOSITORY_URL>');
