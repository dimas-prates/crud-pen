import { AppDataSource } from './data-source'
import app from "./app"
const appPort = process.env.PORT || 3000

AppDataSource.initialize().then((result) => {
    const server = app.listen(appPort, () => {
        console.log(`Server's running on port: ${appPort}`)
    })
    process.on('SIGINT', () => {
        server.close()
        console.log(`Server has stopped`)
    })

}).catch((error) => { console.log(error) })