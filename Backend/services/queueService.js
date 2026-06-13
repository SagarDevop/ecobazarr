const Queue = require('bull');
const { sendOrderConfirmation, sendOrderStatusUpdate, sendAbandonedCartEmail } = require('./emailService');
const User = require('../models/User');
const Cart = require('../models/Cart');

const redisUrl = process.env.REDIS_URL;

// Create queues only if Redis is configured
let emailQueue = null;
let reportQueue = null;

if (redisUrl) {
  // 1. Email Queue
  emailQueue = new Queue('email-notifications', redisUrl);
  emailQueue.on('error', () => {}); // Silenced — Redis errors handled in redis.js

  // 2. Report Queue
  reportQueue = new Queue('reports', redisUrl);
  reportQueue.on('error', () => {}); // Silenced

  // Email Worker
  emailQueue.process(async (job) => {
      const { type, data } = job.data;
      try {
          console.log(`📦 Processing background task: ${type}`);
          
          if (type === 'ORDER_CONFIRMATION') {
              await sendOrderConfirmation(data.email, data.order);
          } else if (type === 'STATUS_UPDATE') {
              await sendOrderStatusUpdate(data.email, data.orderId, data.status);
          } else if (type === 'ABANDONED_CART') {
              const cart = await Cart.findOne({ userId: data.userId });
              const user = await User.findById(data.userId);
              if (cart && cart.items.length > 0 && user) {
                  await sendAbandonedCartEmail(user.email, user.name, cart.items);
              }
          }
          
      } catch (err) {
          console.error(`❌ Background Job Error [${type}]:`, err);
          throw err;
      }
  });
} else {
  console.log('⚠️ Job queues disabled — REDIS_URL not configured');
}

module.exports = {
    emailQueue,
    reportQueue
};
