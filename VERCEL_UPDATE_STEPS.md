# 🚀 Update Vercel Deployment - Working Code

## Current Status
- ✅ Local development working (port 3002)
- ✅ Gemini API integration working locally
- ✅ Using gemini-1.5-flash model
- ⚠️ Vercel deployment needs update

## Option 1: Vercel Dashboard Update (5 minutes)

### Step 1: Update Environment Variable
1. Go to: https://vercel.com/dashboard
2. Click on your Beloop AI project
3. Go to "Settings" → "Environment Variables"
4. Add/Update:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyAFp-khhWqeIVM4X26Uk34uN0ekjmKIyl0`
   - **Environment**: Production, Preview, Development
5. Click "Save"

### Step 2: Redeploy
1. Go to "Deployments" tab
2. Click "Redeploy" on latest deployment
3. Wait for completion

## Option 2: Manual Upload (10 minutes)

### Step 1: Create Zip
1. Right-click on `N:\Beloop AI` folder
2. Select "Send to" → "Compressed (zipped) folder"
3. Save as `beloop-ai-working.zip`

### Step 2: Upload to Vercel
1. Go to Vercel Dashboard
2. Click "Import Project"
3. Choose "Upload Template"
4. Upload `beloop-ai-working.zip`
5. Configure:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add Environment Variable:
   - Name: `GEMINI_API_KEY`
   - Value: `AIzaSyAFp-khhWqeIVM4X26Uk34uN0ekjmKIyl0`
7. Deploy

## Option 3: Git Push (15 minutes)

### Step 1: Install Git
1. Download: https://git-scm.com/download/win
2. Install with defaults
3. Restart terminal

### Step 2: Initialize Git
```bash
cd "N:\Beloop AI"
git init
git add .
git commit -m "Working Gemini API integration"
```

### Step 3: Push to GitHub
1. Create GitHub repository
2. Push code
3. Connect Vercel to GitHub

## Test After Update

1. Go to your Vercel URL
2. Test chat functionality
3. Should work like local version

## Troubleshooting

### If still not working:
1. Check Vercel deployment logs
2. Verify environment variable is set
3. Make sure model is `gemini-1.5-flash`
4. Check API key is correct

### Common Issues:
- Environment variable not applied (must redeploy)
- Wrong model name (should be `gemini-1.5-flash`)
- API quota exceeded (get new key)
