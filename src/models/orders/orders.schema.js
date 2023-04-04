import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        type: String,
    }],
    users: [{
        type: String,
    }]
});

const validateArray = arr => {
    orderSchema.pre("save", function (next) {
        this[arr] = _.uniq(this[arr]);
        next();
    });
}

validateArray("products");
validateArray("users");

export default mongoose.model("Order", orderSchema);