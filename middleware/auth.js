const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {

    // headers should be lowercase
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token not found"
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.secret_key);

 

    next();

  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message
    });
  }
};

module.exports = auth;