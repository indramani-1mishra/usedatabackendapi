
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverconfig");
const bcrypt = require("bcrypt"); // spelling correction: bcrypt
const { getuserbynumberoremail } = require("../repository/userrepository");


const login = async (userdetails) => {
  try {
    const user = await getuserbynumberoremail(userdetails.email, userdetails.phonenumber);
    if (!user) {
      throw { message: "User not found", statusCode: 404 };
    }

    const validPassword = await bcrypt.compare(userdetails.password, user.password);
    if (!validPassword) {
      throw { message: "Invalid password", statusCode: 401 };
    }

    // ✅ Create token once
    const token = jwt.sign(
      {
        userId: user._id,
        phonenumber: user.phonenumber,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7h" }
    );

    // ✅ Return token with user info
    return {
      userId: user._id,
      phonenumber: user.phonenumber,
      email: user.email,
      token,
    };
  } catch (errors) {
    console.error("Error in login:", errors);
    throw { message: "Failed to login", statusCode: 500 };
  }
};

module.exports = {
  login,
};