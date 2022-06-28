const express = require('express')
const app = express()
const Router = require('./src/routes/index')

const errorHandlerMiddleware = require('./src/helpers/CustomError')
const CustomErrorMiddleware = require('./src/middlewares/CustomErrorMIddleware')
const pg = require('./src/modules/pg')

require('dotenv').config()
const port = process.env.PORT || 3001

async function server() {
    try {
        const db = pg()

        app.listen(port, () => {
            console.log('Server running localhost:' + port)
        })

        app.use(express.json())
        app.use(express.urlencoded({extended: true}))

        app.use((req, res, next) => {
            req.db = db
            next()
        })

        // use custom error handlers
        app.use(CustomErrorMiddleware);

        await Router(app)

        // user error handle middlewae 
        app.use(errorHandlerMiddleware)
    } catch (e) {
        console.log('Error server', e.message)
    }
}

server()


