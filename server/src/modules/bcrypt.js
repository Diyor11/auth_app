const { compare, hash } = require('bcryptjs')

const createNewHash = async(data) => {
    return await hash(data, 10)
}

const compareHash = async (data, hash) => {
    return await compare(data, hash)
}

module.exports = { createNewHash, compareHash }