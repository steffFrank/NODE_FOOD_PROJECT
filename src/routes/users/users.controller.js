import { addNewUser } from "../../models/users/users.model.js";
import { validateInput } from "../../utils/functions.utils.js";

export const httpAddNewUser = async (req, res) => {
    const user = validateInput(req.body);

    if (user.error) {
        return res.status(400).json({ error: user.error });
    }

    try {
        await addNewUser(user);
        return res.status(201).json(user);
    } catch(error) {
        return res.status(400).json({error: error.message});
    }
}

