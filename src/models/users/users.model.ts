import users from "./users.schema";
import { IUser } from "./users.schema";

export const addNewUserInDb = async (user: IUser): Promise<IUser> => {
    return await users.create(user);
}

export const updateUserInDb = async (user: IUser): Promise<boolean> => {
    const doc = await users.findOneAndUpdate({ email: user.email }, { firstname: user.firstname, lastname: user.lastname });
    if (doc === null) return false;

    return true;
}

export const deleteUserFromDb = async (email: string): Promise<boolean> => {
    const result = await users.deleteOne({ email });
    if (result.deletedCount === 1) return true;
    return false;
}

export const getAllUsersFromDb = async (): Promise<IUser[]> => {
    return await users.find();
}