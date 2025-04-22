
const cloudinary = require('cloudinary').v2;
const { CLOUDNARY_NAME, KEY, SECREAT_KEY } = require('./serverconfig');

cloudinary.config({
  cloud_name: CLOUDNARY_NAME,
  api_key: KEY,
  api_secret: SECREAT_KEY,
});

module.exports = cloudinary;
