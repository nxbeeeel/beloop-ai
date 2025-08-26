import { GoogleGenerativeAI } from '@google/generative-ai'
import { updateUserUsage, canUserPerformAction, getRemainingUsage } from '@/app/lib/membership'
import { 
  createConversation, 
  addMessage, 
  getConversationMessages, 
  getConversation 
} from '@/app/lib/chatHistory'
import { getEnhancedFallbackResponse } from '@/app/lib/localAIServer'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  let userMessage = '' // Declare outside try block for fallback use
  let userId = '' // Declare outside try block for fallback use
  let conversationId = '' // Declare outside try block for fallback use
  let messages: any[] = [] // Declare outside try block for fallback use
  
  try {
    const { message, conversationId: inputConversationId, userId: inputUserId } = await request.json()
    userMessage = message // Store for fallback use
    userId = inputUserId

    if (!userId) {
      return new Response(JSON.stringify({ 
        error: 'User ID is required'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check if user can perform chat action
    if (!canUserPerformAction(userId, 'chatMessages')) {
      const remaining = getRemainingUsage(userId, 'chatMessages')
      return new Response(JSON.stringify({ 
        error: 'Chat message limit exceeded. Please upgrade your membership to continue.',
        debug: {
          remainingMessages: remaining,
          membershipRequired: true
        }
      }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Debug information
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY)
    console.log('API Key length:', process.env.GEMINI_API_KEY?.length || 0)
    console.log('Environment:', process.env.NODE_ENV)

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables')
      return new Response(JSON.stringify({ 
        error: 'Gemini API key not configured. Please check your environment variables in Vercel dashboard and redeploy.',
        debug: {
          hasApiKey: false,
          environment: process.env.NODE_ENV,
          timestamp: new Date().toISOString()
        }
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (process.env.GEMINI_API_KEY === 'your_actual_gemini_api_key_here') {
      console.error('GEMINI_API_KEY is still set to placeholder value')
      return new Response(JSON.stringify({ 
        error: 'Please replace the placeholder API key with your actual Gemini API key in .env.local file.',
        debug: {
          hasApiKey: true,
          isPlaceholder: true,
          environment: process.env.NODE_ENV
        }
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Get or create conversation
    conversationId = inputConversationId
    if (!conversationId) {
      const conversation = createConversation(userId, message.substring(0, 50))
      conversationId = conversation.id
    } else {
      // Verify conversation exists and belongs to user
      const existingConversation = getConversation(conversationId)
      if (!existingConversation || existingConversation.userId !== userId) {
        const conversation = createConversation(userId, message.substring(0, 50))
        conversationId = conversation.id
      }
    }

    // Add user message to history
    addMessage(userId, conversationId, 'user', message)

    // Get conversation history
    messages = getConversationMessages(conversationId)
    
    // Build conversation history for Gemini API
    let chatHistory = messages
      .filter((msg: any) => msg.content && msg.content.trim() !== '')
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content.trim() }]
      }))
    
    // Ensure the first message is from user
    if (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
      chatHistory = chatHistory.slice(1) // Remove first message if it's not from user
    }

    // Add system prompt for better code generation
    const systemPrompt = `You are an expert web developer and AI assistant. When users ask for code, always provide complete, working HTML/CSS/JavaScript code that can be rendered in a browser. 

Key guidelines:
1. Always wrap code in proper markdown code blocks with language specification (\`\`\`html, \`\`\`css, \`\`\`javascript)
2. For HTML, include complete structure with DOCTYPE, html, head, and body tags
3. For CSS, provide complete styling that works standalone
4. For JavaScript, provide complete, functional code
5. When users ask for updates or changes to previous code, understand the context and provide the updated version
6. Make sure all code is properly formatted and indented
7. Include comments to explain complex parts
8. Ensure the code is responsive and modern

If the user is asking for updates to previous code, analyze the conversation history and provide the updated version.`

    // Start chat with history and system prompt
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    // Send system prompt first, then user message
    try {
      await chat.sendMessage(systemPrompt)
    } catch (error) {
      console.log('System prompt failed, continuing with user message only')
    }

    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    // Add AI response to history
    addMessage(userId, conversationId, 'assistant', text)

    // Update user usage
    updateUserUsage(userId, 'chatMessages')

    return new Response(JSON.stringify({
      response: text,
      conversationId,
      usage: {
        promptTokens: 0, // Not available in current API version
        responseTokens: 0, // Not available in current API version
        totalTokens: 0, // Not available in current API version
      },
      membership: {
        remainingMessages: getRemainingUsage(userId, 'chatMessages')
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error: any) {
    console.error('Error:', error)
    
    // Check for rate limit errors - use fallback instead of error
    if (error?.message && (error.message.includes('429') || error.message.includes('quota'))) {
      console.log('Rate limit exceeded, using fallback response')
      
      // Get enhanced fallback response based on user message and conversation history
      const fallbackText = getEnhancedFallbackResponse(userMessage, messages)
      
      // Add fallback response to history
      addMessage(userId, conversationId, 'assistant', fallbackText)
      
      return new Response(JSON.stringify({
        response: fallbackText,
        conversationId,
        fallback: true,
        usage: {
          promptTokens: 0,
          responseTokens: 0,
          totalTokens: 0,
        },
        membership: {
          remainingMessages: getRemainingUsage(userId, 'chatMessages')
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Check for specific API key errors
    if (error?.message && error.message.includes('API key')) {
      return new Response(JSON.stringify({ 
        error: 'Invalid API key. Please check your Gemini API key in the environment variables.',
        debug: {
          errorMessage: error.message,
          hasApiKey: !!process.env.GEMINI_API_KEY,
          environment: process.env.NODE_ENV
        }
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Check for model not found errors
    if (error?.message && error.message.includes('not found')) {
      return new Response(JSON.stringify({ 
        error: 'Model not available. Please check your API key and try again.',
        debug: {
          errorMessage: error.message,
          hasApiKey: !!process.env.GEMINI_API_KEY,
          environment: process.env.NODE_ENV
        }
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // For any other errors, use fallback response
    console.log('AI service error, using fallback response')
    
    const fallbackText = getEnhancedFallbackResponse(userMessage, messages)
    
    // Add fallback response to history
    addMessage(userId, conversationId, 'assistant', fallbackText)
    
    return new Response(JSON.stringify({
      response: fallbackText,
      conversationId,
      fallback: true,
      usage: {
        promptTokens: 0,
        responseTokens: 0,
        totalTokens: 0,
      },
      membership: {
        remainingMessages: getRemainingUsage(userId, 'chatMessages')
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
