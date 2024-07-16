import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup, sentAttachment, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chatController.js";
import { attachmentMulter } from "../middlewares/multer.js";

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

// Send Attachment route

router.post("/message", attachmentMulter, sentAttachment);

// Get Messages

router.get("messages/:id", getMessages);

// Get Chat details, rename, delete chat

router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);


export default router;