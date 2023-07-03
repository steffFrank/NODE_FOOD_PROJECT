import { Request, Response } from "express";
import { IUser } from "../../models/users/users.schema";
import { addNewUserInDb, deleteUserFromDb, updateUserInDb } from "../../models/users/users.model";

export const httpAddNewUser = async (req: Request, res: Response): Promise<Response> => {

    const user: IUser = req.body;

    try {
        await addNewUserInDb(user);
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

export const httpUpdateUser = async (req: Request, res: Response): Promise<Response> => {

    const user: IUser = req.body;

    try {
        const result = await updateUserInDb(user);
        if (result) {
            return res.status(200).json({ message: "User updated successfully" });
        } else {
            return res.status(404).json({ error: `${user.email} doesn't exist in the db` });
        }
    } catch (error: any) {
        return res.status(400).json({ error: "An error occured updating the user" })
    }
}

export const httpDeleteUser = async (req: Request, res: Response): Promise<Response> => {

    const user: IUser = req.body;
    
    try {
        const result = await deleteUserFromDb(user.email);
        if (result) {
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({ error: `${user.email} doesn't exist in the db` });
        }
    } catch (error: any) {
        return res.status(400).json({ error: "An error occured deleting the user" });
    }
}
