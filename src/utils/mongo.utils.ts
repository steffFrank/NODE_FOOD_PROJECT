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
export const mongoConnect = async (env: string = "prod"): Promise<void> => {

    let url: string = "";

    if (env === "test") {
        if (!process.env.TEST_MONGODB_URL) {
            throw new Error("TEST_MONGODB_URL is not defined");
        }
        url = process.env.TEST_MONGODB_URL;
    } else if (env === "prod") {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined");
        }
        url = process.env.MONGODB_URL;
    }

    try {
        await mongoose.connect(url);
        console.log("Connected to mongoose");
    } catch (error: any) {
        console.error(error);
    }
}

/**
 * Disconnect from mongoDb
 */
export const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

export const uniqueValidator = async (schema: mongoose.Schema, field: string, modelName: string) => {
    schema.pre("save", async function (next) {
        const doc = this;
        try {
            const model = mongoose.models[modelName]
            const fieldExists = await model.findOne({ [field]: doc[field] });
            if (fieldExists) {
                const error = new Error(`${doc[field]} already exists`);
                return next(error);
            }
            next();
        } catch (error: any) {
            return next(error);
        }
    });
}