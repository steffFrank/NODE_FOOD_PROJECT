import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Opens connection to mongodb once to insure stability and reliability
mongoose.connection.once("open", () => {
    console.log("MongoDb connection ready!");
})

//Logs mongodb errors 
mongoose.connection.on("error", error => {
    console.error(error);
})

/**
 * Connect to mongoDb with Uri
 */
export const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to mongoose");
    } catch(error) {
        console.error(error);
    }
}

/**
 * Disconnect from mongoDb
 */
export const mongoDisconnect = async () => {
    await mongoose.disconnect();
}