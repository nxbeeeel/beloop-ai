// Fallback responses for when Gemini API is unavailable
export const fallbackResponses = {
  // Web development responses
  website: `I'd be happy to help you create a website! Here's a simple example:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        
        p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome!</h1>
        <p>This is a beautiful website created with HTML and CSS. The gradient background and modern styling make it look professional and engaging.</p>
        <button class="button" onclick="showMessage()">Click Me!</button>
    </div>

    <script>
        function showMessage() {
            alert('🎉 Hello! This website is working perfectly!');
        }
    </script>
</body>
</html>
\`\`\`

This creates a modern, responsive website with a gradient background, centered content, and interactive elements. You can customize the colors, text, and styling to match your needs!`,

  // General coding help
  coding: `I can help you with coding! Here are some common topics I can assist with:

**Web Development:**
- HTML, CSS, JavaScript
- React, Next.js, Vue.js
- Responsive design
- Modern UI/UX

**Programming:**
- Python, JavaScript, TypeScript
- Data structures and algorithms
- Best practices and patterns
- Debugging and optimization

**Tools & Technologies:**
- Git and version control
- APIs and integrations
- Database design
- Deployment and hosting

Just let me know what specific coding help you need, and I'll provide detailed examples and explanations!`,

  // Error message
  error: `I apologize, but I'm currently experiencing technical difficulties with my AI service. This could be due to:

1. **API Rate Limit** - The free tier has a daily limit
2. **Service Maintenance** - Temporary server issues
3. **Network Connectivity** - Connection problems

**What you can do:**
- Try again in a few minutes
- Check your internet connection
- Contact support if the issue persists

**Alternative:**
You can still explore the website features like:
- Chat history and conversations
- Code editor interface
- Premium subscription system
- Responsive design

I'll be back online as soon as possible! 🚀`,

  // Default response
  default: `Hello! I'm here to help you with coding and web development. 

**What I can do:**
- Create websites and web applications
- Help with HTML, CSS, JavaScript
- Provide code examples and explanations
- Assist with debugging and optimization
- Share best practices and modern techniques

**Just ask me anything like:**
- "Create a simple website"
- "Help me with CSS styling"
- "Show me how to make a button"
- "Explain JavaScript functions"

I'm ready to help you build amazing things! 🎉`
}

// Function to get appropriate fallback response based on user input
export function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  if (message.includes('website') || message.includes('web') || message.includes('html') || message.includes('page')) {
    return fallbackResponses.website
  }
  
  if (message.includes('code') || message.includes('programming') || message.includes('javascript') || message.includes('css')) {
    return fallbackResponses.coding
  }
  
  if (message.includes('error') || message.includes('problem') || message.includes('issue')) {
    return fallbackResponses.error
  }
  
  return fallbackResponses.default
}
