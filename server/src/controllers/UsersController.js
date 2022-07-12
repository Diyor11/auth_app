const UserValidation = require('../validations/UserValidation')
const { signJwtToken } = require('../modules/jwt')
const { compareHash } = require('../modules/bcrypt')

module.exports = class UserController{
    static async UserLoginAccount(req,res, next) {
        try {
            const { user_login } = await UserValidation.UserLoginValidation(req.body)

            const {user_password} = await req.body

            const userAgent = req.headers['user-agent']
            const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress

            if (!(userAgent && ipAddress))
                throw new res.error(400, "Invalid device!")

            // find user from db
            const user = await req.db.users.findOne({
                where: {
                    user_login
                }
            })

            if(!user)
                throw new res.error(400, 'User doesn\'t exist')

            const passwordIsCorrect = await compareHash(user_password, user.user_password)

            if(!passwordIsCorrect)
                throw new res.error(401, 'Password is incorrect')

            // destroy old session if user exist
            await req.db.user_sessions.destroy({
                where: {
                    session_id: user.user_id
                }
            })

            
            // create session for the user
            const session = await req.db.user_sessions.create({
                session_id: user.user_id,
                session_init: ipAddress,
                session_user_agent: userAgent,
            })

            // generate token using user's session
            const token = await signJwtToken({
                session_id: session.session_id,
            });

            // generete token using user's session
            const userData = await req.db.users.findOne({
                where: {
                    user_id: user.user_id
                },
                attributes: {
                    exclude: ['user_password']
                }
            })

            res.status(201).json({
                ok: true,
                message: 'Login Successfully',
                data: {
                    token,
                    user: userData,
                }
            })

        } catch (e) {
            next(e)
        }
    }
}