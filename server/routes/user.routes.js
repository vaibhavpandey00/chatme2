import express from "express";
import { login, register } from "../controllers/userControllers.js";
import { singleUpload } from "../middlewares/multer.js";

// express router for user routes
const router = express.Router();

// For login route in user controllers
router.post("/register", singleUpload , register);
router.post("/login", login);

export default router;