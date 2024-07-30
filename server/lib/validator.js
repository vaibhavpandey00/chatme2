import { body, check, validationResult, param, query } from "express-validator";


const validatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const messages = errors.array().map(({ msg }) => msg);
        const errMsg = messages.join(", ");

        return res.status(400).json({ success: false, message: errMsg });
    }
    next();
};

const registerValidator = () => [
    body([ "name", "email", "password" ])
        .notEmpty()
        .withMessage("All fields are required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
]

const loginValidator = () => [
    body([ "email", "password" ])
        .notEmpty()
        .withMessage("All fields are required"),
    body("email").isEmail().withMessage("Invalid email"),
]

const newGroupValidator = () => [
    body("name", "Please enter group name").notEmpty(),
    body("members").notEmpty().withMessage("Please select members").isArray({ min: 2 }).withMessage("Please select at least 2 members"),
]

const addMembersValidator = () => [
    body("chatId", "Please enter Chat ID").notEmpty(),
    body("members").notEmpty().withMessage("Please enter members").isArray({ min: 1 }).withMessage("Please select at least 1-97 member"),
]

const removeMembersValidator = () => [
    body("chatId", "Please enter Chat ID").notEmpty(),
    body("userId").notEmpty().withMessage("Please enter User ID"),
]

const leaveGroupValidator = () => [
    param("id", "Please enter Chat ID").notEmpty(),
]

const sendAttachmentValidator = () => [
    body("chatId", "Please enter Chat ID").notEmpty()
]

const getMessagesValidator = () => [
    param("id").notEmpty().withMessage("Please enter Chat ID"),
]

const getChatDetailsValidator = () => [
    param("id").notEmpty().withMessage("Please enter Chat ID"),
]

const renameGroupValidator = () => [
    param("id").notEmpty().withMessage("Please enter Chat ID"),
    body("name", "Please enter new group name").notEmpty(),
]

const sendRequestValidator = () => [
    body("userId", "Please enter User ID").notEmpty(),
]

const acceptRequestValidator = () => [
    body("requestId", "Please enter Request ID").notEmpty(),
    body("accept").notEmpty().withMessage("Please Add Accept").isBoolean().withMessage("Accept must be boolean"),
]

const adminLoginValidator = () => [
    body("secretKey", "Please enter the Admin Key").notEmpty(),
]

export { registerValidator, loginValidator, validatorHandler, newGroupValidator, addMembersValidator, removeMembersValidator, leaveGroupValidator, sendAttachmentValidator, getMessagesValidator, getChatDetailsValidator, renameGroupValidator, sendRequestValidator, acceptRequestValidator, adminLoginValidator }