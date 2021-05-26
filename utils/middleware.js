const errorHandler = (error, request, response, next) => {
    if(error.name === "TokenExpiredError"){
        return response.status(401).json({
            error: 'Token expired'
        })
    }
    next(error)
}


module.exports = {
    errorHandler
}
