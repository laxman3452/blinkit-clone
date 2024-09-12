import "dotenv/config";
import Fastify from "fastify";
import {connectDB} from './src/config/connect.js';
import {PORT} from "./src/config/config.js";
import {admin,buildAdminRouter} from './src/config/setup.js'

const start = async() =>{
    const app = Fastify()
    await buildAdminRouter(app)
    await connectDB(process.env.MONGO_URI)
    app.listen({port:PORT || 3000, host:'0.0.0.0'},(err,addr) =>{
        if(err) {
            console.log(err)
        }
        else {
            console.log(`BlinkIt started on http://localhost:${process.env.PORT}${admin.options.rootPath}`)
        }
    })

}

start()
