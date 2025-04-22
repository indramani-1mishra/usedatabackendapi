const express = require('express');
const userRouter = require('./userrouter');
const v1router = express.Router();

v1router.use('/users',userRouter);

module.exports = v1router;