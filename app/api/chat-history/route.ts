import { NextRequest, NextResponse } from 'next/server'
import { 
  getUserConversations, 
  getConversationMessages, 
  deleteConversation as deleteConversationFromDB 
} from '../../lib/chatHistory'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const conversationId = searchParams.get('conversationId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (conversationId) {
      // Get messages for a specific conversation
      const messages = getConversationMessages(conversationId)
      return NextResponse.json({ messages })
    } else {
      // Get all conversations for the user
      const conversations = getUserConversations(userId)
      return NextResponse.json({ conversations })
    }
  } catch (error) {
    console.error('Error in chat history GET:', error)
    return NextResponse.json({ error: 'Failed to get chat history' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const conversationId = searchParams.get('conversationId')

    if (!userId || !conversationId) {
      return NextResponse.json({ error: 'User ID and conversation ID are required' }, { status: 400 })
    }

    const success = deleteConversationFromDB(conversationId)
    
    if (success) {
      return NextResponse.json({ message: 'Conversation deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error in chat history DELETE:', error)
    return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 })
  }
}
