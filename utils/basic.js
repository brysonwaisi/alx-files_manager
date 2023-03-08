const { ObjectId } = require('mongodb');

const basicUtils = {
  isValidId(id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }
    return true;
  },
};

module.exports = basicUtils;
