import { addNewUserInDb, deleteUserFromDb, updateUserInDb } from "../../models/users/users.model.js";

export const httpAddNewUser = async (req, res) => {

    const user = req.body;

    try {
        await addNewUserInDb(user);
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const httpUpdateUser = async (req, res) => {

    const user = req.body;

    try {
        const result = await updateUserInDb(user);
        if (result) {
            return res.status(200).json({ message: "User updated successfully" });
        } else {
            return res.status(404).json({ error: `${user.email} doesn't exist in the db` });
        }
    } catch (error) {
        return res.status(400).json({ error: "An error occured updating the user" })
    }
}

export const httpDeleteUser = async (req, res) => {

    const user = req.body;
    
    try {
        const result = await deleteUserFromDb(user.email);
        if (result) {
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({ error: `${user.email} doesn't exist in the db` });
        }
    } catch (error) {
        return res.status(400).json({ error: "An error occured deleting the user" });
    }
}
