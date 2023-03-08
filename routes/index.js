const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

function routingControl(app) {
  const router = express.Router();
  app.use('/', router);

  // App Controller
  router.get('/status', AppController.getStatus);
  router.get('/stats', AppController.getStats);

  // User Controller
  router.post('/users', UsersController.postNew);

  // Authenticate user
  router.get('/connect', AuthController.getConnect);
  router.get('/disconnect', AuthController.getDisconnect);
  router.get('/users/me', UsersController.getMe);
}
module.exports = routingControl;
