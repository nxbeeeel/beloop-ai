export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY
  
  return new Response(JSON.stringify({
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
    apiKeyStart: apiKey ? apiKey.substring(0, 10) + '...' : 'none',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
