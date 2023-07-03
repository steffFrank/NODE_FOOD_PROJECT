import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    products: string[];
    users: string[];
}
const orderSchema = new Schema<IOrder>({
    products: [{
        type: String,
        required: true,
    }],
    users: [{
        type: String,
        required: true
    }],
}, {
    timestamps: true
});

export default mongoose.model<IOrder>("Order", orderSchema);