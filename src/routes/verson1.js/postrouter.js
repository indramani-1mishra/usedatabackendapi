const express = require('express');
const upload = require('../../middlerware/multer');
const { createPostc, getAllPostsc, getpostbyidc, updatePostc, deletePostc, addorremovelikec, addcommentc } = require('../../controller/postcontroller');
const isloggedin = require('../../validetor/isloggedin');
const postrouter = express.Router();

postrouter.post('/',isloggedin, upload.single('imagepath'),createPostc);
postrouter.get('/',isloggedin, getAllPostsc);
postrouter.get('/:id',isloggedin, getpostbyidc);
postrouter.put('/:id',isloggedin, upload.single('imagepath'), updatePostc);
postrouter.delete('/:id', isloggedin,deletePostc);
postrouter.post('/likes/:id', isloggedin, addorremovelikec);
postrouter.post('/comments/:id', isloggedin, addcommentc);


module.exports = postrouter;