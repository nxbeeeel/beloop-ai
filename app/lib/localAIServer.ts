// Local AI Server - Provides intelligent responses when Gemini is unavailable
export interface LocalAIResponse {
  response: string
  codePreview?: {
    html?: string
    css?: string
    js?: string
    title?: string
  }
  suggestions?: string[]
  confidence: number
}

// Knowledge base for different topics
const knowledgeBase = {
  // Web Development
  webDevelopment: {
    patterns: [
      {
        keywords: ['website', 'web', 'html', 'page', 'site'],
        responses: [
          {
            text: `I'll create a beautiful website for you! Here's a modern, responsive design:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
            max-width: 600px;
            width: 90%;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5em;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        
        .button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .feature {
            background: rgba(102, 126, 234, 0.1);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        .feature h3 {
            color: #667eea;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome!</h1>
        <p>This is a stunning modern website created with HTML and CSS. It features a beautiful gradient background, smooth animations, and responsive design that works on all devices.</p>
        
        <button class="button" onclick="showMessage()">Get Started</button>
        <button class="button" onclick="toggleFeatures()">View Features</button>
        
        <div class="features" id="features" style="display: none;">
            <div class="feature">
                <h3>✨ Modern Design</h3>
                <p>Clean, professional layout with beautiful gradients</p>
            </div>
            <div class="feature">
                <h3>📱 Responsive</h3>
                <p>Works perfectly on desktop, tablet, and mobile</p>
            </div>
            <div class="feature">
                <h3>⚡ Fast Loading</h3>
                <p>Optimized for speed and performance</p>
            </div>
        </div>
    </div>

    <script>
        function showMessage() {
            alert('🎉 Welcome to your new website! This is fully functional and ready to customize.');
        }
        
        function toggleFeatures() {
            const features = document.getElementById('features');
            features.style.display = features.style.display === 'none' ? 'grid' : 'none';
        }
        
        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    </script>
</body>
</html>
\`\`\`

This creates a modern, responsive website with:
- **Beautiful gradient background**
- **Smooth animations and hover effects**
- **Responsive grid layout**
- **Interactive buttons and features**
- **Professional typography**
- **Mobile-friendly design**

You can customize the colors, text, and styling to match your brand!`,
            codePreview: {
              html: `<div class="container">
    <h1>🚀 Welcome!</h1>
    <p>This is a stunning modern website created with HTML and CSS.</p>
    <button class="button" onclick="showMessage()">Get Started</button>
    <button class="button" onclick="toggleFeatures()">View Features</button>
    <div class="features" id="features">
        <div class="feature">
            <h3>✨ Modern Design</h3>
            <p>Clean, professional layout</p>
        </div>
    </div>
</div>`,
              css: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
    max-width: 600px;
    width: 90%;
}

.button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 10px;
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}`,
              js: `function showMessage() {
    alert('🎉 Welcome to your new website!');
}

function toggleFeatures() {
    const features = document.getElementById('features');
    features.style.display = features.style.display === 'none' ? 'grid' : 'none';
}`
            },
            confidence: 0.95
          }
        ]
      }
    ]
  },

  // JavaScript Help
  javascript: {
    patterns: [
      {
        keywords: ['javascript', 'js', 'function', 'array', 'object', 'promise'],
        responses: [
          {
            text: `I'll help you with JavaScript! Here are some common patterns and examples:

\`\`\`javascript
// Modern JavaScript Examples

// 1. Arrow Functions
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('World')); // Hello, World!

// 2. Array Methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// 3. Destructuring
const user = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = user;

// 4. Template Literals
const message = \`User \${name} is \${age} years old\`;

// 5. Async/Await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// 6. Classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
}

// 7. Modules
export const utils = {
    formatDate: (date) => date.toLocaleDateString(),
    validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
};
\`\`\`

**Key JavaScript Concepts:**
- **ES6+ Features**: Arrow functions, destructuring, template literals
- **Array Methods**: map, filter, reduce, forEach
- **Async Programming**: Promises, async/await
- **Classes**: Object-oriented programming
- **Modules**: Import/export functionality

What specific JavaScript topic would you like to learn more about?`,
            confidence: 0.9
          }
        ]
      }
    ]
  },

  // CSS Styling
  css: {
    patterns: [
      {
        keywords: ['css', 'style', 'design', 'layout', 'responsive'],
        responses: [
          {
            text: `I'll help you with modern CSS! Here are some powerful styling techniques:

\`\`\`css
/* Modern CSS Examples */

/* 1. CSS Grid Layout */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

/* 2. Flexbox */
.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* 3. CSS Custom Properties (Variables) */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #333;
    --border-radius: 10px;
}

.button {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
}

/* 4. Hover Effects */
.card {
    background: white;
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

/* 5. Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 20px;
        margin: 10px;
    }
    
    .grid-container {
        grid-template-columns: 1fr;
    }
}

/* 6. Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-in {
    animation: fadeIn 0.5s ease-out;
}

/* 7. Modern Selectors */
.card:nth-child(even) {
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

/* 8. CSS Filters */
.image-filter {
    filter: brightness(1.1) contrast(1.1) saturate(1.2);
}
\`\`\`

**Modern CSS Features:**
- **Grid & Flexbox**: Advanced layout systems
- **Custom Properties**: CSS variables for theming
- **Animations**: Smooth transitions and keyframes
- **Responsive Design**: Mobile-first approach
- **Modern Selectors**: Powerful element targeting

Need help with a specific CSS technique?`,
            confidence: 0.9
          }
        ]
      }
    ]
  },

  // React/Next.js
  react: {
    patterns: [
      {
        keywords: ['react', 'next', 'component', 'hook', 'state'],
        responses: [
          {
            text: `I'll help you with React and Next.js! Here are modern patterns and examples:

\`\`\`jsx
// Modern React Component Example
import { useState, useEffect } from 'react';

const ModernComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="modern-component">
            <h1>Modern React Component</h1>
            <div className="data-grid">
                {data?.map(item => (
                    <div key={item.id} className="card">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Custom Hook Example
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};

// Next.js API Route Example
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello from Next.js API!' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
\`\`\`

**Modern React Patterns:**
- **Hooks**: useState, useEffect, custom hooks
- **Functional Components**: Modern component architecture
- **Error Boundaries**: Graceful error handling
- **Performance**: React.memo, useMemo, useCallback
- **Next.js Features**: API routes, SSR, SSG

What React/Next.js topic would you like to explore?`,
            confidence: 0.9
          }
        ]
      }
    ]
  },

  // General Programming
  programming: {
    patterns: [
      {
        keywords: ['programming', 'code', 'algorithm', 'data structure', 'debug'],
        responses: [
          {
            text: `I'll help you with programming concepts! Here are essential topics:

\`\`\`javascript
// Common Programming Patterns

// 1. Binary Search Algorithm
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// 2. Recursion Example
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 3. Promise Chain
function processData(data) {
    return Promise.resolve(data)
        .then(validateData)
        .then(transformData)
        .then(saveData)
        .catch(handleError);
}

// 4. Event Emitter Pattern
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

// 5. Singleton Pattern
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
    }
    
    query(sql) {
        console.log(\`Executing: \${sql}\`);
    }
}
\`\`\`

**Programming Fundamentals:**
- **Algorithms**: Search, sort, recursion
- **Data Structures**: Arrays, objects, trees, graphs
- **Design Patterns**: Singleton, Observer, Factory
- **Error Handling**: Try-catch, validation
- **Performance**: Optimization techniques

What programming concept would you like to learn?`,
            confidence: 0.85
          }
        ]
      }
    ]
  }
};

