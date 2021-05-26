const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try{
        const token = req.cookies.token

        if(!token){
            return req.status(401).json({
                errorMessage: "Unauthorized"
            })
        }
        const verifiedToken = jwt.verify(token, process.env.SECRET)
        req.user = verifiedToken.id
        next()
    } catch (err) {
        return res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = auth