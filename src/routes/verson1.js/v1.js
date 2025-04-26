const express = require('express');
const userRouter = require('./userrouter');
const postrouter = require('./postrouter');
const loginrouter = require('./logonrouter');
const v1router = express.Router();

v1router.use('/users',userRouter);
v1router.use('/posts',postrouter);
v1router.use('/login',loginrouter);

module.exports = v1router;