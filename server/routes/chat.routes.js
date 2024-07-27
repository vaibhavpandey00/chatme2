import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup, sentAttachment, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chatController.js";
import { attachmentMulter } from "../middlewares/multer.js";
import { addMembersValidator, getChatDetailsValidator, getMessagesValidator, leaveGroupValidator, newGroupValidator, removeMembersValidator, renameGroupValidator, sendAttachmentValidator, validatorHandler } from "../lib/validator.js";

// express router for user routes
const router = express.Router();

// After login routes in user controllers
router.use(isAuthenticated);

router.post("/new", newGroupValidator(), validatorHandler, newGroupChat);

router.get("/my", getMyChats);

router.get("/my/groups", getMyGroups);

router.put("/addmembers", addMembersValidator(), validatorHandler, addMembers);

router.put("/removemembers", removeMembersValidator(), validatorHandler, removeMembers);

router.delete("/leave/:id", leaveGroupValidator(), validatorHandler, leaveGroup);

// Send Attachment route

router.post("/message", attachmentMulter, sendAttachmentValidator(), validatorHandler, sentAttachment);

// Get Messages

router.get("messages/:id", getMessagesValidator(), validatorHandler, getMessages);

// Get Chat details, rename, delete chat

router.route("/:id").get( getChatDetailsValidator(), validatorHandler,getChatDetails).put(renameGroupValidator(),validatorHandler,renameGroup).delete(deleteChat);


export default router;