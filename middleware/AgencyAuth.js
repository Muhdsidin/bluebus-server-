const { verifyToken } = require("../utils/jwt")

const AgencyAuth =
 (req, res, next) => {
 try {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Please Login First"
        })
    }

    const user = verifyToken(token, process.env.SECRET_KEY)
    if(!user){
        return res.status(401).json({
            success : false,
            message : "your UnAUthrized "
        })
    }

    req.userId = user.id
    next()
 } catch (error) {
    res.status(500).json({
        success : false,
        message : "Random Issue form Server Side "
    })
 }   
}

module.exports = { AgencyAuth }