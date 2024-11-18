const express = require('express');
const routes = express.Router();
const endpoints = require('./endpoints');

routes.use('/', endpoints);

// health check
routes.get('/health', (req, res) => res.sendStatus(200));

module.exports = routes;