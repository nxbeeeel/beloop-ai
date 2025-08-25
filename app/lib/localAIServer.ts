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

// Enhanced knowledge base with better pattern matching
const knowledgeBase = {
  // Web Development
  webDevelopment: {
    patterns: [
      {
        keywords: ['website', 'web', 'html', 'page', 'site', 'landing page'],
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
        keywords: ['javascript', 'js', 'function', 'array', 'object', 'promise', 'async', 'await'],
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
        keywords: ['css', 'style', 'design', 'layout', 'responsive', 'grid', 'flexbox'],
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
        keywords: ['react', 'next', 'component', 'hook', 'state', 'useState', 'useEffect'],
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

  // Button and UI Components
  uiComponents: {
    patterns: [
      {
        keywords: ['button', 'card', 'modal', 'form', 'input', 'dropdown', 'menu'],
        responses: [
          {
            text: `I'll help you create beautiful UI components! Here are some examples:

\`\`\`html
<!-- Modern Button Component -->
<button class="modern-button">
    <span class="button-text">Click Me</span>
    <span class="button-icon">→</span>
</button>

<!-- Card Component -->
<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
        <span class="badge">New</span>
    </div>
    <div class="card-body">
        <p>This is a beautiful card component with modern styling.</p>
    </div>
    <div class="card-footer">
        <button class="btn-primary">Action</button>
        <button class="btn-secondary">Cancel</button>
    </div>
</div>

<!-- Modal Component -->
<div class="modal-overlay" id="modal">
    <div class="modal">
        <div class="modal-header">
            <h2>Modal Title</h2>
            <button class="close-btn" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <p>This is the modal content.</p>
        </div>
    </div>
</div>
\`\`\`

\`\`\`css
/* Modern Button Styles */
.modern-button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.modern-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Card Styles */
.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
}

.card-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body {
    padding: 20px;
}

.card-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 10px;
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}
\`\`\`

\`\`\`javascript
// Modal functionality
function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside
document.querySelector('.modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
\`\`\`

These components feature:
- **Modern styling** with gradients and shadows
- **Smooth animations** and hover effects
- **Responsive design** that works on all devices
- **Accessible** with proper focus states
- **Reusable** and customizable

Need help with a specific component?`,
            confidence: 0.9
          }
        ]
      }
    ]
  },

  // Animation and Effects
  animations: {
    patterns: [
      {
        keywords: ['animation', 'transition', 'hover', 'effect', 'fade', 'slide', 'bounce'],
        responses: [
          {
            text: `I'll help you create amazing animations and effects! Here are some examples:

\`\`\`css
/* Smooth Transitions */
.smooth-transition {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover Effects */
.hover-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.hover-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Fade In Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}

/* Slide In Animation */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-in {
    animation: slideIn 0.5s ease-out;
}

/* Bounce Effect */
@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0);
    }
    40%, 43% {
        transform: translate3d(0, -30px, 0);
    }
    70% {
        transform: translate3d(0, -15px, 0);
    }
    90% {
        transform: translate3d(0, -4px, 0);
    }
}

.bounce {
    animation: bounce 1s ease-in-out;
}

/* Pulse Effect */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.pulse {
    animation: pulse 2s infinite;
}

/* Loading Spinner */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
\`\`\`

\`\`\`javascript
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all elements with animation class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Smooth scroll to element
function smoothScrollTo(elementId) {
    document.getElementById(elementId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
\`\`\`

**Animation Features:**
- **Smooth transitions** with custom easing
- **Hover effects** that respond to user interaction
- **Scroll-triggered animations** using Intersection Observer
- **Loading states** with spinners and progress indicators
- **Performance optimized** using transform and opacity

Want to create a specific animation effect?`,
            confidence: 0.9
          }
        ]
      }
    ]
  },

  // Form and Input
  forms: {
    patterns: [
      {
        keywords: ['form', 'input', 'validation', 'submit', 'login', 'signup', 'contact'],
        responses: [
          {
            text: `I'll help you create beautiful and functional forms! Here are some examples:

\`\`\`html
<!-- Modern Contact Form -->
<form class="contact-form" id="contactForm">
    <div class="form-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" required>
        <span class="error-message" id="nameError"></span>
    </div>
    
    <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
        <span class="error-message" id="emailError"></span>
    </div>
    
    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        <span class="error-message" id="messageError"></span>
    </div>
    
    <button type="submit" class="submit-btn">
        <span class="btn-text">Send Message</span>
        <span class="btn-icon">→</span>
    </button>
</form>
\`\`\`

\`\`\`css
/* Form Styles */
.contact-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 24px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error,
.form-group textarea.error {
    border-color: #e74c3c;
    background: #fdf2f2;
}

.error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 4px;
    display: block;
}

.submit-btn {
    width: 100%;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}
\`\`\`

\`\`\`javascript
// Form validation and submission
const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea');

// Real-time validation
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Clear previous error
    field.classList.remove('error');
    errorElement.textContent = '';
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.id + 'Error');
    errorElement.textContent = message;
}

function clearError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + 'Error');
    errorElement.textContent = '';
}

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) return;
    
    // Submit form
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.textContent = '⏳';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        btnText.textContent = 'Message Sent!';
        btnIcon.textContent = '✅';
        form.reset();
        
        setTimeout(() => {
            btnText.textContent = 'Send Message';
            btnIcon.textContent = '→';
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        // Error
        btnText.textContent = 'Error! Try Again';
        btnIcon.textContent = '❌';
        submitBtn.disabled = false;
    }
});
\`\`\`

**Form Features:**
- **Real-time validation** with helpful error messages
- **Beautiful styling** with focus states and animations
- **Accessible** with proper labels and ARIA attributes
- **Loading states** during submission
- **Responsive design** that works on all devices

Need help with a specific form feature?`,
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
        keywords: ['programming', 'code', 'algorithm', 'data structure', 'debug', 'function', 'loop'],
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

// 6. Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 7. Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
\`\`\`

**Programming Fundamentals:**
- **Algorithms**: Search, sort, recursion
- **Data Structures**: Arrays, objects, trees, graphs
- **Design Patterns**: Singleton, Observer, Factory
- **Error Handling**: Try-catch, validation
- **Performance**: Optimization techniques like debouncing and throttling

What programming concept would you like to learn?`,
            confidence: 0.85
          }
        ]
      }
    ]
  },

  // Games and Entertainment
  games: {
    patterns: [
      {
        keywords: ['game', 'play', 'tic tac toe', 'number guessing', 'memory', 'puzzle', 'fun'],
        responses: [
          {
            text: `Let's play some fun games! Here are 3 interactive games you can play:

## 🎮 **1. Tic-Tac-Toe Game**

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .game-container {
            text-align: center;
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 20px 0;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cell {
            width: 80px;
            height: 80px;
            border: 2px solid #667eea;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #f8f9fa;
        }
        
        .cell:hover {
            background: #e3f2fd;
            transform: scale(1.05);
        }
        
        .cell.x {
            color: #e74c3c;
        }
        
        .cell.o {
            color: #3498db;
        }
        
        .status {
            font-size: 1.5em;
            margin: 20px 0;
            font-weight: bold;
            color: #333;
        }
        
        .restart-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .restart-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🎮 Tic-Tac-Toe</h1>
        <div class="status" id="status">Player X's turn</div>
        <div class="board" id="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <button class="restart-btn" onclick="restartGame()">Restart Game</button>
    </div>

    <script>
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const index = cell.dataset.index;
                if (gameBoard[index] === '' && gameActive) {
                    gameBoard[index] = currentPlayer;
                    cell.textContent = currentPlayer;
                    cell.classList.add(currentPlayer.toLowerCase());
                    
                    if (checkWinner()) {
                        document.getElementById('status').textContent = \`Player \${currentPlayer} wins! 🎉\`;
                        gameActive = false;
                    } else if (gameBoard.every(cell => cell !== '')) {
                        document.getElementById('status').textContent = "It's a draw! 🤝";
                        gameActive = false;
                    } else {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        document.getElementById('status').textContent = \`Player \${currentPlayer}'s turn\`;
                    }
                }
            });
        });

        function checkWinner() {
            return winningCombos.some(combo => {
                return combo.every(index => {
                    return gameBoard[index] === currentPlayer;
                });
            });
        }

        function restartGame() {
            currentPlayer = 'X';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            document.getElementById('status').textContent = "Player X's turn";
            document.querySelectorAll('.cell').forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o');
            });
        }
    </script>
</body>
</html>
\`\`\`

## 🎲 **2. Number Guessing Game**

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Number Guessing Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .game-container {
            text-align: center;
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 90%;
        }
        
        .input-group {
            margin: 20px 0;
        }
        
        input[type="number"] {
            padding: 12px;
            border: 2px solid #667eea;
            border-radius: 8px;
            font-size: 16px;
            width: 100px;
            text-align: center;
        }
        
        .guess-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            margin-left: 10px;
            transition: all 0.3s ease;
        }
        
        .guess-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .message {
            margin: 20px 0;
            padding: 15px;
            border-radius: 10px;
            font-weight: bold;
        }
        
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .message.info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }
        
        .message.warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🎲 Number Guessing Game</h1>
        <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
        
        <div class="input-group">
            <input type="number" id="guessInput" min="1" max="100" placeholder="Enter your guess">
            <button class="guess-btn" onclick="makeGuess()">Guess!</button>
        </div>
        
        <div id="message"></div>
        <div id="attempts">Attempts: 0</div>
        
        <button class="guess-btn" onclick="newGame()" style="margin-top: 20px;">New Game</button>
    </div>

    <script>
        let targetNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        let gameWon = false;

        function makeGuess() {
            if (gameWon) return;
            
            const guess = parseInt(document.getElementById('guessInput').value);
            const messageDiv = document.getElementById('message');
            
            if (isNaN(guess) || guess < 1 || guess > 100) {
                messageDiv.innerHTML = '<div class="message warning">Please enter a valid number between 1 and 100!</div>';
                return;
            }
            
            attempts++;
            document.getElementById('attempts').textContent = \`Attempts: \${attempts}\`;
            
            if (guess === targetNumber) {
                messageDiv.innerHTML = \`<div class="message success">🎉 Congratulations! You guessed it in \${attempts} attempts!</div>\`;
                gameWon = true;
            } else if (guess < targetNumber) {
                messageDiv.innerHTML = '<div class="message info">📈 Too low! Try a higher number.</div>';
            } else {
                messageDiv.innerHTML = '<div class="message info">📉 Too high! Try a lower number.</div>';
            }
            
            document.getElementById('guessInput').value = '';
            document.getElementById('guessInput').focus();
        }

        function newGame() {
            targetNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            gameWon = false;
            document.getElementById('message').innerHTML = '';
            document.getElementById('attempts').textContent = 'Attempts: 0';
            document.getElementById('guessInput').value = '';
        }

        // Allow Enter key to submit
        document.getElementById('guessInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });
    </script>
</body>
</html>
\`\`\`

## 🧠 **3. Memory Card Game**

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Card Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .game-container {
            text-align: center;
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .board {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 20px 0;
        }
        
        .card {
            width: 80px;
            height: 80px;
            border: 2px solid #667eea;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #667eea;
            color: white;
            font-weight: bold;
        }
        
        .card.flipped {
            background: white;
            color: #333;
            transform: rotateY(180deg);
        }
        
        .card.matched {
            background: #27ae60;
            color: white;
            border-color: #27ae60;
        }
        
        .restart-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .restart-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🧠 Memory Card Game</h1>
        <div class="stats">
            <div>Moves: <span id="moves">0</span></div>
            <div>Pairs Found: <span id="pairs">0</span></div>
        </div>
        <div class="board" id="board"></div>
        <button class="restart-btn" onclick="restartGame()">Restart Game</button>
    </div>

    <script>
        const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
        let cards = [...emojis, ...emojis]; // Duplicate for pairs
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        let canFlip = true;

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
            shuffleArray(cards);
            
            cards.forEach((emoji, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.index = index;
                card.dataset.emoji = emoji;
                card.addEventListener('click', flipCard);
                board.appendChild(card);
            });
        }

        function flipCard() {
            if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) {
                return;
            }
            
            this.classList.add('flipped');
            this.textContent = this.dataset.emoji;
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                moves++;
                document.getElementById('moves').textContent = moves;
                canFlip = false;
                
                setTimeout(checkMatch, 1000);
            }
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                document.getElementById('pairs').textContent = matchedPairs;
                
                if (matchedPairs === emojis.length) {
                    setTimeout(() => {
                        alert(\`🎉 Congratulations! You completed the game in \${moves} moves!\`);
                    }, 500);
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
            }
            
            flippedCards = [];
            canFlip = true;
        }

        function restartGame() {
            matchedPairs = 0;
            moves = 0;
            flippedCards = [];
            canFlip = true;
            document.getElementById('moves').textContent = '0';
            document.getElementById('pairs').textContent = '0';
            createBoard();
        }

        // Initialize game
        createBoard();
    </script>
</body>
</html>
\`\`\`

**🎮 Game Features:**
- **Tic-Tac-Toe**: Classic 3x3 grid game with smooth animations
- **Number Guessing**: Interactive guessing game with hints
- **Memory Game**: Card matching game with emoji pairs

All games feature:
- **Beautiful UI** with gradients and animations
- **Responsive design** that works on all devices
- **Score tracking** and game statistics
- **Restart functionality** to play again

Try them out! Which game would you like to play first? 🎯`,
            confidence: 0.95
          }
        ]
      }
    ]
  },

  // Calculator and Tools
  tools: {
    patterns: [
      {
        keywords: ['calculator', 'calc', 'math', 'calculate', 'converter', 'tool'],
        responses: [
          {
            text: `I'll create a useful calculator and tools for you! Here's a multi-functional calculator:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multi-Function Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .calculator {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            max-width: 400px;
            width: 90%;
        }
        
        .display {
            background: #2c3e50;
            color: white;
            padding: 30px;
            text-align: right;
            font-size: 2em;
            font-weight: bold;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
        }
        
        .btn {
            padding: 20px;
            border: none;
            background: #ecf0f1;
            font-size: 1.2em;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background: #bdc3c7;
        }
        
        .btn.operator {
            background: #e74c3c;
            color: white;
        }
        
        .btn.operator:hover {
            background: #c0392b;
        }
        
        .btn.equals {
            background: #27ae60;
            color: white;
        }
        
        .btn.equals:hover {
            background: #229954;
        }
        
        .btn.clear {
            background: #f39c12;
            color: white;
        }
        
        .btn.clear:hover {
            background: #e67e22;
        }
        
        .btn.span-2 {
            grid-column: span 2;
        }
        
        .converter {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 30px;
            margin-top: 20px;
            max-width: 400px;
            width: 90%;
        }
        
        .converter h3 {
            margin-top: 0;
            color: #333;
        }
        
        .converter input {
            width: 100%;
            padding: 12px;
            border: 2px solid #667eea;
            border-radius: 8px;
            font-size: 16px;
            margin: 10px 0;
        }
        
        .converter select {
            width: 100%;
            padding: 12px;
            border: 2px solid #667eea;
            border-radius: 8px;
            font-size: 16px;
            margin: 10px 0;
        }
        
        .result {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            font-weight: bold;
            color: #333;
        }
    </style>
</head>
<body>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <div class="calculator">
            <div class="display" id="display">0</div>
            <div class="buttons">
                <button class="btn clear" onclick="clearDisplay()">C</button>
                <button class="btn operator" onclick="appendToDisplay('(')">(</button>
                <button class="btn operator" onclick="appendToDisplay(')')">)</button>
                <button class="btn operator" onclick="appendToDisplay('/')">/</button>
                
                <button class="btn" onclick="appendToDisplay('7')">7</button>
                <button class="btn" onclick="appendToDisplay('8')">8</button>
                <button class="btn" onclick="appendToDisplay('9')">9</button>
                <button class="btn operator" onclick="appendToDisplay('*')">×</button>
                
                <button class="btn" onclick="appendToDisplay('4')">4</button>
                <button class="btn" onclick="appendToDisplay('5')">5</button>
                <button class="btn" onclick="appendToDisplay('6')">6</button>
                <button class="btn operator" onclick="appendToDisplay('-')">-</button>
                
                <button class="btn" onclick="appendToDisplay('1')">1</button>
                <button class="btn" onclick="appendToDisplay('2')">2</button>
                <button class="btn" onclick="appendToDisplay('3')">3</button>
                <button class="btn operator" onclick="appendToDisplay('+')">+</button>
                
                <button class="btn span-2" onclick="appendToDisplay('0')">0</button>
                <button class="btn" onclick="appendToDisplay('.')">.</button>
                <button class="btn equals" onclick="calculate()">=</button>
            </div>
        </div>
        
        <div class="converter">
            <h3>🌡️ Temperature Converter</h3>
            <input type="number" id="tempInput" placeholder="Enter temperature" oninput="convertTemperature()">
            <select id="fromUnit" onchange="convertTemperature()">
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            </select>
            <select id="toUnit" onchange="convertTemperature()">
                <option value="fahrenheit">Fahrenheit</option>
                <option value="celsius">Celsius</option>
                <option value="kelvin">Kelvin</option>
            </select>
            <div class="result" id="tempResult">Result will appear here</div>
        </div>
    </div>

    <script>
        let displayValue = '0';
        let newNumber = true;

        function updateDisplay() {
            document.getElementById('display').textContent = displayValue;
        }

        function appendToDisplay(value) {
            if (newNumber) {
                displayValue = value;
                newNumber = false;
            } else {
                displayValue += value;
            }
            updateDisplay();
        }

        function clearDisplay() {
            displayValue = '0';
            newNumber = true;
            updateDisplay();
        }

        function calculate() {
            try {
                displayValue = eval(displayValue).toString();
                newNumber = true;
                updateDisplay();
            } catch (error) {
                displayValue = 'Error';
                updateDisplay();
                setTimeout(clearDisplay, 1000);
            }
        }

        function convertTemperature() {
            const input = parseFloat(document.getElementById('tempInput').value);
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            
            if (isNaN(input)) {
                document.getElementById('tempResult').textContent = 'Please enter a valid number';
                return;
            }
            
            let result;
            
            // Convert to Celsius first
            let celsius;
            switch (fromUnit) {
                case 'celsius':
                    celsius = input;
                    break;
                case 'fahrenheit':
                    celsius = (input - 32) * 5/9;
                    break;
                case 'kelvin':
                    celsius = input - 273.15;
                    break;
            }
            
            // Convert from Celsius to target unit
            switch (toUnit) {
                case 'celsius':
                    result = celsius;
                    break;
                case 'fahrenheit':
                    result = celsius * 9/5 + 32;
                    break;
                case 'kelvin':
                    result = celsius + 273.15;
                    break;
            }
            
            document.getElementById('tempResult').textContent = \`\${input}°\${fromUnit.charAt(0).toUpperCase()} = \${result.toFixed(2)}°\${toUnit.charAt(0).toUpperCase()}\`;
        }
    </script>
</body>
</html>
\`\`\`

**🔧 Tool Features:**
- **Scientific Calculator** with basic operations
- **Temperature Converter** (Celsius, Fahrenheit, Kelvin)
- **Beautiful UI** with responsive design
- **Error handling** for invalid calculations
- **Real-time conversion** as you type

Perfect for quick calculations and conversions! 🧮`,
            confidence: 0.9
          }
        ]
      }
    ]
  },

  // Weather and Time
  weather: {
    patterns: [
      {
        keywords: ['weather', 'time', 'clock', 'date', 'temperature', 'forecast'],
        responses: [
          {
            text: `I'll create a beautiful weather and time display for you! Here's a live clock and weather widget:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather & Time Widget</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .widget {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 30px;
            text-align: center;
            backdrop-filter: blur(10px);
            max-width: 400px;
            width: 90%;
        }
        
        .clock {
            font-size: 3em;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
            font-family: 'Courier New', monospace;
        }
        
        .date {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
        
        .weather {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
        }
        
        .temperature {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .description {
            font-size: 1.2em;
            margin-bottom: 15px;
        }
        
        .details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
        }
        
        .detail-item {
            background: rgba(255, 255, 255, 0.1);
            padding: 10px;
            border-radius: 8px;
        }
        
        .detail-label {
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .detail-value {
            font-size: 1.1em;
            font-weight: bold;
        }
        
        .location {
            font-size: 1.1em;
            color: #333;
            margin-bottom: 20px;
        }
        
        .refresh-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .refresh-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
    </style>
</head>
<body>
    <div class="widget">
        <div class="clock" id="clock">00:00:00</div>
        <div class="date" id="date">Loading...</div>
        
        <div class="location" id="location">📍 Getting location...</div>
        
        <div class="weather" id="weather">
            <div class="temperature" id="temperature">--°C</div>
            <div class="description" id="description">Loading weather...</div>
            <div class="details">
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value" id="humidity">--%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind</div>
                    <div class="detail-value" id="wind">-- km/h</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value" id="pressure">-- hPa</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Visibility</div>
                    <div class="detail-value" id="visibility">-- km</div>
                </div>
            </div>
        </div>
        
        <button class="refresh-btn" onclick="getWeather()">🔄 Refresh Weather</button>
    </div>

    <script>
        // Update clock
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            document.getElementById('clock').textContent = timeString;
            document.getElementById('date').textContent = dateString;
        }

        // Update clock every second
        setInterval(updateClock, 1000);
        updateClock();

        // Mock weather data (in real app, you'd use a weather API)
        function getWeather() {
            const weatherData = {
                temperature: Math.floor(Math.random() * 30) + 10,
                description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
                humidity: Math.floor(Math.random() * 40) + 40,
                wind: Math.floor(Math.random() * 20) + 5,
                pressure: Math.floor(Math.random() * 50) + 1000,
                visibility: Math.floor(Math.random() * 10) + 5
            };
            
            document.getElementById('temperature').textContent = \`\${weatherData.temperature}°C\`;
            document.getElementById('description').textContent = weatherData.description;
            document.getElementById('humidity').textContent = \`\${weatherData.humidity}%\`;
            document.getElementById('wind').textContent = \`\${weatherData.wind} km/h\`;
            document.getElementById('pressure').textContent = \`\${weatherData.pressure} hPa\`;
            document.getElementById('visibility').textContent = \`\${weatherData.visibility} km\`;
            
            // Simulate location
            const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Mumbai'];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            document.getElementById('location').textContent = \`📍 \${randomCity}\`;
        }

        // Get weather on load
        getWeather();
    </script>
</body>
</html>
\`\`\`

**🌤️ Widget Features:**
- **Live Clock** with real-time updates
- **Current Date** in a beautiful format
- **Weather Display** with temperature and conditions
- **Weather Details** including humidity, wind, pressure
- **Location Display** (simulated)
- **Refresh Button** to update weather data
- **Responsive Design** that works on all devices

Perfect for keeping track of time and weather! ⏰🌤️`,
            confidence: 0.9
          }
        ]
      }
    ]
  }
};

// Enhanced intelligent response matching with context awareness
export function getLocalAIResponse(userMessage: string): LocalAIResponse {
  const message = userMessage.toLowerCase();
  let bestMatch: any = null;
  let highestConfidence = 0;
  let matchedCategory = '';

  // Search through all knowledge patterns with enhanced matching
  Object.entries(knowledgeBase).forEach(([category, data]) => {
    data.patterns.forEach(pattern => {
      // Enhanced keyword matching with word boundaries
      const keywordMatch = pattern.keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(message);
      });
      
      if (keywordMatch) {
        pattern.responses.forEach(response => {
          // Calculate confidence based on keyword density and specificity
          const keywordCount = pattern.keywords.filter(keyword => 
            message.includes(keyword)
          ).length;
          const confidence = response.confidence * (1 + keywordCount * 0.1);
          
          if (confidence > highestConfidence) {
            highestConfidence = confidence;
            bestMatch = response;
            matchedCategory = category;
          }
        });
      }
    });
  });

  // If no specific match, provide a contextual default based on message content
  if (!bestMatch) {
    // Analyze message for general programming concepts
    if (message.includes('help') || message.includes('how') || message.includes('what')) {
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
- "Create a beautiful button component"
- "Add animations to my website"

I'm ready to help you build amazing things! 🎉`,
        confidence: 0.7,
        suggestions: [
          "Create a simple website",
          "Help with JavaScript",
          "CSS styling examples",
          "React component patterns",
          "UI animations",
          "Form validation"
        ]
      };
    }

    // If it's a greeting or general question
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        response: `Hello! 👋 I'm your AI coding assistant, ready to help you build amazing websites and applications!

**What can I help you with today?**
- 🎨 **Design beautiful websites** with modern CSS
- ⚡ **Write clean JavaScript** code
- 🧩 **Build React components** 
- 🎭 **Add smooth animations** and effects
- 📝 **Create forms** with validation
- 🔧 **Debug and optimize** your code

Just tell me what you'd like to create or learn! 🚀`,
        confidence: 0.8,
        suggestions: [
          "Create a modern website",
          "Learn JavaScript",
          "Build a React app",
          "Add animations"
        ]
      };
    }

    // Default response for unrecognized queries
    return {
      response: `I'd love to help you with that! Could you be more specific about what you'd like to create or learn?

**For example, you could ask:**
- "Create a beautiful landing page"
- "Help me with JavaScript functions"
- "Show me how to make a responsive design"
- "Build a contact form"
- "Add hover effects to buttons"
- "Create a loading animation"

I'm here to help you build amazing things! 🎉`,
      confidence: 0.6,
      suggestions: [
        "Create a website",
        "Learn programming",
        "Build components",
        "Add styling"
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

// Enhanced fallback with context awareness and conversation history
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
