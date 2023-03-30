import users from "./users.schema.js";

export const addNewUser = async user => {
    await users.create(user);
}

