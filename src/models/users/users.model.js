import users from "./users.schema.js";

export const addNewUser = async user => {
    await users.create(user);
}

export const updateUser = async user => {
    await users.findOneAndUpdate({email: user.email}, {firstname: user.firstname, lastname: user.lastname});
}

export const deleteUser = async email => {
    const result = await users.deleteOne({email});
    console.log(result.deletedCount);
    if (result.deletedCount === 1) return true;
    return false;
}

