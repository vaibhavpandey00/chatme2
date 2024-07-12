import express from "express";
import { login, register } from "../controllers/userControllers.js";

// express router for user routes
const router = express.Router();

// For login route in user controllers
router.post("/register", register);
router.post("/login", login);

export default router;