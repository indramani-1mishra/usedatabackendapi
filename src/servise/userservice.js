const cloudinary = require("../config/clodneryconfig");
const { creatuser, getuser, getUserById, updateuser, deleteuser } = require("../repository/userrepository");
const fs = require("fs");
const path = require("path");

const createusers = async (userdetails) => {
    try {
        const imagepath = userdetails.imagepath;

        if (!imagepath) {
            throw { message: "Image path is required", statusCode: 400 };
        }

        // Cloudinary upload
        const uploadResponse = await cloudinary.uploader.upload(imagepath);
        const cloudinaryimagepath = uploadResponse.secure_url;

        // Create user with uploaded image URL
        const response = await creatuser({
            ...userdetails,
            imagepath: cloudinaryimagepath,
        });

        // Absolute path for deletion
        const absolutePath = path.resolve(imagepath);

        // Check if file exists and then delete it
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
           // console.log("Image deleted from local:", absolutePath);
        } else {
            console.warn("File not found for deletion:", absolutePath);
        }

        return response;

    } catch (error) {
        console.error("Error in createusers service:", error.message || error);
        throw {
            message: "Failed to create user in service layer",
            statusCode: 500,
        };
    }
};

const findusers = async () => {
    try {
        const response = await getuser();
        return response;
    } catch (error) {
        console.error("Error in findusers service:", error.message || error);
        throw {
            message: "Failed to find users in service layer",
            statusCode: 500,
        };
    }
};

// Find users by name
    const findUsersByid = async (id) => {
        try {
            const response = await getUserById(id);
            return response;
        } catch (error) {
            console.error(
                "Error in findUsersByName service:",
                error.message || error
            );
            throw {
                message: "Failed to find users by name in service layer",
                statusCode: 500,
            };
        }
    };

    const updateusers = async (id, updatedUserdetails) => {
        try {
            const user = await getUserById(id);
            if (!user) {
                throw { message: "User not found", statusCode: 404 };
            }
    
            let updatedImagePath = user.imagepath; // Existing image path
    
            // Check if new image is uploaded
            if (updatedUserdetails.imagepath) {
                // Upload new image to Cloudinary
                const uploadResponse = await cloudinary.uploader.upload(updatedUserdetails.imagepath);
                updatedImagePath = uploadResponse.secure_url;
    
                // Delete local uploaded file after upload
                const absolutePath = path.resolve(updatedUserdetails.imagepath);
                if (fs.existsSync(absolutePath)) {
                    fs.unlinkSync(absolutePath);
                    console.log("Local image deleted:", absolutePath);
                } else {
                    console.warn("Local file not found for deletion:", absolutePath);
                }
            }
    
            // Update user data
            const response = await updateuser(id, {
                ...updatedUserdetails,
                imagepath: updatedImagePath,
            });
    
            return response;
    
        } catch (error) {
            console.error("Error in updateusers service:", error.message || error);
            throw {
                message: "Failed to update user in service layer",
                statusCode: 500,
            };
        }
    };
    
    const deleteusers = async (id) => {
        try {
            const user = await getUserById(id);
            if (!user) {
                throw { message: "User not found", statusCode: 404 };
            }
            // Delete image from Cloudinary
            await cloudinary.uploader.destroy(user.imagepath);
            // Delete user from database
            const response = await deleteuser(id);
            return response;
        } catch (error) {
            console.error("Error in deleteuser service:", error.message || error);
            throw {
                message: "Failed to delete user in service layer",
                statusCode: 500,
            };
        }
    }

module.exports = {
    createusers,
    findusers,
    findUsersByid,
    updateusers,
    deleteusers,
};
