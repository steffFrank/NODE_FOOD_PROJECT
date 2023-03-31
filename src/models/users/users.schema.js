import mongoose from "mongoose";
import { uniqueValidator } from "../../utils/mongo.utils.js";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    }
});

await uniqueValidator(userSchema, "email");

export default mongoose.model("User", userSchema);