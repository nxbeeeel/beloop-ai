import { NextRequest, NextResponse } from 'next/server'
import { 
  getUserConversations, 
  getConversationHistory,
  deleteConversation,
  updateConversationTitle,
  searchConversations
} from '@/app/lib/chatHistory'

// GET - Get user's chat conversations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const conversationId = searchParams.get('conversationId')
    const search = searchParams.get('search')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get specific conversation history
    if (conversationId) {
      const messages = getConversationHistory(userId, conversationId)
      return NextResponse.json({ messages })
    }

    // Search conversations
    if (search) {
      const conversations = searchConversations(userId, search)
      return NextResponse.json({ conversations })
    }

    // Get all user conversations
    const conversations = getUserConversations(userId)
    return NextResponse.json({ conversations })

  } catch (error) {
    console.error('Chat history GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a conversation
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const conversationId = searchParams.get('conversationId')

    if (!userId || !conversationId) {
      return NextResponse.json(
        { error: 'User ID and conversation ID are required' },
        { status: 400 }
      )
    }

    const success = deleteConversation(conversationId)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Conversation not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Conversation deleted successfully'
    })

  } catch (error) {
    console.error('Chat history DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update conversation title
export async function PUT(request: NextRequest) {
  try {
    const { userId, conversationId, title } = await request.json()

    if (!userId || !conversationId || !title) {
      return NextResponse.json(
        { error: 'User ID, conversation ID, and title are required' },
        { status: 400 }
      )
    }

    const success = updateConversationTitle(conversationId, title)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Conversation not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Conversation title updated successfully'
    })

  } catch (error) {
    console.error('Chat history PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
