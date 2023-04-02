import { removeImageFromPath } from "../utils/functions.utils.js";

// Validate the body inputs before passing it to the next middleware
export const validateInput = (req, res, next) => {
    const bodyObject = req.body;

    // Check if every key has a value and return an error response if not
    if (!Object.keys(bodyObject).every(key => (bodyObject[key])) || Object.keys(bodyObject).length) {

        // Check if there was a file in the request and remove it
        if (req.file) {
            // Remove the file from the path
            removeImageFromPath(req.file.destination, req.file.filename);

            // Validate the quantity of the product
            if (bodyObject.quantity <= 0 || bodyObject.quantity > 10) {
                return res.status(400).json({error: "Product quantity not available"});
            }
        }
        return res.status(400).json({error: "Missing required property" });
    }
    next();
}