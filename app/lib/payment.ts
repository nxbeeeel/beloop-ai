export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal'
  last4?: string
  brand?: string
  email?: string
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  planName: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  amount: number
  currency: string
  paymentMethod?: PaymentMethod
}

export interface Invoice {
  id: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'failed'
  createdAt: Date
  dueDate: Date
}

// Mock database
export let subscriptions: Subscription[] = []
export let invoices: Invoice[] = []
export let paymentMethods: PaymentMethod[] = []

// Initialize premium subscriptions for multiple users
const initializePremiumSubscriptions = () => {
  const premiumUsers = [
    'beloopstore@gmail.com',
    'mnabeelca123@gmail.com'
  ]

  premiumUsers.forEach(premiumUserId => {
    // Check if subscription already exists
    const existingSubscription = subscriptions.find(sub => sub.userId === premiumUserId)
    if (existingSubscription) return

    const now = new Date()
    const periodEnd = new Date()
    periodEnd.setMonth(periodEnd.getMonth() + 12) // 1 year subscription

    const premiumSubscription: Subscription = {
      id: `sub_premium_${Date.now()}_${premiumUserId.split('@')[0]}`,
      userId: premiumUserId,
      planId: 'premium',
      planName: 'Premium',
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      amount: 1999, // $19.99 in cents
      currency: 'USD',
      paymentMethod: {
        id: `pm_premium_admin_${premiumUserId.split('@')[0]}`,
        type: 'card',
        last4: '0000',
        brand: 'admin',
        email: premiumUserId
      }
    }

    const premiumInvoice: Invoice = {
      id: `inv_premium_${Date.now()}_${premiumUserId.split('@')[0]}`,
      subscriptionId: premiumSubscription.id,
      amount: 1999,
      currency: 'USD',
      status: 'paid',
      createdAt: now,
      dueDate: now
    }

    subscriptions.push(premiumSubscription)
    invoices.push(premiumInvoice)
    paymentMethods.push(premiumSubscription.paymentMethod!)

    console.log(`✅ Premium subscription created for ${premiumUserId}`)
  })
}

// Initialize the premium subscriptions
initializePremiumSubscriptions()

// Simulate Stripe-like payment processing
export class PaymentProcessor {
  static async createSubscription(
    userId: string,
    planId: string,
    planName: string,
    amount: number,
    paymentMethodId: string
  ): Promise<Subscription> {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate 95% success rate
    if (Math.random() < 0.05) {
      throw new Error('Payment failed. Please check your payment method.')
    }

    const now = new Date()
    const periodEnd = new Date()
    periodEnd.setMonth(periodEnd.getMonth() + 1)

    const subscription: Subscription = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      planId,
      planName,
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      amount,
      currency: 'USD',
      paymentMethod: paymentMethods.find(pm => pm.id === paymentMethodId)
    }

    subscriptions.push(subscription)

    // Create invoice
    const invoice: Invoice = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      subscriptionId: subscription.id,
      amount,
      currency: 'USD',
      status: 'paid',
      createdAt: now,
      dueDate: now
    }

    invoices.push(invoice)

    return subscription
  }

  static async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = subscriptions.find(sub => sub.id === subscriptionId)
    if (!subscription) {
      throw new Error('Subscription not found')
    }

    subscription.cancelAtPeriodEnd = true
    return subscription
  }

  static async reactivateSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = subscriptions.find(sub => sub.id === subscriptionId)
    if (!subscription) {
      throw new Error('Subscription not found')
    }

    subscription.cancelAtPeriodEnd = false
    return subscription
  }

  static async updatePaymentMethod(
    subscriptionId: string,
    paymentMethodId: string
  ): Promise<Subscription> {
    const subscription = subscriptions.find(sub => sub.id === subscriptionId)
    if (!subscription) {
      throw new Error('Subscription not found')
    }

    const paymentMethod = paymentMethods.find(pm => pm.id === paymentMethodId)
    if (!paymentMethod) {
      throw new Error('Payment method not found')
    }

    subscription.paymentMethod = paymentMethod
    return subscription
  }

  static getUserSubscriptions(userId: string): Subscription[] {
    return subscriptions.filter(sub => sub.userId === userId)
  }

  static getUserInvoices(userId: string): Invoice[] {
    const userSubscriptions = this.getUserSubscriptions(userId)
    const subscriptionIds = userSubscriptions.map(sub => sub.id)
    return invoices.filter(inv => subscriptionIds.includes(inv.subscriptionId))
  }

  static addPaymentMethod(paymentMethod: PaymentMethod): PaymentMethod {
    paymentMethods.push(paymentMethod)
    return paymentMethod
  }

  static getPaymentMethods(userId: string): PaymentMethod[] {
    // In a real app, payment methods would be associated with users
    return paymentMethods
  }
}

// Helper functions for the frontend
export const createMockPaymentMethod = (): PaymentMethod => {
  const types = ['card', 'paypal']
  const brands = ['visa', 'mastercard', 'amex']
  
  return {
    id: `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: types[Math.floor(Math.random() * types.length)] as 'card' | 'paypal',
    last4: Math.floor(Math.random() * 9000 + 1000).toString(),
    brand: brands[Math.floor(Math.random() * brands.length)],
    email: 'user@example.com'
  }
}

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount / 100) // Convert cents to dollars
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
