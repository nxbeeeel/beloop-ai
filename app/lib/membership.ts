export interface MembershipTier {
  id: string
  name: string
  price: number
  features: string[]
  limits: {
    chatMessages: number
    imageGenerations: number
    apiCalls: number
    storage: number // in MB
  }
  color: string
  popular?: boolean
}

export interface UserMembership {
  userId: string
  tier: string
  startDate: Date
  endDate: Date
  usage: {
    chatMessages: number
    imageGenerations: number
    apiCalls: number
    storage: number
  }
  isActive: boolean
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '5 chat messages per day',
      '2 image generations per day',
      'Basic AI responses',
      'Community support'
    ],
    limits: {
      chatMessages: 5,
      imageGenerations: 2,
      apiCalls: 10,
      storage: 10
    },
    color: 'gray'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    features: [
      'Unlimited chat messages',
      '50 image generations per month',
      'Advanced AI models',
      'Priority support',
      'Export conversations',
      'Custom AI personalities'
    ],
    limits: {
      chatMessages: -1, // unlimited
      imageGenerations: 50,
      apiCalls: 1000,
      storage: 100
    },
    color: 'blue',
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    features: [
      'Everything in Pro',
      'Unlimited image generations',
      'Advanced image styles',
      'API access',
      'White-label solutions',
      'Dedicated support',
      'Custom integrations'
    ],
    limits: {
      chatMessages: -1, // unlimited
      imageGenerations: -1, // unlimited
      apiCalls: 10000,
      storage: 1000
    },
    color: 'purple'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    features: [
      'Everything in Premium',
      'Custom AI training',
      'On-premise deployment',
      'SLA guarantees',
      'Custom integrations',
      'Dedicated account manager',
      'Team management'
    ],
    limits: {
      chatMessages: -1, // unlimited
      imageGenerations: -1, // unlimited
      apiCalls: -1, // unlimited
      storage: -1 // unlimited
    },
    color: 'gold'
  }
]

// Mock database for user memberships
export let userMemberships: UserMembership[] = []

// Initialize premium memberships for multiple users
const initializePremiumMemberships = () => {
  const premiumUsers = [
    'beloopstore@gmail.com',
    'mnabeelca123@gmail.com'
  ]

  premiumUsers.forEach(premiumUserId => {
    // Check if membership already exists
    const existingMembership = userMemberships.find(membership => membership.userId === premiumUserId)
    if (existingMembership) return

    const startDate = new Date()
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 1) // 1 year membership

    const premiumMembership: UserMembership = {
      userId: premiumUserId,
      tier: 'premium',
      startDate,
      endDate,
      usage: {
        chatMessages: 0,
        imageGenerations: 0,
        apiCalls: 0,
        storage: 0
      },
      isActive: true
    }

    userMemberships.push(premiumMembership)
    console.log(`✅ Premium membership created for ${premiumUserId}`)
  })
}

// Initialize the premium memberships
initializePremiumMemberships()

export function getUserMembership(userId: string): UserMembership | undefined {
  return userMemberships.find(membership => membership.userId === userId)
}

export function createUserMembership(userId: string, tier: string): UserMembership {
  const tierData = MEMBERSHIP_TIERS.find(t => t.id === tier)
  if (!tierData) {
    throw new Error('Invalid membership tier')
  }

  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 1) // 1 month subscription

  const membership: UserMembership = {
    userId,
    tier,
    startDate,
    endDate,
    usage: {
      chatMessages: 0,
      imageGenerations: 0,
      apiCalls: 0,
      storage: 0
    },
    isActive: true
  }

  userMemberships.push(membership)
  return membership
}

export function updateUserUsage(userId: string, type: 'chatMessages' | 'imageGenerations' | 'apiCalls' | 'storage', amount: number = 1): boolean {
  const membership = getUserMembership(userId)
  if (!membership) {
    // Create free membership for new users
    createUserMembership(userId, 'free')
    return updateUserUsage(userId, type, amount)
  }

  const tierData = MEMBERSHIP_TIERS.find(t => t.id === membership.tier)
  if (!tierData) return false

  // Check if usage limit is exceeded
  const currentUsage = membership.usage[type]
  const limit = tierData.limits[type]
  
  if (limit !== -1 && currentUsage + amount > limit) {
    return false // Usage limit exceeded
  }

  // Update usage
  membership.usage[type] += amount
  return true
}

export function canUserPerformAction(userId: string, action: 'chatMessages' | 'imageGenerations' | 'apiCalls' | 'storage'): boolean {
  const membership = getUserMembership(userId)
  if (!membership) {
    // New users get free tier
    return true
  }

  const tierData = MEMBERSHIP_TIERS.find(t => t.id === membership.tier)
  if (!tierData) return false

  const currentUsage = membership.usage[action]
  const limit = tierData.limits[action]

  return limit === -1 || currentUsage < limit
}

export function getRemainingUsage(userId: string, action: 'chatMessages' | 'imageGenerations' | 'apiCalls' | 'storage'): number {
  const membership = getUserMembership(userId)
  if (!membership) {
    const freeTier = MEMBERSHIP_TIERS.find(t => t.id === 'free')
    return freeTier ? freeTier.limits[action] : 0
  }

  const tierData = MEMBERSHIP_TIERS.find(t => t.id === membership.tier)
  if (!tierData) return 0

  const currentUsage = membership.usage[action]
  const limit = tierData.limits[action]

  return limit === -1 ? -1 : Math.max(0, limit - currentUsage)
}
