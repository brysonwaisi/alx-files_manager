const redisClient = require('./redis');
const dbClient = require('./db');

const userUtils = {
  // Gets a userid and key of redis from request
  async getUserIdAndKey(request) {
    const obj = { userId: null, key: null };

    const xToken = request.header('X-Token');

    if (!xToken) return obj;

    obj.key = `auth_${xToken}`;

    obj.userId = await redisClient.get(obj.key);

    return obj;
  },

  // Gets user from database
  async getUser(query) {
    const user = await dbClient.usersCollection.findOne(query);
    return user;
  },
};

module.exports = userUtils;
