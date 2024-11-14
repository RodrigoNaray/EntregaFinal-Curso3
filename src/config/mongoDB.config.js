import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try{
    mongoose.connect('mongodb://localhost:2017/')
    console.log("MongoDb connected successfully!");
  }catch(error){
    console.log(`Error conectando a MongoDB: ${error}`);
  }
}