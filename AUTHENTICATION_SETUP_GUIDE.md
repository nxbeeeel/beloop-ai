# 🔐 Authentication Setup Guide

## 📋 Test Credentials

### ✅ **Ready-to-Use Test Account**
- **Email**: `john@example.com`
- **Password**: `password`

### 🚀 **Quick Test**
1. Go to: `http://192.168.1.218:3000/login`
2. Use the credentials above
3. Click "Sign In"
4. You should be redirected to the chat page

## 🔧 Google OAuth Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API

### 2. Create OAuth 2.0 Credentials
1. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add these Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://192.168.1.218:3000/api/auth/callback/google`

### 3. Get Your Credentials
- **Client ID**: Copy from the OAuth 2.0 client
- **Client Secret**: Copy from the OAuth 2.0 client

## 📝 Environment Variables Setup

### 1. Create `.env.local` file
Create a file called `.env.local` in your project root:

```env
# Google Gemini API Key
GEMINI_API_KEY=your_actual_gemini_api_key_here

# NextAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here

# NextAuth Secret (use the generated one below)
NEXTAUTH_SECRET=Pq8c7woTC90wyoN/V6geYq43TuuSiuSuYb78sgbX56g=

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Restart the Server
After creating `.env.local`, restart your server:
```bash
npm run dev:mobile
```

## 🧪 Testing Authentication

### Test Credentials Login
```bash
node test-login-credentials.js
```

### Test on Mobile
1. Open your phone browser
2. Go to: `http://192.168.1.218:3000/login`
3. Try both:
   - **Credentials login** (email/password)
   - **Google login** (if configured)

## 🔍 Troubleshooting

### ❌ "Invalid credentials" error
- Make sure you're using: `john@example.com` / `password`
- Check that the server is running
- Verify the user exists in the database

### ❌ Google login not working
1. **Check `.env.local`**:
   - Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
   - Make sure there are no extra spaces

2. **Check Google Cloud Console**:
   - Verify the redirect URI is correct
   - Make sure the API is enabled
   - Check that the credentials are for "Web application"

3. **Check browser console**:
   - Open Developer Tools (F12)
   - Look for any JavaScript errors
   - Check Network tab for failed requests

### ❌ "NextAuth secret not set" error
- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Use the generated secret: `Pq8c7woTC90wyoN/V6geYq43TuuSiuSuYb78sgbX56g=`

### ❌ "Redirect URI mismatch" error
- Add both redirect URIs to Google Cloud Console:
  - `http://localhost:3000/api/auth/callback/google`
  - `http://192.168.1.218:3000/api/auth/callback/google`

## 📱 Mobile Testing

### ✅ What Works on Mobile
- ✅ Credentials login (email/password)
- ✅ Google OAuth (if configured)
- ✅ Session persistence
- ✅ All app features after login

### 📋 Test Checklist
- [ ] Can access login page on mobile
- [ ] Can sign in with test credentials
- [ ] Can sign in with Google (if configured)
- [ ] Can access chat after login
- [ ] Can access code editor after login
- [ ] Can access image generation after login
- [ ] Session persists after page refresh

## 🎯 Features Available After Login

### 💬 AI Chat
- Send messages to AI assistant
- View chat history
- Start new conversations
- Delete old conversations

### 🎨 Image Generation
- Generate images with prompts
- Choose different styles
- View generated images
- Track usage limits

### 💻 Code Editor
- Create new code projects
- Edit code with syntax highlighting
- Preview code
- Search and manage projects
- Support for multiple languages

### 👤 User Profile
- View account information
- Check membership status
- Track usage limits
- Sign out functionality

## 🆘 Need Help?

### Common Issues
1. **"User not found"** → Use the test credentials exactly
2. **"Invalid password"** → Make sure you're using `password` (not `Password`)
3. **Google login fails** → Check your OAuth credentials in Google Cloud Console
4. **Mobile access issues** → Make sure you're on the same WiFi network

### Debug Commands
```bash
# Test login API
node test-login-credentials.js

# Test mobile access
node test-mobile-access.js

# Check server status
netstat -an | findstr :3000
```

## 🎉 Success!

Once you can log in successfully, you'll have access to:
- ✅ Working chat with AI
- ✅ Image generation
- ✅ Code editor with preview/edit
- ✅ User profile management
- ✅ Membership system
- ✅ Mobile-responsive design

Happy testing! 🚀
