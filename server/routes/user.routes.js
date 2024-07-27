import express from "express";
import { acceptRequest, getMyFriends, getMyProfile, getNotifications, login, logout, register, searchUser, sendRequest } from "../controllers/userControllers.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validatorHandler } from "../lib/validator.js";

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

router.put("/sendrequest", sendRequestValidator(), validatorHandler, sendRequest);

router.put("/acceptrequest", acceptRequestValidator(), validatorHandler, acceptRequest);

router.get("/notifications", getNotifications);

router.get("/friends", getMyFriends);


export default router;