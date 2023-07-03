import mongoose, {Document, Schema} from "mongoose";
import { uniqueValidator } from "../../utils/mongo.utils";

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
}
const userSchema = new Schema({
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

uniqueValidator(userSchema, "email", "User");

export default mongoose.model("User", userSchema);