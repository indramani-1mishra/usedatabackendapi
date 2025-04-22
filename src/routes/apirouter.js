const express = require('express');
const v1router = require('./verson1.js/v1');
const apirouter = express.Router();

apirouter.use('/v1',v1router);

module.exports = apirouter;