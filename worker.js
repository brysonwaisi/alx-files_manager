const Queue = require('bull');
const { ObjectId } = require('mongodb');
const fsPromises = require('fs').promises;
const imageThumbnail = require('image-thumbnail');
const fileUtils = require('./utils/file');
const userUtils = require('./utils/user');
const basicUtils = require('./utils/basic');

const fileQueue = new Queue('fileQueue');
const userQueue = new Queue('userQueue');

fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  // Delete bull keys in redis
  //   redis-cli keys "bull*" | xargs redis-cli del

  if (!userId) {
    console.log('Missing userId');
    throw new Error('Missing userId');
  }

  if (!fileId) {
    console.log('Missing fileId');
    throw new Error('Missing fileId');
  }

  if (!basicUtils.isValidId(fileId) || !basicUtils.isValidId(userId)) throw new Error('File not found');

  const file = await fileUtils.getFile({
    _id: ObjectId(fileId),
    userId: ObjectId(userId),
  });

  if (!file) throw new Error('File not found');

  const { localPath } = file;
  const options = {};
  const widths = [500, 250, 100];

  widths.forEach(async (width) => {
    options.width = width;
    try {
      const thumbnail = await imageThumbnail(localPath, options);
      await fsPromises.writeFile(`${localPath}_${width}`, thumbnail);
      //   console.log(thumbnail);
    } catch (err) {
      console.error(err.message);
    }
  });
});

userQueue.process(async (job) => {
  const { userId } = job.data;
  // Delete bull keys in redis
  //   redis-cli keys "bull*" | xargs redis-cli del

  if (!userId) {
    console.log('Missing userId');
    throw new Error('Missing userId');
  }

  if (!basicUtils.isValidId(userId)) throw new Error('User not found');

  const user = await userUtils.getUser({
    _id: ObjectId(userId),
  });

  if (!user) throw new Error('User not found');

  console.log(`Welcome ${user.email}!`);
});
