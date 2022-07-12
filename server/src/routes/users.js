const { Router } = require('express')
const UserRouter = Router()
const UserController = require('../controllers/UsersController')

UserRouter.get('/', async(req, res, next) => {
    try {
        res.json({
            ok: true,
            message: 'Users'
        })
    } catch (e) {
        next(e)
    }
})

UserRouter.post('/login', UserController.UserLoginAccount)

module.exports = {
    path: '/users',
    router: UserRouter
}