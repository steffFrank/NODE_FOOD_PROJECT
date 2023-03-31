import users from "./users.schema.js";

export const addNewUser = async user => {
    await users.create(user);
}

export const updateUser = async user => {
    await users.findOneAndUpdate({email: user.email}, {firstname: user.firstname, lastname: user.lastname});
}

export const deleteUser = async user => {
    await users.deleteOne({email: user.email});
}