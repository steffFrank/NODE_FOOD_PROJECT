import mongoose from "mongoose";
import { uniqueValidator } from "../../utils/mongo.utils.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    }
});

await uniqueValidator(productSchema, "name");

export default mongoose.model("Product", productSchema);