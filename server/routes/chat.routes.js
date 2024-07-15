import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup } from "../controllers/chatController.js";

// express router for user routes
const router = express.Router();

// After login routes in user controllers
router.use(isAuthenticated);

router.post("/new", newGroupChat);

router.get("/my", getMyChats);

router.get("/my/groups", getMyGroups);

router.put("/addmembers", addMembers);

router.put("/removemembers", removeMembers);

router.delete("/leave/:id", leaveGroup);


export default router;