# 🚀 Local Development Setup Guide for Beloop AI

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Check Your Installation
```bash
node --version
npm --version
git --version
```

## 🛠️ Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd beloop-ai-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

#### Create Environment File
Create a `.env.local` file in the project root:

```env
# Google Gemini API Key
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
```

#### Get Required API Keys

**Google Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Replace `your_actual_gemini_api_key_here` in `.env.local`

**Google OAuth Credentials (Optional for Google Login):**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application"
7. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
8. Copy the Client ID and Client Secret
9. Replace the placeholder values in `.env.local`

### 4. Start Development Server

#### For Local Development Only:
```bash
npm run dev
```

#### For Mobile/Network Access:
```bash
npm run dev:mobile
```

### 5. Access Your Application

- **Local access**: http://localhost:3000
- **Network access**: http://192.168.1.218:3000 (if using dev:mobile)

## 🧪 Testing Your Setup

### Test Credentials (Pre-configured)
- **Email**: `john@example.com`
- **Password**: `password`

### Test Commands
```bash
# Test login functionality
node test-login-credentials.js

# Test mobile access
node test-mobile-access.js

# Test chat API
node test-chat-api.js
```

## 📱 Available Features

### ✅ Core Features
- **AI Chat Interface** - Powered by Google Gemini API
- **Code Editor** - Syntax highlighting and real-time editing
- **Image Generation** - AI-powered image creation
- **User Authentication** - Email/password and Google OAuth
- **Responsive Design** - Works on desktop and mobile
- **Chat History** - Persistent conversation storage

### 🎨 UI Components
- Modern cyberpunk aesthetic
- Smooth animations with Framer Motion
- Responsive navigation
- Pricing plans section
- Testimonials
- Footer with links

## 🔧 Development Scripts

```bash
# Development server (localhost only)
npm run dev

# Development server (network accessible)
npm run dev:mobile

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📁 Project Structure

```
beloop-ai-main/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── chat/              # Chat API
│   │   ├── code/              # Code editor API
│   │   └── generate-image/    # Image generation API
│   ├── chat/                  # Chat interface
│   ├── code-editor/           # Code editor interface
│   ├── generate-image/        # Image generation interface
│   ├── components/            # Reusable components
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   └── account/               # User account page
├── lib/                       # Utility functions
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── README.md                  # Project documentation
```

## 🐛 Troubleshooting

### Common Issues

**❌ "Module not found" errors**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**❌ "Environment variables not loaded"**
- Make sure `.env.local` is in the project root
- Restart the development server after creating the file
- Check for typos in variable names

**❌ "API key invalid"**
- Verify your Gemini API key is correct
- Check that the key has proper permissions
- Ensure no extra spaces in the `.env.local` file

**❌ "Port 3000 already in use"**
```bash
# Find and kill the process using port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

**❌ "Authentication not working"**
- Verify NextAuth configuration in `.env.local`
- Check that `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your local URL

### Debug Commands

```bash
# Check if server is running
netstat -an | findstr :3000

# Test API endpoints
curl http://localhost:3000/api/chat

# Check environment variables
node -e "console.log(process.env.GEMINI_API_KEY ? 'API Key loaded' : 'API Key missing')"
```

## 🔄 Development Workflow

### 1. Making Changes
1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test locally: `npm run dev`
4. Commit changes: `git commit -m "Add your feature"`
5. Push to remote: `git push origin feature/your-feature`

### 2. Testing
- Test on different screen sizes
- Verify all features work with authentication
- Check API responses in browser dev tools
- Test mobile access if needed

### 3. Building for Production
```bash
npm run build
npm run start
```

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Useful Tools
- **Postman** - For testing API endpoints
- **Chrome DevTools** - For debugging
- **React Developer Tools** - For React component inspection

## 🎯 Next Steps

Once your local setup is working:

1. **Explore the Features**
   - Try the AI chat functionality
   - Test the code editor
   - Generate some images
   - Test user authentication

2. **Customize the Application**
   - Modify the UI theme in `app/globals.css`
   - Update content in component files
   - Add new features or API integrations

3. **Deploy to Production**
   - Follow the deployment guide in `DEPLOYMENT.md`
   - Set up environment variables on your hosting platform
   - Configure custom domains if needed

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the existing documentation files:
   - `AUTHENTICATION_SETUP_GUIDE.md`
   - `DEPLOYMENT.md`
   - `README.md`
3. Check the browser console for errors
4. Verify all environment variables are set correctly

---

**Happy coding! 🚀**

Your Beloop AI application should now be running locally with all features working properly.
