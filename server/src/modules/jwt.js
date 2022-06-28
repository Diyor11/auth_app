const jwt = require('jsonwebtoken')

const signJwtToken = (data) => {
    return jwt.sign(data, process.env.SECRET_WORD)
}

const verifyJwtToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_WORD)
    } catch (e) {
        return false
    }
}

module.exports = { signJwtToken, verifyJwtToken }