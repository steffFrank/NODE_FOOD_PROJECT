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
export const mongoConnect = async (env = "prod") => {

    let url = "";

    if (env === "test") {
        url = process.env.TEST_MONGODB_URL
    } else if (env === "prod") {
        url = process.env.MONGODB_URL
    }

    try {
        await mongoose.connect(url);
        console.log("Connected to mongoose");
    } catch (error) {
        console.error(error);
    }
}

/**
 * Disconnect from mongoDb
 */
export const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

export const uniqueValidator = async (schema, field) => {
    schema.pre("save", async function (next) {
        const doc = this;
        try {
            const model = mongoose.models[doc.constructor.modelName]
            const fieldExists = await model.findOne({ [field]: doc[field] });
            if (fieldExists) {
                const error = new Error(`${doc[field]} already exists`);
                return next(error);
            }
            next();
        } catch (error) {
            return next(error);
        }
    });
}