
import mongoose from "mongoose";
export const db = async () => {
  
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL,{
     
    })
    if (connection) {
      console.log("server is conneceted to db");
    }
  } 
  catch (err ){
    console.error("Database connection error:", err.message);
 
  }
}