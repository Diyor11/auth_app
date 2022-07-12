const { Router } = require('express')
const AuthMiddleware = require('../middlewares/AuthMiddlewere')

const AboutRouter = Router() 

AboutRouter.get('/', AuthMiddleware, async(req, res) => {
    try {
        res.json({
            ok: true,
            message: 'Test test'
        })
    } catch (e) {
        next(e)
    }
})

module.exports = {path: '/about', router: AboutRouter}