// Intelligent response matching
export function getLocalAIResponse(userMessage: string): LocalAIResponse {
  const message = userMessage.toLowerCase();
  let bestMatch: any = null;
  let highestConfidence = 0;

  // Search through all knowledge patterns
  Object.entries(knowledgeBase).forEach(([category, data]) => {
    data.patterns.forEach(pattern => {
      const keywordMatch = pattern.keywords.some(keyword => 
        message.includes(keyword)
      );
      
      if (keywordMatch) {
        pattern.responses.forEach(response => {
          if (response.confidence > highestConfidence) {
            highestConfidence = response.confidence;
            bestMatch = response;
          }
        });
      }
    });
  });

  // If no specific match, provide a helpful default
  if (!bestMatch) {
    return {
      response: `I'm here to help you with programming and web development! 

**What I can assist with:**
- 🌐 **Web Development**: HTML, CSS, JavaScript
- ⚛️ **React & Next.js**: Modern frontend frameworks
- 🎨 **UI/UX Design**: Responsive layouts and styling
- 🔧 **Programming**: Algorithms, data structures, patterns
- 🚀 **Best Practices**: Code optimization and debugging

**Just ask me anything like:**
- "Create a website with a gradient background"
- "Help me with JavaScript functions"
- "Show me CSS grid layout examples"
- "Explain React hooks"

I'm ready to help you build amazing things! 🎉`,
      confidence: 0.7,
      suggestions: [
        "Create a simple website",
        "Help with JavaScript",
        "CSS styling examples",
        "React component patterns"
      ]
    };
  }

  return {
    response: bestMatch.text,
    codePreview: bestMatch.codePreview,
    confidence: bestMatch.confidence,
    suggestions: [
      "Ask for more examples",
      "Request specific modifications",
      "Get help with debugging",
      "Learn advanced techniques"
    ]
  };
}

// Enhanced fallback with context awareness
export function getEnhancedFallbackResponse(userMessage: string, conversationHistory: any[] = []): string {
  const localResponse = getLocalAIResponse(userMessage);
  
  // If we have conversation history, try to provide contextual updates
  if (conversationHistory.length > 0) {
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    if (lastMessage.role === 'assistant' && lastMessage.content.includes('```')) {
      return `${localResponse.response}

**💡 Context Update:**
I noticed you were working on code in our previous conversation. Would you like me to help you modify or improve that code? Just let me know what changes you'd like to make!`;
    }
  }

  return localResponse.response;
}
