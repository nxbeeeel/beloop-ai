# Beloop AI - The Future of Code

A modern AI-powered code editor website with integrated Gemini API chat functionality.

## 🚀 Features

- **Ultra-modern UI/UX** with cyberpunk aesthetics
- **AI Chat Interface** powered by Google Gemini API
- **Real-time code suggestions** and completion
- **Responsive design** for all devices
- **Chat history** and session management
- **Pricing plans** with payment integration ready
- **Beautiful animations** and interactions

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom animations
- **Framer Motion** for smooth animations
- **Google Gemini API** for AI functionality
- **Lucide React** for icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd beloop-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get your Gemini API key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste it into your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment to Vercel

### Step 1: Prepare Your Project

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Ensure your `.env.local` is in `.gitignore`**
   ```bash
   echo ".env.local" >> .gitignore
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
   - Sign up/Login with your GitHub account

2. **Import your repository**
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure environment variables**
   - In the project settings, go to "Environment Variables"
   - Add your `GEMINI_API_KEY`:
     - **Name**: `GEMINI_API_KEY`
     - **Value**: Your actual Gemini API key
     - **Environment**: Production (and Preview if needed)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Step 3: Custom Domain (Optional)

1. **Add custom domain**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

## 🔧 API Integration

### Gemini API Setup

1. **Get API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Environment Variables**
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **API Usage**
   The chat functionality is already integrated in `/api/chat/route.ts`

## 📁 Project Structure

```
beloop-ai/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Gemini API integration
│   ├── chat/
│   │   └── page.tsx              # AI Chat interface
│   ├── components/
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Features.tsx          # Features section
│   │   ├── Pricing.tsx           # Pricing plans
│   │   ├── Testimonials.tsx      # Customer testimonials
│   │   └── Footer.tsx            # Site footer
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🎨 Customization

### Colors and Themes
- Edit `app/globals.css` to modify the color scheme
- Update CSS variables in `:root` for custom colors

### Animations
- Modify Framer Motion animations in components
- Adjust timing and easing in `globals.css`

### Content
- Update text content in respective component files
- Modify pricing plans in `Pricing.tsx`
- Update testimonials in `Testimonials.tsx`

## 🔒 Security

- API keys are stored in environment variables
- No sensitive data is exposed in client-side code
- All API calls are made server-side

## 🚀 Performance

- Optimized images and assets
- Lazy loading for better performance
- Efficient animations and transitions
- Responsive design for all devices

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your environment and steps to reproduce

## 🔄 Updates

To update your deployed site:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel will automatically redeploy

---

**Built with ❤️ using Next.js and Google Gemini API**
