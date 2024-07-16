import express from "express";
import { getMyProfile, login, logout, register, searchUser } from "../controllers/userControllers.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { loginValidator, registerValidator, validatorHandler } from "../lib/validator.js";

// express router for user routes
const router = express.Router();

// For login route in user controllers
router.post("/register", singleUpload, registerValidator(), validatorHandler, register);
router.post("/login", loginValidator(), validatorHandler, login);

// After login routes in user controllers
router.use(isAuthenticated);

router.get("/me", getMyProfile);
router.get("/logout", logout);
router.get("/search", searchUser);


export default router;