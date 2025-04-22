const { createusers } = require("../servise/userservice")

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

module.exports = {
    createuserc
}