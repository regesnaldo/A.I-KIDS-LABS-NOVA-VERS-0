const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// PagSeguro configuration
const PAGSEGURO_TOKEN = process.env.PAGSEGURO_TOKEN || 'your_pagseguro_token_here';
const PAGSEGURO_EMAIL = process.env.PAGSEGURO_EMAIL || 'your_pagseguro_email_here';
const PAGSEGURO_BASE_URL = process.env.PAGSEGURO_ENV === 'production' 
  ? 'https://api.pagseguro.com' 
  : 'https://sandbox.pagseguro.com';

/**
 * Create a subscription plan in PagSeguro
 */
const createSubscriptionPlan = async (req, res) => {
  try {
    const { userId, planType = 'monthly' } = req.body;
    
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Define plan details based on type
    const planDetails = {
      reference: `AI_KIDS_LABS_${planType}_${Date.now()}`,
      name: 'A.I. KIDS LABS Subscription',
      amount: planType === 'annual' ? 89.90 : 9.90, // R$9.90 monthly or R$89.90 annual
      interval: planType === 'annual' ? { unit: 'YEAR', value: 1 } : { unit: 'MONTH', value: 1 },
      trialPeriodDays: 7, // 7-day free trial
      paymentMethodGroups: ['CREDIT_CARD', 'BOLETO', 'PIX']
    };

    // Call PagSeguro API to create the plan
    const response = await axios.post(
      `${PAGSEGURO_BASE_URL}/pre-approvals/request`,
      {
        reference: planDetails.reference,
        preApproval: {
          charge: "AUTO",
          name: planDetails.name,
          details: "A.I. KIDS LABS - Plataforma educacional com IA e 3D",
          amountPerPayment: planDetails.amount.toString(),
          maxAmountPerPeriod: planDetails.amount.toString(),
          period: planDetails.interval.unit,
          cycle: planDetails.interval.value,
          trialPeriodDuration: planDetails.trialPeriodDays
        },
        redirectURL: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success`,
        notificationURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/webhook`
      },
      {
        headers: {
          'Authorization': `Bearer ${PAGSEGURO_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return the plan response from PagSeguro
    res.json({
      success: true,
      data: {
        planId: response.data.code,
        reference: planDetails.reference,
        name: planDetails.name,
        amount: planDetails.amount,
        interval: planDetails.interval,
        trialPeriodDays: planDetails.trialPeriodDays,
        status: 'ACTIVE',
        paymentLink: response.data.paymentLink
      }
    });

  } catch (error) {
    console.error('Error creating subscription plan:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || 'Server error creating subscription plan'
    });
  }
};

/**
 * Create a subscription for a user
 */
const createSubscription = async (req, res) => {
  try {
    const { userId, planId, paymentMethod, customerData } = req.body;
    
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Validate required fields
    if (!planId || !paymentMethod || !customerData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: planId, paymentMethod, customerData'
      });
    }

    // Call PagSeguro API to create the subscription
    const response = await axios.post(
      `${PAGSEGURO_BASE_URL}/pre-approvals/${planId}/request`,
      {
        sender: {
          email: customerData.email || user.email,
          name: customerData.name || user.username,
          ip: req.ip,
          hash: customerData.hash || null,
          address: customerData.address || null,
          documents: customerData.documents || null
        },
        paymentMethod: {
          type: paymentMethod.type,
          creditCard: paymentMethod.type === 'CREDIT_CARD' ? {
            token: paymentMethod.token,
            holder: {
              name: paymentMethod.holderName,
              birthDate: paymentMethod.birthDate,
              documents: paymentMethod.documents,
              phone: paymentMethod.phone
            }
          } : null
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${PAGSEGURO_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Update user subscription status
    user.subscription = {
      status: 'PENDING',
      planId,
      subscriptionId: response.data.code,
      startDate: new Date(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      amount: response.data.amountPerPayment,
      paymentMethod: paymentMethod.type
    };

    await user.save();

    res.json({
      success: true,
      data: {
        subscriptionId: response.data.code,
        planId,
        userId,
        status: 'PENDING',
        nextBillingDate: user.subscription.nextBillingDate,
        amount: response.data.amountPerPayment,
        paymentMethod: paymentMethod.type,
        paymentLink: response.data.paymentLink
      }
    });

  } catch (error) {
    console.error('Error creating subscription:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || 'Server error creating subscription'
    });
  }
};

/**
 * Handle PagSeguro notification (webhook)
 */
const handlePagSeguroNotification = async (req, res) => {
  try {
    const { notificationCode, notificationType } = req.body;

    // Verify notification with PagSeguro API
    const verificationResponse = await axios.get(
      `${PAGSEGURO_BASE_URL}/notifications/${notificationCode}`,
      {
        headers: {
          'Authorization': `Bearer ${PAGSEGURO_TOKEN}`
        }
      }
    );

    const notificationData = verificationResponse.data;

    // Find user by subscription ID
    let user = null;
    if (notificationData.code) {
      user = await User.findOne({ 'subscription.subscriptionId': notificationData.code });
    }

    // Process the notification based on type
    if (notificationType === 'transaction') {
      // Handle transaction notification
      console.log('Processing transaction notification:', notificationData);
      
      if (user) {
        // Update user subscription status based on transaction
        if (notificationData.status === 'PAID') {
          user.subscription.status = 'ACTIVE';
          user.subscription.startDate = new Date();
          user.subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
          await user.save();
        } else if (notificationData.status === 'CANCELLED') {
          user.subscription.status = 'CANCELLED';
          await user.save();
        }
      }
    } else if (notificationType === 'preApproval') {
      // Handle subscription notification
      console.log('Processing subscription notification:', notificationData);
      
      if (user) {
        // Update user subscription status based on pre-approval
        if (notificationData.status === 'ACTIVE') {
          user.subscription.status = 'ACTIVE';
          user.subscription.startDate = new Date();
          user.subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        } else if (notificationData.status === 'CANCELLED') {
          user.subscription.status = 'CANCELLED';
          user.subscription.cancellationDate = new Date();
        } else if (notificationData.status === 'SUSPENDED') {
          user.subscription.status = 'SUSPENDED';
        }
        
        await user.save();
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling PagSeguro notification:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Server error handling notification'
    });
  }
};

/**
 * Get user subscription status
 */
const getUserSubscription = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const subscription = user.subscription || {
      status: 'INACTIVE',
      planId: null,
      subscriptionId: null,
      startDate: null,
      nextBillingDate: null,
      amount: null,
      paymentMethod: null
    };

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Error getting subscription status:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting subscription status'
    });
  }
};

/**
 * Cancel user subscription
 */
const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { cancellationReason = 'USER_REQUESTED' } = req.body;
    
    const user = await User.findById(userId);
    if (!user || !user.subscription || !user.subscription.subscriptionId) {
      return res.status(404).json({
        success: false,
        error: 'No active subscription found'
      });
    }

    // Call PagSeguro API to cancel the subscription
    await axios.put(
      `${PAGSEGURO_BASE_URL}/pre-approvals/${user.subscription.subscriptionId}/cancel`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${PAGSEGURO_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Update user subscription status
    user.subscription.status = 'CANCELLED';
    user.subscription.cancellationDate = new Date();
    user.subscription.cancellationReason = cancellationReason;

    await user.save();

    res.json({
      success: true,
      data: {
        subscriptionId: user.subscription.subscriptionId,
        status: 'CANCELLED',
        cancellationDate: user.subscription.cancellationDate,
        cancellationReason
      }
    });

  } catch (error) {
    console.error('Error cancelling subscription:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || 'Server error cancelling subscription'
    });
  }
};

/**
 * Process payment webhook from PagSeguro
 */
const processWebhook = async (req, res) => {
  try {
    const { notificationCode, notificationType } = req.body;

    console.log('Processing PagSeguro webhook:', { notificationCode, notificationType });

    // Verify the notification is legitimate
    if (!notificationCode || !notificationType) {
      return res.status(400).json({
        success: false,
        error: 'Missing notification code or type'
      });
    }

    // Verify notification with PagSeguro API
    const verificationResponse = await axios.get(
      `${PAGSEGURO_BASE_URL}/notifications/${notificationCode}`,
      {
        headers: {
          'Authorization': `Bearer ${PAGSEGURO_TOKEN}`
        }
      }
    );

    const notificationData = verificationResponse.data;

    // Find user by subscription ID
    let user = null;
    if (notificationData.code) {
      user = await User.findOne({ 'subscription.subscriptionId': notificationData.code });
    }

    // Process the notification based on type
    if (notificationType === 'transaction') {
      // Handle transaction notification
      console.log('Processing transaction notification:', notificationData);
      
      if (user) {
        // Update user subscription status based on transaction
        if (notificationData.status === 'PAID') {
          user.subscription.status = 'ACTIVE';
          user.subscription.startDate = new Date();
          user.subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
          await user.save();
        } else if (notificationData.status === 'CANCELLED') {
          user.subscription.status = 'CANCELLED';
          await user.save();
        }
      }
    } else if (notificationType === 'preApproval') {
      // Handle subscription notification
      console.log('Processing subscription notification:', notificationData);
      
      if (user) {
        // Update user subscription status based on pre-approval
        if (notificationData.status === 'ACTIVE') {
          user.subscription.status = 'ACTIVE';
          user.subscription.startDate = new Date();
          user.subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        } else if (notificationData.status === 'CANCELLED') {
          user.subscription.status = 'CANCELLED';
          user.subscription.cancellationDate = new Date();
        } else if (notificationData.status === 'SUSPENDED') {
          user.subscription.status = 'SUSPENDED';
        }
        
        await user.save();
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Server error processing webhook'
    });
  }
};

/**
 * Get subscription details from PagSeguro
 */
const getSubscriptionDetails = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { subscriptionId } = req.params;
    
    const user = await User.findById(userId);
    if (!user || !user.subscription || user.subscription.subscriptionId !== subscriptionId) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found for this user'
      });
    }

    // Get subscription details from PagSeguro
    const response = await axios.get(
      `${PAGSEGURO_BASE_URL}/pre-approvals/${subscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${PAGSEGURO_TOKEN}`
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Error getting subscription details:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || 'Server error getting subscription details'
    });
  }
};

module.exports = {
  createSubscriptionPlan,
  createSubscription,
  handlePagSeguroNotification,
  getUserSubscription,
  cancelSubscription,
  processWebhook,
  getSubscriptionDetails
};