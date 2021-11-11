const express = require('express');
const visitorRouter = express.Router();

const visitorController = require('.././controllers/visitors')

visitorRouter.route('/').get(visitorController.getVisitors)

module.exports = visitorRouter;