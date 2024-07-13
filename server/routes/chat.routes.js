import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

// express router for user routes
const router = express.Router();

// After login routes in user controllers
router.use(isAuthenticated);


export default router;