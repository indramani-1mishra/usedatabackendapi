const userModel = require("../schema/userschema");

const creatuser = async(userdetails)=>
{
    try{
      const user = await userModel.create(userdetails);
      return user;   
    }
    catch(err){
        console.error("Error creating user:", err);
        throw {message: "Failed to create user", statusCode: 500};
    }
}

module.exports = {
    creatuser
}