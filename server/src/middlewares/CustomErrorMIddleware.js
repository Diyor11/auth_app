const { CustomError } = require('../helpers/CustomError')

module.exports = (req, res, next) => {
    res.error = CustomError
    next()
}