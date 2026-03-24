import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function GET() {
  try {
    console.log('Testing Gemini API...')

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'No API key found',
        hasApiKey: false
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const chat = model.startChat()
    
    const result = await chat.sendMessage('Hello, can you respond with a simple "Hello World" message?')
    console.log('Test result:', result)
    
    const response = await result.response
    console.log('Test response:', response)
    
    const text = response.text()
    console.log('Test text:', text)
    
    return new Response(JSON.stringify({
      success: true,
      response: text,
      hasApiKey: true
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error: any) {
    console.error('Gemini API Test Error:', error)
    return new Response(JSON.stringify({
      error: error.message,
      hasApiKey: !!process.env.GEMINI_API_KEY
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
