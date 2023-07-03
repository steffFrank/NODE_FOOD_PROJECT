import mongoose, {Document, Schema} from "mongoose";
import { uniqueValidator } from "../../utils/mongo.utils";


export interface IProduct extends Document {
    name: string;
    quantity: number;
    imageUrl: string;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    imageUrl: {
        type: String,
        required: true
    }
});

uniqueValidator(productSchema, "name", "Product");

export default mongoose.model<IProduct>("Product", productSchema);