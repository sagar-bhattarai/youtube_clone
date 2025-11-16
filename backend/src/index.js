import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {server} from './server.js';


dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    try {
      server.on("error", (err) => {
        console.log("Error::", err);
        throw err;
      });

      const PORT = process.env.PORT || 8000;
      server.listen(PORT, () => {
        console.log(`Server is running at port :: ${process.env.PORT}`);
      });
    } catch (err) {
      console.log("Error::", err);
      throw err;
    }
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });

/* 
    import mongoose from "mongoose";
    import {DB_NAME} from "./constants.js";

    import express from "express";
    const server = express();

    ;( async ()=> {
        try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        server.on("error",(error)=>{
            console.log("Error :",error);
            throw error;
        })
        server.listen(process.env.PORT, ()=> {
            console.log(`App is listening on port :: ${process.env.PORT}`);
        })
        }catch(error){
            console.log("Error: ",error);
            throw error;
        }
    })();
*/
