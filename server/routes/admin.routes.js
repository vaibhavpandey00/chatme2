import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from '../controllers/adminController.js';
import { adminLoginValidator, validatorHandler } from '../lib/validator.js';
import { isAdminAuthenticated } from '../middlewares/auth.js';


// express router for admin routes
const router = express.Router();


router.post("/verify", adminLoginValidator(), validatorHandler, adminLogin);

router.get("/logout", adminLogout);

// Only admin can access these routes

router.use(isAdminAuthenticated);

router.get("/", getAdminData);

router.get("/users", allUsers);
router.get("/chats", allChats);
router.get("/messages", allMessages);

router.get("/stats", getDashboardStats);

export default router;