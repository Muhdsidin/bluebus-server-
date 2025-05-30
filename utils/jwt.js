const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateToken, verifyToken }
