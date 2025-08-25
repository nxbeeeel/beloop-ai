import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

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

    // Build conversation history
    const chatHistory = history?.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })) || []

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    return new Response(JSON.stringify({
      response: text,
      usage: {
        promptTokens: 0, // Not available in current API version
        responseTokens: 0, // Not available in current API version
        totalTokens: 0, // Not available in current API version
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error: any) {
    console.error('Error:', error)
    
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
    
    return new Response(JSON.stringify({ 
      error: 'Failed to get response from AI. Please try again.',
      debug: {
        errorMessage: error.message,
        hasApiKey: !!process.env.GEMINI_API_KEY,
        environment: process.env.NODE_ENV
      }
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
