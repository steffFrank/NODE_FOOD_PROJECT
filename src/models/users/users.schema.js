import mongoose from "mongoose";

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

// Validates the uniqueness of the email before saving
userSchema.pre("save", async function(next) {
    const user = this;
    try {
        const userExists = await mongoose.models.User.findOne({email: user.email}); 
        if (userExists) {
            const error = new Error("Email already exists");
            return next(error);
        }
        next();
    } catch (error) {
        return next(error);
    }
});


export default mongoose.model("User", userSchema);