import { getAllProductsFromDb } from "../models/products/products.model";
import { getAllUsersFromDb } from "../models/users/users.model";
import { Request, Response, NextFunction } from "express";
import {
    checkArrayValues,
    removeImageFromPath,
} from "../utils/functions.utils";


export const validateRequestBodyInputs = (req: Request, res: Response, next: NextFunction): Response | void => {
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

type Product = {
    name: string
}

type User = {
    email: string
}

export const validateRequestBodyArray = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const bodyObject = req.body;
    const bodyObjectKeys = Object.keys(bodyObject);

    const productNamesList: string[] = (await getAllProductsFromDb()).map(
        (product: Product) => product.name
    );
    const userEmailsList = (await getAllUsersFromDb()).map((user: User) => user.email);

    // Check for empty object
    if (
        !bodyObjectKeys.length ||
        !bodyObjectKeys.every((key) => bodyObject[key].length > 0)
    ) {
        return res.status(400).json({ error: "Missing required property" });
    }

    // Check for duplicates values in body array
    for (const key of bodyObjectKeys) {
        const keySet: Set<string> = new Set(bodyObject[key]);
        if (keySet.size !== bodyObject[key].length) {
            return res
                .status(400)
                .json({ error: "Duplicate values are not allowed" });
        }
    }

    // Check if the values in the body array exist in the db
    const areValuesFound: boolean = bodyObjectKeys.every((key: string) => {
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
