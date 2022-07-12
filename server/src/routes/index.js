const Fs = require('fs')
const Path = require('path')

const homedir = Path.resolve()

module.exports = (app) => {
    // Get router and run || Custom Glob collector
    return new Promise((resolve, reject) => {
        const routeDirectory = Path.join(homedir, 'src', 'routes')
        Fs.readdir(routeDirectory, async(err, routeFiles) => {
            if(err) throw new Error('Routes path not found')

            for await (let routeName of routeFiles) {
                const routeFile = Path.join(
                    homedir,
                    'src',
                    'routes',
                    routeName
                )

                const route = await require(routeFile)
                if(route?.path && route?.router) {
                    app.use('/api/v1' +  route.path, route.router)
                }
            }
            resolve(200)
        })
    })
}