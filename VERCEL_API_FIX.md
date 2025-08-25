# 🔧 Fix Vercel API Issue

## 🚨 **Problem**: API works locally but not on Vercel

**Solution**: Set the environment variable in Vercel dashboard

---

## ✅ **Step-by-Step Fix**

### **Step 1: Go to Vercel Dashboard**
1. **Open**: https://vercel.com/dashboard
2. **Click** on your "beloop-ai" project
3. **Go to** "Settings" tab

### **Step 2: Add Environment Variable**
1. **Click** "Environment Variables" in left sidebar
2. **Click** "Add New" button
3. **Fill in**:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyAFp-khhWqeIVM4X26Uk34uN0ekjmKIyl0`
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development
4. **Click** "Save"

### **Step 3: Redeploy**
1. **Go to** "Deployments" tab
2. **Click** the three dots (⋮) next to latest deployment
3. **Click** "Redeploy"
4. **Wait** 2-3 minutes for deployment

---

## 🔍 **Verify the Fix**

### **Check Environment Variable:**
1. **Go to** Settings → Environment Variables
2. **Verify** `GEMINI_API_KEY` is listed
3. **Check** all environments are selected

### **Test the API:**
1. **Go to** your live site
2. **Open** chat page
3. **Send** a message
4. **Should work** now! ✅

---

## 🚨 **If Still Not Working**

### **Alternative Method - Direct API Key:**
1. **Go to** Settings → Environment Variables
2. **Delete** existing `GEMINI_API_KEY` if any
3. **Add new** with exact values:
   ```
   Name: GEMINI_API_KEY
   Value: AIzaSyAFp-khhWqeIVM4X26Uk34uN0ekjmKIyl0
   Environments: All (Production, Preview, Development)
   ```
4. **Redeploy** the project

### **Check Deployment Logs:**
1. **Go to** Deployments tab
2. **Click** on latest deployment
3. **Check** "Build Logs" for errors
4. **Look for** environment variable issues

---

## 📱 **Test After Fix**

### **Local Test:**
```bash
npm run dev
# Test at http://localhost:3000/chat
```

### **Vercel Test:**
- **Go to** your live Vercel URL
- **Test** chat functionality
- **Should work** the same as local

---

## ✅ **Success Indicators**

- ✅ **Environment variable** shows in Vercel dashboard
- ✅ **Deployment completes** without errors
- ✅ **Chat works** on live site
- ✅ **No API key errors** in browser console

---

## 🆘 **Still Having Issues?**

### **Contact Support:**
- **Vercel Support**: https://vercel.com/support
- **Check** deployment logs for specific errors
- **Verify** API key is valid and active

**The API should work perfectly after setting the environment variable!** 🚀
