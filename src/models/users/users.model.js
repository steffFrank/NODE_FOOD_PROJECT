import users from "./users.schema.js";

export const addNewUserInDb = async user => {
    await users.create(user);
}

export const updateUserInDb = async user => {
    const doc = await users.findOneAndUpdate({ email: user.email }, { firstname: user.firstname, lastname: user.lastname });
    if (doc === null) return false;

    return true;
}

export const deleteUserFromDb = async email => {
    const result = await users.deleteOne({ email });
    if (result.deletedCount === 1) return true;
    return false;
}

export const getAllUsersFromDb = async () => {
    return await users.find();
}