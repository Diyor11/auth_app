const { verifyJwtToken } = require('../modules/jwt')

module.exports = async(req, res, next) => {
    try {
        if(!req.headers['authorization'])
            throw new res.error(403, 'Token not found')
        
        const data = verifyJwtToken(req.headers['authorization'])

        if(!data)
            throw new res.error(403, 'Invalid token')
        
        const session = await req.db.users_sessions.findOne({
            where: {
                session_id: data.session_id,
            },
        })

        const user_agent = req.headers['user_agent']

        if(!session) throw new res.error(403, 'Session already expired')

        if(session.session_user_agent !== user_agent) {
            await req.db.users_sessions.destroy({
                where: {
                    session_id: data.session_id,
                },
            })
            throw new res.error(403, 'Session expired')
        }

        req.session = session
        next()
    } catch (e) {
        if(!e.statusCode){
            error = new res.error(401, 'Unauthorized')
        }
        next(e)
    }
}