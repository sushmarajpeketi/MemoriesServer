import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

const app = express();
app.use(bodyParser.json({limit: "30mb", extended:true})) //extended true/false: uses query string library but if true parse complex nested queries 
app.use(bodyParser.urlencoded({limit: "30mb", extended:true})) //extended true/false: uses query string library but if true parse complex nested queries
app.use(cors()) ; 
dotenv.config(); 

const PORT = process.env.port || 8000;
mongoose.connect(process.env.CONNECTION_URL).then(()=>
    {
        console.log("database connected")
        app.listen(PORT,()=>{
            console.log(`server is listening on port ${PORT}`)
        })
    }).catch((err)=>console.log(err.message))

app.use('/posts', postRoutes)