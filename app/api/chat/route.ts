import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'Gemini API key not configured' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

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

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to get response from AI' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
