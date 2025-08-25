# 🚀 Beloop AI - Vercel Deployment Guide

## Prerequisites
- Git installed on your system
- GitHub account
- Vercel account
- Google Cloud Console account (for Gemini API)

---

## Step 1: Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Beloop AI website"

# Create a new repository on GitHub (do this manually)
# Then link your local repository
git remote add origin https://github.com/YOUR_USERNAME/beloop-ai.git
git branch -M main
git push -u origin main
```

---

## Step 2: Get Your Gemini API Key

1. **Go to Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Copy the API key** (it starts with "AIza...")
5. **Save it securely** - you'll need it for Vercel environment variables

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository** (beloop-ai)
5. **Configure project settings**:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
   - Install Command: `npm install`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Yes
# - Which scope: Select your account
# - Link to existing project: No
# - Project name: beloop-ai
# - Directory: ./
# - Override settings: No
```

---

## Step 4: Configure Environment Variables

### In Vercel Dashboard:
1. **Go to your project dashboard**
2. **Click "Settings" tab**
3. **Click "Environment Variables"**
4. **Add the following variable**:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key (AIza...)
   - **Environment**: Production, Preview, Development
5. **Click "Save"**

### Or via Vercel CLI:
```bash
vercel env add GEMINI_API_KEY
# Enter your API key when prompted
```

---

## Step 5: Redeploy with Environment Variables

1. **Go to "Deployments" tab**
2. **Click "Redeploy"** on your latest deployment
3. **Wait for deployment to complete**

---

## Step 6: Test Your Deployment

1. **Visit your Vercel URL** (e.g., https://beloop-ai.vercel.app)
2. **Test the chat functionality**:
   - Go to `/chat` page
   - Try sending a message
   - Verify AI responses are working

---

## Step 7: Custom Domain (Optional)

1. **In Vercel Dashboard**, go to "Settings" → "Domains"
2. **Add your custom domain** (e.g., beloopai.com)
3. **Configure DNS** as instructed by Vercel

---

## Troubleshooting

### Common Issues:

1. **API Key Not Working**:
   - Verify the API key is correct
   - Check environment variables are set
   - Ensure API key has proper permissions

2. **Build Errors**:
   - Check `package.json` dependencies
   - Verify all imports are correct
   - Check for TypeScript errors

3. **Chat Not Responding**:
   - Check browser console for errors
   - Verify API route is working
   - Test API key in Google AI Studio

### Debug Commands:
```bash
# Check build locally
npm run build

# Test API route locally
npm run dev
# Then test: http://localhost:3000/api/chat
```

---

## Security Best Practices

1. **Never commit API keys** to Git
2. **Use environment variables** for all secrets
3. **Enable Vercel's security features**:
   - Rate limiting
   - DDoS protection
   - SSL/TLS encryption

---

## Performance Optimization

1. **Enable Vercel Analytics** for monitoring
2. **Use Vercel Edge Functions** for faster API responses
3. **Optimize images** and assets
4. **Enable caching** strategies

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Test API endpoints separately
4. Contact Vercel support if needed

---

## 🎉 Congratulations!

Your Beloop AI website is now live on Vercel with full Gemini API integration!

**Next Steps:**
- Share your website URL
- Monitor performance and usage
- Consider adding analytics
- Plan for scaling as you grow
