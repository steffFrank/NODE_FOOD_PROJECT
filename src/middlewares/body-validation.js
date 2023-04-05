import { removeImageFromPath } from "../utils/functions.utils.js";

// Validate the body inputs before passing it to the next middleware
export const validateInput = (req, res, next) => {
    const bodyObject = req.body;

    // Check if every key has a value and return an error response if not
    if (Object.keys(bodyObject).length > 0 && Object.keys(bodyObject).every(key => bodyObject[key])) {
        // Check if we validating products
        if (req.file) {
            // Validate the quantity of the product
            if (bodyObject.quantity <= 0 || bodyObject.quantity > 10) {
                return res.status(400).json({error: "Product quantity not available"});
            }
        }
        return next();
    }

    if (req.file) {
         // Remove the file from the path
         removeImageFromPath(req.file.destination, req.file.filename);
    }
    return res.status(400).json({error: "Missing required property" });
}


export const validateArrayInput = (req, res, next) => {
    const bodyObject = req.body;
    // Check for empty object
    if (!Object.keys(bodyObject).length || !Object.keys(bodyObject).every(key => bodyObject[key].length > 0)) {
        return res.status(400).json({error: "Missing required property"});
    }

    // Check for duplicates values in arrays
    for (const key of Object.keys(bodyObject)) {
        const keySet = new Set(bodyObject[key]);
        if (keySet.size !== bodyObject[key].length) {
            return res.status(400).json({error: "Duplicate values are not allowed"});
        }
    }
    return next();
}