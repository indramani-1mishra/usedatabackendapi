const { createusers, findusers, updateusers, deleteusers, findUsersByid } = require("../servise/userservice")

const createuserc= async (req, res) => {
    console.log(req.body);
    try {
          
        const response= await createusers({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
            role: req.body.role,
            imagepath: req.file.path
         
        });
       return res.status(201).json({
            message: "User created successfully",
            data: response,
            statusCode: 201,
            success: true,
            
        });
      
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create user. Please check the request body and try again.  ",
        data:{},
        errors: error.errors? error.errors : {},
        statusCode: 400,
        success: false,
        
        
      })
    }
}

const getusersc = async (req, res) => {
    try {
        const response = await findusers();
        return res.status(200).json({
            message: "Users retrieved successfully",
            data: response,
            statusCode: 200,
            success: true,
            
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve users. Please try again.",
            data: {},
            errors: error.errors? error.errors : {},
            statusCode: 500,
            success: false,
            
        });
    }
}

const updateuserc = async (req, res) => {
    try {
        const response = await updateusers(req.params.id,{
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
            role: req.body.role,
            imagepath: req.file? req.file.path : null
        });
        return res.status(200).json({
            message: "User updated successfully",
            data: response,
            statusCode: 200,
            success: true,
            
        });
    } catch (error) {
        return res.status(404).json({
            message: "User not found. Please provide a valid user ID.",
            data: {},
            errors: error.errors? error.errors : {},
            statusCode: 404,
            success: false,
            
        });
    }
}

const deleteuserc = async (req, res) => {
    try {
        const response = await deleteusers(req.params.id, { is_deleted: true });
        return res.status(200).json({
            message: "User deleted successfully",
            data: response,
            statusCode: 200,
            success: true,
            
        });
    } catch (error) {
        return res.status(404).json({
            message: "User not found. Please provide a valid user ID.",
            data: {},
            errors: error.errors? error.errors : {},
            statusCode: 404,
            success: false,
            
        });
    }
}

const getuserbyid= async (req, res) => {
    try {
        const response = await findUsersByid(req.params.id);
        return res.status(200).json({
            message: "User retrieved successfully",
            data: response,
            statusCode: 200,
            success: true,
            
        });
    } catch (error) {
        return res.status(404).json({
            message: "User not found. Please provide a valid user ID.",
            data: {},
            errors: error.errors? error.errors : {},
            statusCode: 404,
            success: false,
            
        });
    }
}

module.exports = {
    createuserc,
    getusersc,
    updateuserc,
    deleteuserc,
    getuserbyid,
 };
