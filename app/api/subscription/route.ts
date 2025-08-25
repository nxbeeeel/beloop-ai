import { NextRequest, NextResponse } from 'next/server'
import { PaymentProcessor, createMockPaymentMethod } from '@/app/lib/payment'
import { MEMBERSHIP_TIERS } from '@/app/lib/membership'

// GET - Get user's subscription information
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

    const subscriptions = PaymentProcessor.getUserSubscriptions(userId)
    const invoices = PaymentProcessor.getUserInvoices(userId)
    const paymentMethods = PaymentProcessor.getPaymentMethods(userId)

    return NextResponse.json({
      subscriptions,
      invoices,
      paymentMethods,
      availablePlans: MEMBERSHIP_TIERS
    })

  } catch (error) {
    console.error('Subscription GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    const { userId, planId, planName, amount, paymentMethodId } = await request.json()

    if (!userId || !planId || !planName || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a mock payment method if none provided
    let finalPaymentMethodId = paymentMethodId
    if (!paymentMethodId) {
      const mockPaymentMethod = createMockPaymentMethod()
      PaymentProcessor.addPaymentMethod(mockPaymentMethod)
      finalPaymentMethodId = mockPaymentMethod.id
    }

    const subscription = await PaymentProcessor.createSubscription(
      userId,
      planId,
      planName,
      amount,
      finalPaymentMethodId
    )

    return NextResponse.json({
      message: 'Subscription created successfully',
      subscription
    }, { status: 201 })

  } catch (error) {
    console.error('Subscription POST error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update subscription (cancel, reactivate, etc.)
export async function PUT(request: NextRequest) {
  try {
    const { action, subscriptionId, paymentMethodId } = await request.json()

    if (!action || !subscriptionId) {
      return NextResponse.json(
        { error: 'Action and subscription ID are required' },
        { status: 400 }
      )
    }

    let subscription

    switch (action) {
      case 'cancel':
        subscription = await PaymentProcessor.cancelSubscription(subscriptionId)
        break
      case 'reactivate':
        subscription = await PaymentProcessor.reactivateSubscription(subscriptionId)
        break
      case 'update_payment_method':
        if (!paymentMethodId) {
          return NextResponse.json(
            { error: 'Payment method ID is required' },
            { status: 400 }
          )
        }
        subscription = await PaymentProcessor.updatePaymentMethod(subscriptionId, paymentMethodId)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: 'Subscription updated successfully',
      subscription
    })

  } catch (error) {
    console.error('Subscription PUT error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
