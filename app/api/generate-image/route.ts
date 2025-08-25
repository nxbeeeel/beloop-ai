import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { updateUserUsage, canUserPerformAction, getRemainingUsage } from '@/app/lib/membership'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { prompt, style = 'realistic', userId } = await request.json()

    // Check if user can perform image generation
    if (!canUserPerformAction(userId || 'anonymous', 'imageGenerations')) {
      const remaining = getRemainingUsage(userId || 'anonymous', 'imageGenerations')
      return NextResponse.json({ 
        error: 'Image generation limit exceeded. Please upgrade your membership to continue.',
        debug: {
          remainingGenerations: remaining,
          membershipRequired: true
        }
      }, { status: 429 })
    }

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // For Gemini, we'll use the text-to-image model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

    // Create a detailed prompt for better image generation
    const enhancedPrompt = `Generate a high-quality, detailed image of: ${prompt}. 
    Style: ${style}. 
    Make it visually appealing with good composition, lighting, and colors. 
    The image should be realistic and professional-looking.`

    // Note: Gemini's current API doesn't directly support image generation
    // We'll use a workaround by creating a text response that describes the image
    // In a real implementation, you might want to use a different service like DALL-E or Stable Diffusion
    
    const result = await model.generateContent([
      enhancedPrompt,
      // You could add an example image here if needed
    ])

    const response = await result.response
    const text = response.text()

    // For now, we'll return a placeholder image URL
    // In a real implementation, you'd integrate with an actual image generation service
    const placeholderImageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(prompt)}`

    // Update user usage
    if (userId) {
      updateUserUsage(userId, 'imageGenerations')
    }

    return NextResponse.json({
      imageUrl: placeholderImageUrl,
      description: text,
      prompt: enhancedPrompt,
      style,
      membership: {
        remainingGenerations: getRemainingUsage(userId || 'anonymous', 'imageGenerations')
      }
    })

  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
