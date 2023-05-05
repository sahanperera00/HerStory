import mongoose from 'mongoose';

export const connectDB = async()=>{
    try{
        mongoose.set("strictQuery",false);
        mongoose.connect(process.env.MONGODB_URL);
        const connection = mongoose.connection;

        connection.once("open",()=>{
            console.log("HerStory MongoDB database connection successful!");
        })
    }catch(error){
        console.log(`Database Error: ${error.message}`);
    }
}