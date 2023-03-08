const redis = require('redis');
const promisify = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client did not connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
