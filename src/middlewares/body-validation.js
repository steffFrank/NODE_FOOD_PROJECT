// Validate the body inputs before passing it to the next middleware
export const validateInput = (req, res, next) => {
    console.log(req.body);
    if (!Object.keys(bodyObject).every(key => (bodyObject[key]))) {
        return res.status(400).json({error: "Missing required property" });
    }
    next();
}