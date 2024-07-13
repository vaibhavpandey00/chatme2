import express from "express";
import { getMyProfile, login, logout, register, searchUser } from "../controllers/userControllers.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

// express router for user routes
const router = express.Router();

// For login route in user controllers
router.post("/register", singleUpload, register);
router.post("/login", login);

// After login routes in user controllers
router.use(isAuthenticated);

router.get("/me", getMyProfile);
router.get("/logout", logout);
router.get("/search", searchUser);


export default router;