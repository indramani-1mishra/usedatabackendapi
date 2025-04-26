const { login } = require("../servise/loginservice");

const logincontroller = async (req, res) => {
    console.log("User login request:", req.body?.email);
    
    try {
        // Validate if email, password, and phonenumber are provided
        if (!req.body.email || !req.body.password || !req.body.phonenumber) {
            return res.status(400).json({
                message: "Email, password and phonenumber are required",
                statusCode: 400,
                success: false,
            });
        }

        // Call the login service to authenticate the user and generate a token
        const response = await login({
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
        });

        // Extract token from the response
        const token = response.token;

        // Set the token as an HttpOnly cookie
        res.cookie("authtoken", token, {
            httpOnly: true, // The cookie can't be accessed by JavaScript on the client
            secure: process.env.NODE_ENV === "production", // Secure in production (use HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
            sameSite: "Strict", // Restricts cross-site cookie sending
        });

        // Return user data and success response
        return res.status(200).json({
            message: "Login successful",
            data: {}, // Includes user info and token
            success: true,
            statusCode: 200,
        });
    } catch (error) {
        console.error("Error in login controller:", error.message || error);
        return res.status(500).json({
            message: "Failed to login",
            statusCode: 500,
            success: false,
        });
    }
};

module.exports = logincontroller;
