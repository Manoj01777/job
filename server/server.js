import './config/instrument.js'
import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/db.js"
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'

//initilize  express
const app=express()


//connect to database
await connectDB()

//middlewares
app.use(cors())

app.use(express.json())

//routes
app.get("/",(req,res)=>
{
    res.send("Api working manoj")
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.post("/webhooks",clerkWebhooks)
  

//port {suppose we dont have any variable with port it will redirected to port 5000}
const PORT=process.env.PORT ||5000

Sentry.setupExpressErrorHandler(app);
app.listen(PORT,()=>
{
    console.log(`Server is running at port ${PORT}`);
    
})

//utils are used for common logics for controller folders eg: a token for user