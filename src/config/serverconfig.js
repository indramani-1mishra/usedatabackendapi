require('dotenv').config();


const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.URL;

module.exports = {
    PORT,
    MONGO_URL
};