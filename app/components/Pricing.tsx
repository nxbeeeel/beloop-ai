'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Rocket, 
  Sparkles,
  ArrowRight,
  Shield,
  Users,
  Code,
  Brain,
  Infinity,
  CreditCard,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for individual developers getting started',
    features: [
      '100 AI completions per month',
      'Basic code suggestions',
      'Community support',
      'Standard response time',
      'Basic integrations'
    ],
    icon: Code,
    color: 'from-cyan-400 to-blue-400',
    popular: false
  },
  {
    name: 'Pro',
    price: 19,
    period: 'month',
    description: 'For professional developers and small teams',
    features: [
      'Unlimited AI completions',
      'Advanced code suggestions',
      'Priority support',
      'Faster response time',
      'Advanced integrations',
      'Custom themes',
      'Code analysis',
      'Team collaboration'
    ],
    icon: Zap,
    color: 'from-pink-400 to-purple-400',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 49,
    period: 'month',
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Advanced security',
      'Custom AI models',
      'Dedicated support',
      'SLA guarantees',
      'Custom integrations',
      'Advanced analytics',
      'On-premise deployment'
    ],
    icon: Crown,
    color: 'from-yellow-400 to-orange-400',
    popular: false
  }
]

const features = [
  {
    icon: Brain,
    title: 'Advanced AI',
    description: 'Powered by the latest language models'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-100ms response times'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Built for teams of any size'
  }
]

export default function Pricing() {
  const { data: session } = useSession()
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubscribe = async (plan: any) => {
    if (!session?.user?.email) {
      alert('Please sign in to subscribe to a plan.')
      return
    }

    setSelectedPlan(plan)
    setShowPaymentModal(true)
    setPaymentStatus('idle')
    setErrorMessage('')
  }

  const processPayment = async () => {
    if (!selectedPlan || !session?.user?.email) return

    setPaymentStatus('processing')
    
    try {
      const amount = billingPeriod === 'year' 
        ? Math.round(selectedPlan.price * 12 * 0.8 * 100) // Convert to cents and apply 20% discount
        : selectedPlan.price * 100 // Convert to cents

      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.email,
          planId: selectedPlan.name.toLowerCase(),
          planName: selectedPlan.name,
          amount: amount
        })
      })

      if (!response.ok) {
        throw new Error('Payment failed')
      }

      const result = await response.json()
      setPaymentStatus('success')
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentStatus('idle')
      }, 2000)

    } catch (error) {
      setPaymentStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Payment failed')
    }
  }

  const getDiscountedPrice = (price: number) => {
    return billingPeriod === 'year' ? Math.round(price * 10 * 0.8) : price
  }

  return (
    <section id="pricing" className="py-32 border-t border-gray-800/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-cyan-400 font-medium text-sm">Pricing</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your <span className="gradient-text-neon">Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Start free and scale as you grow. All plans include our core AI features with different usage limits and team capabilities.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <span className={`text-sm font-medium transition-colors ${billingPeriod === 'month' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setBillingPeriod(billingPeriod === 'month' ? 'year' : 'month')}
              className="relative w-16 h-8 bg-gray-800 rounded-full p-1 transition-colors"
            >
              <motion.div
                layout
                className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"
                animate={{ x: billingPeriod === 'year' ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-sm font-medium transition-colors ${billingPeriod === 'year' ? 'text-white' : 'text-gray-400'}`}>
              Yearly
              <span className="ml-2 px-2 py-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 rounded-full text-xs text-green-400">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full text-white text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`card p-8 h-full ${plan.popular ? 'border-pink-400/50 bg-gradient-to-b from-pink-400/5 to-purple-400/5' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price === 0 ? '0' : getDiscountedPrice(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400 ml-2">
                          /{billingPeriod}
                        </span>
                      )}
                    </div>
                    {plan.price > 0 && billingPeriod === 'year' && (
                      <p className="text-sm text-gray-500 mt-2">
                        <span className="line-through">${plan.price * 12}</span> billed annually
                      </p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan)}
                  disabled={isLoading === plan.name}
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:shadow-lg hover:shadow-pink-400/25'
                      : 'bg-gradient-to-r from-cyan-400 to-pink-400 text-white hover:shadow-lg hover:shadow-cyan-400/25'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading === plan.name ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      {plan.price === 0 ? 'Get Started Free' : 'Subscribe Now'}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-12">
            Everything you need to code faster
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="card p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Can I cancel anytime?</h4>
                <p className="text-gray-400">Yes, you can cancel your subscription at any time. No long-term contracts or hidden fees.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h4>
                <p className="text-gray-400">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Is my code secure?</h4>
                <p className="text-gray-400">Absolutely. We use enterprise-grade encryption and never store your code without permission.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Do you offer refunds?</h4>
                <p className="text-gray-400">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
