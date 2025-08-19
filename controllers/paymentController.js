// controllers/paymentController.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_ccQKZ3le2mbA7R',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'maNdlyTdMHsOcXcWzfooGy7'
});

// Create Razorpay order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required and should be greater than 0'
      });
    }

    const options = {
      amount: Math.round(amount), // amount in paise, ensure it's integer
      currency,
      receipt: receipt || `order_${Date.now()}`,
      notes: notes || {}
    };

    const order = await razorpay.orders.create(options);
    
    console.log('Razorpay order created:', order);

    res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_ccQKZ3le2mbA7R'
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
};

// Verify Razorpay payment and create order
export const verifyRazorpayPayment = async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'maNdlyTdMHsOcXcWzfooGy7')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Payment is verified, now create the order in database with transaction
    session.startTransaction();

    // Validate and update product quantities
    for (const item of orderData.orderItems) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      if (product.quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`);
      }
      
      // Reduce product quantity
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    // Create the order
    const order = new Order({
      user: req.user._id,
      orderItems: orderData.orderItems,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: 'online',
      totalPrice: orderData.totalPrice,
      isPaid: true,
      paidAt: new Date(),
      status: 'Processing', // Set status to Processing for paid orders
      paymentResult: {
        id: razorpay_payment_id,
        status: 'completed',
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      }
    });

    const savedOrder = await order.save({ session });
    
    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Payment verified and order created successfully',
      order: savedOrder
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  } finally {
    await session.endSession();
  }
};

// Get payment details
export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await razorpay.payments.fetch(paymentId);
    
    res.status(200).json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message
    });
  }
};

// Refund payment
export const refundPayment = async (req, res) => {
  try {
    const { paymentId, amount, reason } = req.body;
    
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount, // amount in paise
      notes: {
        reason: reason || 'Customer request'
      }
    });
    
    res.status(200).json({
      success: true,
      refund
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process refund',
      error: error.message
    });
  }
};