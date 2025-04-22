const express = require('express');
const { createuserc } = require('../../controller/usercontroller');
const upload = require('../../middlerware/multer');
const userRouter = express.Router();

userRouter.post('/', upload.single('imagepath'), createuserc);


module.exports = userRouter;
