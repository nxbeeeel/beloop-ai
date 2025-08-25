# 🚀 Deployment Guide - Beloop AI to Vercel

This guide will walk you through deploying your Beloop AI website to Vercel step by step.

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Google Gemini API key
- ✅ Your project ready for deployment

## 🔧 Step 1: Prepare Your Project

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it `beloop-ai` (or your preferred name)
4. Make it public or private
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/beloop-ai.git
git branch -M main
git push -u origin main
```

### 1.4 Verify .gitignore
Make sure your `.gitignore` includes:
```
.env.local
.env.development.local
.env.test.local
.env.production.local
node_modules/
.next/
```

## 🌐 Step 2: Deploy to Vercel

### 2.1 Sign Up/Login to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Repository
1. Click "New Project"
2. Find and select your `beloop-ai` repository
3. Click "Import"

### 2.3 Configure Project Settings
1. **Project Name**: `beloop-ai` (or your preferred name)
2. **Framework Preset**: Next.js (should auto-detect)
3. **Root Directory**: `./` (leave as default)
4. **Build Command**: `npm run build` (should auto-detect)
5. **Output Directory**: `.next` (should auto-detect)
6. **Install Command**: `npm install` (should auto-detect)

### 2.4 Add Environment Variables
**⚠️ CRITICAL STEP - Don't skip this!**

1. Click "Environment Variables" section
2. Add the following variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key from Google AI Studio
   - **Environment**: Select all three (Production, Preview, Development)
3. Click "Add"

### 2.5 Deploy
1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-project-name.vercel.app`

## 🔑 Step 3: Get Your Gemini API Key

### 3.1 Visit Google AI Studio
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account

### 3.2 Create API Key
1. Click "Create API Key"
2. Choose "Create API Key in new project" or select existing project
3. Copy the generated API key
4. **Keep this key secure!**

### 3.3 Add to Vercel
1. Go back to your Vercel project
2. Go to Settings → Environment Variables
3. Add the API key as described in Step 2.4

## 🌍 Step 4: Custom Domain (Optional)

### 4.1 Add Domain
1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your domain (e.g., `beloopai.com`)

### 4.2 Configure DNS
1. Vercel will show you DNS records to add
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Add the DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

## 🔄 Step 5: Continuous Deployment

### 5.1 Automatic Deployments
- Every time you push to GitHub, Vercel will automatically redeploy
- No manual intervention needed

### 5.2 Update Your Site
```bash
# Make changes locally
git add .
git commit -m "Update website"
git push origin main
# Vercel will automatically deploy the changes
```

## 🧪 Step 6: Testing Your Deployment

### 6.1 Test the Homepage
- Visit your deployed URL
- Check that all animations work
- Verify responsive design on mobile

### 6.2 Test the AI Chat
- Go to `/chat` page
- Try sending a message
- Verify the AI responds correctly

### 6.3 Test All Features
- Navigation links
- Pricing section
- Contact forms
- Mobile menu

## 🚨 Troubleshooting

### Build Errors
1. **Check build logs** in Vercel dashboard
2. **Common issues**:
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies

### API Not Working
1. **Verify API key** is set correctly in Vercel
2. **Check API key** is valid in Google AI Studio
3. **Test locally** first to ensure it works

### Environment Variables Not Working
1. **Redeploy** after adding environment variables
2. **Check variable names** are exactly correct
3. **Verify environment** is set to Production

## 📊 Step 7: Monitoring

### 7.1 Vercel Analytics
- Go to your project dashboard
- Click "Analytics" to see visitor stats
- Monitor performance metrics

### 7.2 Error Monitoring
- Check "Functions" tab for API errors
- Monitor build logs for issues
- Set up error notifications

## 🔒 Step 8: Security

### 8.1 API Key Security
- ✅ Never commit API keys to Git
- ✅ Use environment variables
- ✅ Rotate keys regularly
- ✅ Monitor API usage

### 8.2 Domain Security
- ✅ Enable HTTPS (automatic with Vercel)
- ✅ Set up security headers
- ✅ Monitor for vulnerabilities

## 📈 Step 9: Optimization

### 9.1 Performance
- Monitor Core Web Vitals
- Optimize images
- Enable caching
- Use CDN (automatic with Vercel)

### 9.2 SEO
- Add meta tags
- Optimize for search engines
- Submit sitemap to Google

## 🎉 Congratulations!

Your Beloop AI website is now live and ready for the world! 

### Quick Links
- **Your Site**: `https://your-project-name.vercel.app`
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/beloop-ai`

### Next Steps
1. Share your website with the world
2. Monitor performance and analytics
3. Add more features as needed
4. Consider upgrading to Vercel Pro for advanced features

---

**Need help?** Check the [Vercel Documentation](https://vercel.com/docs) or create an issue in your GitHub repository.
