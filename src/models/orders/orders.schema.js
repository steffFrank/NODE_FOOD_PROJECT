import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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

export default mongoose.model("Order", orderSchema);