const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

function routingControl(app) {
  const router = express.Router();
  app.use('/', router);

  // App Controller
  router.get('/status', AppController.getStatus);
  router.get('/stats', AppController.getStats);

  // User Controller
  router.post('/users', UsersController.postNew);
}
module.exports = routingControl;
