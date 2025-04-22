const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const uploadedFilesdir = path.join(__dirname, '../uploads');  // uploads folder को project के अंदर बनाएं

if (!fs.existsSync(uploadedFilesdir)) {
    fs.mkdirSync(uploadedFilesdir, { recursive: true }); // nested folders के लिए
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadedFilesdir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;
