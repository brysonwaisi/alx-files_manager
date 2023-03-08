const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');

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

  // Files Controller

  // should create a new file in DB and in disk
  router.post('/files', FilesController.postUpload);

  // should retrieve the file document based on the ID
  router.get('/files/:id', FilesController.getShow);

  // should retrieve all users file documents for a
  // specific parentId and with pagination
  router.get('/files', FilesController.getIndex);

  // should set isPublic to true on the file document based on the ID
  router.put('/files/:id/publish', FilesController.putPublish);

  // should set isPublic to false on the file document based on the ID
  router.put('/files/:id/unpublish', FilesController.putUnpublish);

  // should return the content of the file document based on the ID
  router.get('/files/:id/data', FilesController.getFile);
}
module.exports = routingControl;
