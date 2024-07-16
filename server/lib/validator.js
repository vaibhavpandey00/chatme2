import { body, check, validationResult, } from "express-validator";

const registerValidator = () => [
    body([ "name", "email", "password" ])
        .notEmpty()
        .withMessage("All fields are required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    check("avatar").notEmpty().withMessage("Please upload your avatar"),
]

const loginValidator = () => [
    body([ "email", "password" ])
        .notEmpty()
        .withMessage("All fields are required"),
    body("email").isEmail().withMessage("Invalid email"),
]

const validatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const messages = errors.array().map(({ msg }) => msg);
        const errMsg = messages.join(", ");

        return res.status(400).json({ success: false, message: errMsg });
    }
    next();
};

export { registerValidator, loginValidator, validatorHandler }