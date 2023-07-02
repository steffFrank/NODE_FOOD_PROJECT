import { getAllProductsFromDb } from "../models/products/products.model.js";
import { getAllUsersFromDb } from "../models/users/users.model.js";
import {
    checkArrayValues,
    removeImageFromPath,
} from "../utils/functions.utils.js";

export const validateRequestBodyInputs = (req, res, next) => {
    // No need to sanitize as we are using mongoose

    const bodyObject = req.body;
    const bodyObjectKeys = Object.keys(bodyObject);

    // Check if every key has a value and return an error response if not
    if (
        bodyObjectKeys.length > 0 &&
        bodyObjectKeys.every((key) => bodyObject[key])
    ) {
        // Check if we are validating products
        if (req.file) {
            const ObjectQuantity = bodyObject.quantity;
            if (ObjectQuantity <= 0 || ObjectQuantity > 10) {
                return res
                    .status(400)
                    .json({ error: "Product quantity not available" });
            }
        }
        return next();
    }

    if (req.file) {
        removeImageFromPath(req.file.destination, req.file.filename);
    }
    return res.status(400).json({ error: "Missing required property" });
};

export const validateRequestBodyArray = async (req, res, next) => {
    const bodyObject = req.body;
    const bodyObjectKeys = Object.keys(bodyObject);

    const productNamesList = (await getAllProductsFromDb()).map(
        (product) => product.name
    );
    const userEmailsList = (await getAllUsersFromDb()).map((user) => user.email);

    // Check for empty object
    if (
        !bodyObjectKeys.length ||
        !bodyObjectKeys.every((key) => bodyObject[key].length > 0)
    ) {
        return res.status(400).json({ error: "Missing required property" });
    }

    // Check for duplicates values in body array
    for (const key of bodyObjectKeys) {
        const keySet = new Set(bodyObject[key]);
        if (keySet.size !== bodyObject[key].length) {
            return res
                .status(400)
                .json({ error: "Duplicate values are not allowed" });
        }
    }

    // Check if the values in the body array exist in the db
    const areValuesFound = bodyObjectKeys.every((key) => {
        if (key === "products") {
            return checkArrayValues(bodyObject[key], productNamesList);
        }
        if (key === "users") {
            return checkArrayValues(bodyObject[key], userEmailsList);
        }
    });

    // Return error message if a value doesn't exist
    if (!areValuesFound)
        return res
            .status(404)
            .json({
                error:"Values not found. A product or User in your lists doesn't exist",
            });

    return next();
};
