const express = require('express');
const logincontroller = require('../../controller/logincontroller');
const loginrouter = express.Router();

loginrouter.post('/',logincontroller);

module.exports = loginrouter;