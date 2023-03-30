import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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

// Validates the uniqueness of the email before saving
userSchema.pre("save", next => {
    const user = this;
    mongoose.models.User.findOne({email: user.email}, (err, userExists) => {
        if (err) {
            return next(err);
        }
        if (userExists) {
            const error = new Error("Email already exists");
            return next(error);
        }
        next();
    });
});

export default mongoose.model("User", userSchema);