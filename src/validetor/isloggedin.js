const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverconfig');

const isloggedin = (req, res, next) => {

    // Get the token from the cookies
    const token = req.cookies['authtoken'];
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    let decoded;
    try {
        // Verify the token with the secret key
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed",
            error: "Invalid or expired auth token",
            success: false,
            data: {}
        });
    }

    // Attach user info to request object for access in other middleware or routes
    req.user = {
        id: decoded.userId, // Ensure you're using the correct key from your token payload
        email: decoded.email,
        phonenumber: decoded.phonenumber,
    }

    next(); // Proceed to the next middleware or route handler
}

module.exports = isloggedin;
