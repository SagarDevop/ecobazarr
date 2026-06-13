const Redis = require('ioredis');
const logger = require('./logger');

/**
 * Redis Connection Configuration
 * Uses Upstash or Local Redis depending on REDIS_URL.
 * Gracefully degrades if Redis is unavailable — the app works without it.
 */
let redis = null;
let redisErrorLogged = false;

try {
  const redisUrl = process.env.REDIS_URL;

  // Skip Redis entirely if no URL is configured
  if (!redisUrl) {
    console.log('⚠️ Redis skipped — REDIS_URL not configured in .env (caching disabled)');
  } else {
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      connectTimeout: 10000, 
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 3) {
          // Stop retrying after 3 attempts
          if (!redisErrorLogged) {
            console.error('❌ Redis unreachable after 3 attempts — disabling. App will work without cache.');
            redisErrorLogged = true;
          }
          return null; // Stop retrying
        }
        return Math.min(times * 500, 3000);
      }
    });

    redis.connect().catch(() => {
      // Silent catch, let error event handle logging
    });

    redis.on('connect', () => {
      console.log('✅ Redis Connected');
      redisErrorLogged = false;
    });

    redis.on('error', (err) => {
      // Only log the first error to avoid spam
      if (!redisErrorLogged) {
        console.error('❌ Redis Connection Error:', err.message);
        redisErrorLogged = true;
      }
    });
  }
} catch (err) {
  console.error('❌ Redis Init Error:', err.message);
}

module.exports = redis;
