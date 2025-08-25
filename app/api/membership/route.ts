import { NextRequest, NextResponse } from 'next/server'
import { 
  getUserMembership, 
  createUserMembership, 
  MEMBERSHIP_TIERS,
  getRemainingUsage 
} from '@/app/lib/membership'

// GET - Get user's current membership and usage
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const membership = getUserMembership(userId)
    
    if (!membership) {
      // Return free tier info for new users
      const freeTier = MEMBERSHIP_TIERS.find(t => t.id === 'free')
      return NextResponse.json({
        membership: {
          tier: 'free',
          name: 'Free',
          isActive: true,
          usage: {
            chatMessages: 0,
            imageGenerations: 0,
            apiCalls: 0,
            storage: 0
          },
          limits: freeTier?.limits,
          remaining: {
            chatMessages: freeTier?.limits.chatMessages || 0,
            imageGenerations: freeTier?.limits.imageGenerations || 0,
            apiCalls: freeTier?.limits.apiCalls || 0,
            storage: freeTier?.limits.storage || 0
          }
        }
      })
    }

    const tierData = MEMBERSHIP_TIERS.find(t => t.id === membership.tier)
    
    return NextResponse.json({
      membership: {
        ...membership,
        name: tierData?.name,
        limits: tierData?.limits,
        remaining: {
          chatMessages: getRemainingUsage(userId, 'chatMessages'),
          imageGenerations: getRemainingUsage(userId, 'imageGenerations'),
          apiCalls: getRemainingUsage(userId, 'apiCalls'),
          storage: getRemainingUsage(userId, 'storage')
        }
      }
    })

  } catch (error) {
    console.error('Membership GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Upgrade user membership
export async function POST(request: NextRequest) {
  try {
    const { userId, tier } = await request.json()

    if (!userId || !tier) {
      return NextResponse.json(
        { error: 'User ID and tier are required' },
        { status: 400 }
      )
    }

    const tierData = MEMBERSHIP_TIERS.find(t => t.id === tier)
    if (!tierData) {
      return NextResponse.json(
        { error: 'Invalid membership tier' },
        { status: 400 }
      )
    }

    // Create or update membership
    const membership = createUserMembership(userId, tier)

    return NextResponse.json({
      message: 'Membership upgraded successfully',
      membership: {
        ...membership,
        name: tierData.name,
        limits: tierData.limits
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Membership POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
