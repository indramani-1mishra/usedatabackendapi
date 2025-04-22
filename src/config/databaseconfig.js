const mongoose = require('mongoose');
const { MONGO_URL } = require('./serverconfig');
const connectdb= async()=>
{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB Connected...');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports=connectdb;