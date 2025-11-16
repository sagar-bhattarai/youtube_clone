
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const server = express();

server.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

// chaiaurbackend custom api response and error handling /video 8
// 3 major configurations
server.use(express.json({limit:"16kb"}));
server.use(express.urlencoded({extended:true, limit:"16kb"}));
server.use(express.static("public"));
server.use(cookieParser());



// routes import
import userRouter from "./routes/user.route.js";

// routes declaration
server.use("/api/v1/users",userRouter);
// http://localhost:8000/api/v1/users/register

export {server};








/*
 
// const express = require('express')
import express from "express";
const app = express()
// require('dotenv').config()

app.get('/api/naman', (req, res) => {
  const naman = {
    parent:"Dhog garey mami buwa !!!",
    god:"jay shree krishna (bishow rup)"
  }
  res.send(naman);
})
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`app is listening on port:: ${process.env.PORT || port} `)
})


 */ 