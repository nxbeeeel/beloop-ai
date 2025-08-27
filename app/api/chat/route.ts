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
  // Performance optimization: Add response headers for caching
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }

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
        headers
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
        headers
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
        headers
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
        headers
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
    
    // Start a simple chat session
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    // Send the user message directly (system prompt is already in history)
    const result = await chat.sendMessage(message)
    console.log('Gemini API Result:', result)
    
    if (!result || !result.response) {
      console.error('No response from Gemini API')
      throw new Error('No response from Gemini API')
    }
    
    const response = await result.response
    console.log('Gemini API Response:', response)
    
    if (!response || !response.text) {
      console.error('Invalid response structure from Gemini API')
      throw new Error('Invalid response structure from Gemini API')
    }
    
    const text = response.text()
    console.log('Gemini API Text:', text)

    // Check if text is empty or undefined
    if (!text || text.trim() === '') {
      console.log('Empty response from Gemini, using fallback')
      const fallbackText = `I understand you said: "${userMessage}". Let me help you with that. Could you please provide more details about what you'd like assistance with?`
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
        headers
      })
    }

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
        headers
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
        headers
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
        headers
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
      headers
    })
  }
}
