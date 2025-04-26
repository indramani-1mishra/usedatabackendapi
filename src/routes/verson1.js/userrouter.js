const express = require('express');
const { createuserc, getusersc, getuserbyid, updateuserc, deleteuserc } = require('../../controller/usercontroller');
const upload = require('../../middlerware/multer');
const userRouter = express.Router();

userRouter.post('/', upload.single('imagepath'), createuserc);
userRouter.get('/',getusersc);
userRouter.get('/:id', getuserbyid);
userRouter.put('/:id', upload.single('imagepath'), updateuserc);
userRouter.delete('/:id', deleteuserc);


module.exports = userRouter;
  