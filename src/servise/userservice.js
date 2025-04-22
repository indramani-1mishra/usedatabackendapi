const cloudinary = require("../config/clodneryconfig");
const { creatuser } = require("../repository/userrepository");
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

module.exports = {
    createusers,
};
