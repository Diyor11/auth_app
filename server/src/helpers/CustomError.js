let CustomError = class CustomError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

let errorHandlerMiddleware = (error, req, res, next) => {
    res.status(error.code || 500).json({
        ok: false,
        message: error.message || 'Internal Server Error',
    })
}

module.exports = { CustomError, errorHandlerMiddleware }