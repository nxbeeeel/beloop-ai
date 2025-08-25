# 🔧 Complete Git Setup Guide for Beloop AI

## Step 1: Install Git

1. **Download Git**: https://git-scm.com/download/win
2. **Install with default settings**
3. **Restart your terminal/PowerShell**

## Step 2: Configure Git Identity

```bash
# Set your name
git config --global user.name "Mohammed Nabeel"

# Set your email
git config --global user.email "your-email@example.com"

# Verify your settings
git config --list
```

## Step 3: Initialize Git Repository

```bash
# Navigate to your project folder
cd "N:\Beloop AI"

# Initialize git repository
git init

# Check status
git status
```

## Step 4: Add Files to Git

```bash
# Add all files
git add .

# Check what's staged
git status
```

## Step 5: Create First Commit

```bash
# Create initial commit
git commit -m "Initial commit: Beloop AI website with Gemini integration"

# Check commit history
git log --oneline
```

## Step 6: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Sign in/Sign up**
3. **Click "New repository"**
4. **Repository name**: `beloop-ai`
5. **Description**: `Beloop AI - Advanced AI Assistant with Gemini Integration`
6. **Make it Public** (or Private if you prefer)
7. **Don't initialize with README** (we already have files)
8. **Click "Create repository"**

## Step 7: Connect Local to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/beloop-ai.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 8: Verify Everything Works

```bash
# Check remote
git remote -v

# Check status
git status

# Check branches
git branch -a
```

## Step 9: Future Updates

```bash
# When you make changes:
git add .
git commit -m "Description of your changes"
git push
```

## Common Git Commands

```bash
# Check status
git status

# See changes
git diff

# See commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull

# See all branches
git branch -a
```

## Troubleshooting

### If you get authentication errors:
1. **Use GitHub CLI** (recommended):
   ```bash
   # Install GitHub CLI
   winget install GitHub.cli
   
   # Login
   gh auth login
   ```

2. **Or use Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token
   - Use token as password when pushing

### If you get "fatal: not a git repository":
```bash
# Make sure you're in the right directory
cd "N:\Beloop AI"
git init
```

### If you get "fatal: remote origin already exists":
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/beloop-ai.git
```

## Next Steps After Git Setup

1. **Follow the Vercel deployment guide**
2. **Get your Gemini API key**
3. **Deploy to Vercel**
4. **Test your live website**

## 🎉 Success!

Once you complete these steps, your code will be safely stored on GitHub and ready for deployment!
