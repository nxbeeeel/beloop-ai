# 🚀 Update Vercel Deployment Guide

## Current Status
- ✅ Local development working (port 3002)
- ✅ .env.local file created with API key
- ✅ Gemini API integration working locally
- ⚠️ Need to update Vercel deployment

## Option 1: Update via Vercel Dashboard (Easiest)

### Step 1: Add Environment Variable
1. Go to: https://vercel.com/dashboard
2. Click on your Beloop AI project
3. Go to "Settings" → "Environment Variables"
4. Add new variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyAFp-khhWqeIVM4X26Uk34uN0ekjmKIyl0`
   - **Environment**: Production, Preview, Development
5. Click "Save"

### Step 2: Redeploy
1. Go to "Deployments" tab
2. Click "Redeploy" on latest deployment
3. Wait for deployment to complete

## Option 2: Manual Upload

### Step 1: Create Zip File
1. Right-click on `N:\Beloop AI` folder
2. Select "Send to" → "Compressed (zipped) folder"
3. Save as `beloop-ai.zip`

### Step 2: Upload to Vercel
1. Go to Vercel Dashboard
2. Click "Import Project"
3. Choose "Upload Template"
4. Upload your `beloop-ai.zip` file
5. Configure project settings
6. Deploy

## Option 3: Install Git and Push (Recommended)

### Step 1: Install Git
1. Download: https://git-scm.com/download/win
2. Install with default settings
3. Restart terminal

### Step 2: Initialize Git
```bash
cd "N:\Beloop AI"
git init
git add .
git commit -m "Update with Gemini API integration"
```

### Step 3: Connect to GitHub
1. Create repository on GitHub
2. Push your code
3. Connect Vercel to GitHub repository

## Test Your Deployment

After updating:
1. Go to your Vercel URL
2. Test the chat functionality
3. Verify Gemini API is working

## Troubleshooting

### If API still doesn't work:
1. Check environment variables in Vercel
2. Make sure API key is correct
3. Redeploy the project

### If you get errors:
1. Check Vercel deployment logs
2. Verify all files are uploaded
3. Check environment variable names
