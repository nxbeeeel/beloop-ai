#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Beloop AI - Local Development Setup\n');

// Check prerequisites
function checkPrerequisites() {
    console.log('📋 Checking prerequisites...\n');
    
    const checks = [
        { name: 'Node.js', command: 'node --version', required: true },
        { name: 'npm', command: 'npm --version', required: true },
        { name: 'Git', command: 'git --version', required: false }
    ];
    
    let allGood = true;
    
    checks.forEach(check => {
        try {
            const version = execSync(check.command, { encoding: 'utf8' }).trim();
            console.log(`✅ ${check.name}: ${version}`);
        } catch (error) {
            if (check.required) {
                console.log(`❌ ${check.name}: Not found`);
                allGood = false;
            } else {
                console.log(`⚠️  ${check.name}: Not found (optional)`);
            }
        }
    });
    
    if (!allGood) {
        console.log('\n❌ Please install the required prerequisites before continuing.');
        console.log('📖 See LOCAL_SETUP_GUIDE.md for installation instructions.\n');
        process.exit(1);
    }
    
    console.log('\n✅ All prerequisites met!\n');
}

// Check if .env.local exists
function checkEnvironmentFile() {
    const envPath = path.join(process.cwd(), '.env.local');
    
    if (fs.existsSync(envPath)) {
        console.log('✅ .env.local file found');
        return true;
    } else {
        console.log('❌ .env.local file not found');
        return false;
    }
}

// Create .env.local template
function createEnvTemplate() {
    const envPath = path.join(process.cwd(), '.env.local');
    const template = `# Google Gemini API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_gemini_api_key_here

# NextAuth Configuration
# Get your Google OAuth credentials from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here

# NextAuth Secret (use the generated one below)
NEXTAUTH_SECRET=Pq8c7woTC90wyoN/V6geYq43TuuSiuSuYb78sgbX56g=

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
    
    fs.writeFileSync(envPath, template);
    console.log('📝 Created .env.local template');
    console.log('⚠️  Please update the API keys in .env.local before starting the server\n');
}

// Check if dependencies are installed
function checkDependencies() {
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    
    if (fs.existsSync(nodeModulesPath)) {
        console.log('✅ Dependencies already installed');
        return true;
    } else {
        console.log('📦 Installing dependencies...');
        try {
            execSync('npm install', { stdio: 'inherit' });
            console.log('✅ Dependencies installed successfully\n');
            return true;
        } catch (error) {
            console.log('❌ Failed to install dependencies');
            return false;
        }
    }
}

// Main setup function
function main() {
    try {
        // Check prerequisites
        checkPrerequisites();
        
        // Check dependencies
        if (!checkDependencies()) {
            process.exit(1);
        }
        
        // Check environment file
        if (!checkEnvironmentFile()) {
            console.log('\n📝 Creating .env.local template...');
            createEnvTemplate();
        }
        
        console.log('🎉 Setup complete! Next steps:\n');
        console.log('1. 📝 Update your API keys in .env.local');
        console.log('2. 🚀 Start the development server:');
        console.log('   - For local only: npm run dev');
        console.log('   - For mobile access: npm run dev:mobile');
        console.log('3. 🌐 Open http://localhost:3000 in your browser');
        console.log('4. 🔐 Test login with: john@example.com / password\n');
        
        console.log('📖 For detailed instructions, see LOCAL_SETUP_GUIDE.md');
        
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        process.exit(1);
    }
}

// Run setup
main();
