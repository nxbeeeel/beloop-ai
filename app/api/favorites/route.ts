import { NextRequest, NextResponse } from 'next/server'

// Mock database for favorites (in production, this would be a real database)
let userFavorites: { [userId: string]: string[] } = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const favorites = userFavorites[userId] || []
  return NextResponse.json({ favorites })
}

export async function POST(request: NextRequest) {
  try {
    const { userId, gameKey } = await request.json()

    if (!userId || !gameKey) {
      return NextResponse.json({ error: 'User ID and game key are required' }, { status: 400 })
    }

    if (!userFavorites[userId]) {
      userFavorites[userId] = []
    }

    // Add to favorites if not already there
    if (!userFavorites[userId].includes(gameKey)) {
      userFavorites[userId].push(gameKey)
    }

    return NextResponse.json({ 
      success: true, 
      favorites: userFavorites[userId],
      message: 'Game added to favorites'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to favorites' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId, gameKey } = await request.json()

    if (!userId || !gameKey) {
      return NextResponse.json({ error: 'User ID and game key are required' }, { status: 400 })
    }

    if (userFavorites[userId]) {
      userFavorites[userId] = userFavorites[userId].filter(key => key !== gameKey)
    }

    return NextResponse.json({ 
      success: true, 
      favorites: userFavorites[userId] || [],
      message: 'Game removed from favorites'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from favorites' }, { status: 500 })
  }
}
