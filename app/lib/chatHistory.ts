export interface ChatMessage {
  id: string
  userId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  conversationId: string
}

export interface ChatConversation {
  id: string
  userId: string
  title: string
  createdAt: Date
  updatedAt: Date
  messageCount: number
  isActive: boolean
}

// Mock database for chat history
export let chatConversations: ChatConversation[] = []
export let chatMessages: ChatMessage[] = []

export function createConversation(userId: string, title?: string): ChatConversation {
  const conversation: ChatConversation = {
    id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title: title || 'New Conversation',
    createdAt: new Date(),
    updatedAt: new Date(),
    messageCount: 0,
    isActive: true
  }

  chatConversations.push(conversation)
  return conversation
}

export function getUserConversations(userId: string): ChatConversation[] {
  return chatConversations
    .filter(conv => conv.userId === userId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export function getConversation(conversationId: string): ChatConversation | undefined {
  return chatConversations.find(conv => conv.id === conversationId)
}

export function addMessage(userId: string, conversationId: string, role: 'user' | 'assistant', content: string): ChatMessage {
  const message: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    role,
    content,
    timestamp: new Date(),
    conversationId
  }

  chatMessages.push(message)

  // Update conversation
  const conversation = getConversation(conversationId)
  if (conversation) {
    conversation.updatedAt = new Date()
    conversation.messageCount += 1
    
    // Update title if it's the first user message
    if (role === 'user' && conversation.messageCount === 1) {
      conversation.title = content.length > 50 ? content.substring(0, 50) + '...' : content
    }
  }

  return message
}

export function getConversationMessages(conversationId: string): ChatMessage[] {
  return chatMessages
    .filter(msg => msg.conversationId === conversationId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

export function deleteConversation(conversationId: string): boolean {
  const convIndex = chatConversations.findIndex(conv => conv.id === conversationId)
  if (convIndex === -1) return false

  chatConversations.splice(convIndex, 1)
  
  // Remove associated messages
  const messageIndices = chatMessages
    .map((msg, index) => msg.conversationId === conversationId ? index : -1)
    .filter(index => index !== -1)
    .reverse()
  
  messageIndices.forEach(index => chatMessages.splice(index, 1))
  
  return true
}

export function updateConversationTitle(conversationId: string, title: string): boolean {
  const conversation = getConversation(conversationId)
  if (!conversation) return false

  conversation.title = title
  conversation.updatedAt = new Date()
  return true
}

export function getRecentMessages(userId: string, limit: number = 10): ChatMessage[] {
  return chatMessages
    .filter(msg => msg.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

export function searchConversations(userId: string, query: string): ChatConversation[] {
  const searchTerm = query.toLowerCase()
  const userConversations = getUserConversations(userId)
  
  return userConversations.filter(conv => 
    conv.title.toLowerCase().includes(searchTerm)
  )
}

export function getConversationHistory(userId: string, conversationId: string): ChatMessage[] {
  // Verify user owns the conversation
  const conversation = getConversation(conversationId)
  if (!conversation || conversation.userId !== userId) {
    return []
  }

  return getConversationMessages(conversationId)
}

export function clearConversationHistory(userId: string, conversationId: string): boolean {
  const conversation = getConversation(conversationId)
  if (!conversation || conversation.userId !== userId) {
    return false
  }

  // Remove all messages for this conversation
  const messageIndices = chatMessages
    .map((msg, index) => msg.conversationId === conversationId ? index : -1)
    .filter(index => index !== -1)
    .reverse()
  
  messageIndices.forEach(index => chatMessages.splice(index, 1))
  
  // Reset conversation
  conversation.messageCount = 0
  conversation.updatedAt = new Date()
  
  return true
}
