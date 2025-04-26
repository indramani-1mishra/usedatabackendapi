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

const getuser= async()=>
{
    try{
        const users = await userModel.find();
        return users;
    }
    catch(err){
        console.error("Error getting users:", err);
        throw {message: "Failed to get users", statusCode: 500};
    }
}

const updateuser = async(id, updatedUserdetails)=>
    {
        try{
            const user = await userModel.findByIdAndUpdate(id, updatedUserdetails, {new: true});
            if(!user){
                throw {message: "User not found", statusCode: 404};
            }
            return user;
        }
        catch(err){
            console.error("Error updating user:", err);
            throw {message: "Failed to update user", statusCode: 500};
        }
    }
    
const deleteuser = async(id)=>
    {
        try{
            const user = await userModel.findByIdAndDelete(id);
            if(!user){
                throw {message: "User not found", statusCode: 404};
            }
            return user;
        }
        catch(err){
            console.error("Error deleting user:", err);
            throw {message: "Failed to delete user", statusCode: 500};
        }
    }

    const getUserById = async(id)=>
        {
            try{
                const user = await userModel.findById(id);
                if(!user){
                    throw {message: "User not found", statusCode: 404};
                }
                return user;
            }
            catch(err){
                console.error("Error getting user by id:", err);
                throw {message: "Failed to get user by id", statusCode: 500};
            }
        }

        const getuserbynumberoremail = async(email, number)=>
        {
            try{
                const user = await userModel.findOne({$or: [{phonenumber: number}, {email: email}]});
                if(!user){
                    throw {message: "User not found", statusCode: 404};
                }
                return user;
            }
            catch(err){
                console.error("Error getting user by number or email:", err);
                throw {message: "Failed to get user by number or email", statusCode: 500};
            }
        }


module.exports = {
    getuser,
    getUserById,
    updateuser,
    deleteuser,
    creatuser,
   getuserbynumberoremail
}