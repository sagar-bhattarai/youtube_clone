import dotenv from "dotenv";
import express from "express";
const app = express();

dotenv.config({
  path: "./env",
});

import connectDB from "./db/index.js";
connectDB()
  .then(() => {
    try {
      app.on("error", (err) => {
        console.log("Error::", err);
        throw err;
      });

      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
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
    const app = express();

    ;( async ()=> {
        try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("Error :",error);
            throw error;
        })
        app.listen(process.env.PORT, ()=> {
            console.log(`App is listening on port :: ${process.env.PORT}`);
        })
        }catch(error){
            console.log("Error: ",error);
            throw error;
        }
    })();
*/
