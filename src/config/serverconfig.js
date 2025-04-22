require('dotenv').config();


const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.URL;
const SECREAT_KEY = process.env.SECREAT_KEY;
const KEY = process.env.KEY;
const CLOUDNARY_NAME= process.env.DB_NAME;

module.exports = {
    PORT,
    MONGO_URL,
    SECREAT_KEY,
    KEY,
    CLOUDNARY_NAME
};