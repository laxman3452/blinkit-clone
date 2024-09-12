import "dotenv/config";
import Fastify from "fastify";
import {connectDB} from './src/config/connect.js';

const start = async() =>{
    const app = Fastify()
    await connectDB(process.env.MONGO_URI)
    app.listen({port:process.env.PORT || 3000, host:'0.0.0.0'},(err,addr) =>{
        if(err) {
            console.log(err)
        }
        else {
            console.log(`BlinkIt started on http://localhost:${process.env.PORT || 3000}`)
        }
    })

}

start()
