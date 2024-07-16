import { Chat } from "../models/chatModel.js";
import { deleteFilesFromCloud, emitEvent } from "../utils/features.js";
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js";


// Funtion to create new group chat
// In chat model creator and members reffer to user saved in database
const newGroupChat = async (req, res) => {
    try {

        const { name, members } = req.body;

        console.log(name, members);

        if (members.length < 2) {
            return res.status(400).json({ success: false, message: "Please select at least 3 members" });
        };

        const allMembers = [ req.user, ...members ];

        await Chat.create({
            name,
            groupChat: true,
            creator: req.user,
            members: allMembers
        })

        emitEvent(req, ALERT, allMembers, `Welcome to ${name} Group Chat`);
        emitEvent(req, REFETCH_CHATS, members);

        return res.status(201).json({ success: true, message: "Group Chat created successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMyChats = async (req, res) => {
    try {

        // Fetch all the chats jinke members array me req.user id hai
        const myChats = await Chat.find({ members: req.user }).populate("members", "name avatar");

        const transformedChats = myChats.map((chat) => {

            const otherUser = getOtherMember(chat.members, req.user);

            return {
                _id: chat._id,
                groupChat: chat.groupChat,
                avatar: chat.groupChat ? chat.members.slice(0, 3).map(({ avatar }) => avatar.url) : [ otherUser.avatar.url ],
                name: chat.groupChat ? chat.name : otherUser.name,
                members: chat.members.reduce((prev, curr) => {
                    if (curr._id.toString() !== req.user.toString()) {
                        prev.push(curr._id);
                    }

                    return prev;
                }, []),
            }
        })

        return res.status(200).json({ success: true, Chats: transformedChats });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMyGroups = async (req, res) => {
    try {

        const myGroups = await Chat.find({ members: req.user, creator: req.user, groupChat: true }).populate("members", "name avatar");

        const groups = myGroups.map(({ members, _id, groupChat, name }) => ({
            _id,
            groupChat,
            name,
            avatar: members.slice(0, 3).map(({ avatar }) => avatar.url)
        }));

        return res.status(200).json({ success: true, groups });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addMembers = async (req, res) => {
    try {

        const { chatId, members } = req.body;
        const chat = await Chat.findById(chatId);

        if (!members || members.length < 1) {
            return res.status(400).json({ success: false, message: "Please select at least 1 member" });
        }

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        };

        if (!chat.groupChat) {
            return res.status(400).json({ success: false, message: "This is not a group chat" });
        };

        if (chat.creator.toString() !== req.user.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        const allNewMembersPromise = members.map((member) => User.findById(member, "name"));

        const allNewMembers = await Promise.all(allNewMembersPromise);

        const uniqueMembers = allNewMembers.filter(({ _id }) => !chat.members.includes(_id)).map(({ _id }) => _id);

        chat.members.push(...uniqueMembers);

        if (chat.members.length > 10) {
            return res.status(400).json({ success: false, message: "Group chat cannot have more than 10 members" });
        }

        await chat.save();

        const allUsersName = allNewMembers.map(({ name }) => name).join(", ");

        emitEvent(req, ALERT, chat.members, `${allUsersName} added to Group Chat`);

        emitEvent(req, REFETCH_CHATS, chat.members);

        return res.status(200).json({ success: true, message: "Members added successfully" });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeMembers = async (req, res) => {
    try {

        const { userId, chatId } = req.body;

        const [ chat, usersToRemove ] = await Promise.all([
            Chat.findById(chatId),
            User.findById(userId, "name")
        ]);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        };

        if (!usersToRemove) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!chat.groupChat) {
            return res.status(400).json({ success: false, message: "This is not a group chat" });
        };

        if (chat.creator.toString() !== req.user.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        if (chat.members.length <= 3) {
            return res.status(400).json({ success: false, message: "Group must have at least 3 members" });
        }

        chat.members = chat.members.filter((member) => member.toString() !== userId);

        await chat.save();

        emitEvent(req, ALERT, chat.members, `${usersToRemove.name} has been removed from Group Chat`);

        emitEvent(req, REFETCH_CHATS, chat.members);

        return res.status(200).json({ success: true, message: "Member removed successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const leaveGroup = async (req, res) => {
    try {

        const chatId = req.params.id;

        const chat = await Chat.findById(chatId)

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        };

        if (!chat.groupChat) {
            return res.status(400).json({ success: false, message: "This is not a group chat" });
        };

        const remainingMembers = chat.members.filter((member) => member.toString() !== req.user.toString());

        if (remainingMembers.length < 3) {
            return res.status(400).json({ success: false, message: "Group chat must have at least 3 member" });
        }

        if (chat.creator.toString() === req.user.toString()) {

            const newCreator = remainingMembers[ 0 ];

            chat.creator = newCreator;
        }

        chat.members = remainingMembers;

        const [ user ] = await Promise.all([
            User.findById(req.user, "name"), chat.save() ]);

        emitEvent(req, ALERT, chat.members, `${user.name} has Left the Group Chat`);

        return res.status(200).json({ success: true, message: `Left the Group Chat ${chat.name}` });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const sentAttachment = async (req, res) => {
    try {

        const { chatId } = req.body;

        const [ chat, me ] = await Promise.all([
            Chat.findById(chatId), User.findById(req.user, "name") ]);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        };

        const files = req.files || [];

        if (files.length < 1 || files.length > 5) {
            return res.status(400).json({ success: false, message: "Please select between 1 and 5 files" });
        }

        // Upload to cloudinary
        // const attachments = await Promise.all(files.map(async (file) => {
        //     const attachment = await cloudinaryUpload(file.path);
        //     return attachment;
        // }));

        const attachments = [];

        const messageForRealTime = {
            content: "",
            attachments,
            sender: {
                _id: me._id,
                name: me.name
            },
            chat: chatId
        };

        const messageFroDB = {
            content: "",
            attachments,
            sender: me._id,
            chat: chatId
        };

        const message = await Message.create(messageFroDB);

        emitEvent(req, NEW_ATTACHMENT, chat.members, {
            message: messageForRealTime,
            chat: chatId
        });

        emitEvent(req, NEW_MESSAGE, chat.members, { chat: chatId });

        return res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getChatDetails = async (req, res) => {
    try {

        if (req.query.populate === "true") {

            const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();

            if (!chat) {
                return res.status(404).json({ success: false, message: "Chat not found" });
            }

            chat.members = chat.members.map(({ _id, name, avatar }) => ({
                _id,
                name,
                avatar: avatar.url
            }));

            return res.status(200).json({ success: true, chat });

        } else {

            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ success: false, message: "Chat not found" });
            }

            return res.status(200).json({ success: true, chat });
        }


    } catch (error) {

    }
}

const renameGroup = async (req, res) => {
    try {

        const chatId = req.params.id;
        const { name } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        if (!chat.groupChat) {
            return res.status(400).json({ success: false, message: "This is not a group chat" });
        }

        if (chat.creator.toString() !== req.user.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        chat.name = name;
        await chat.save();

        emitEvent(req, REFETCH_CHATS, chat.members);

        return res.status(200).json({ success: true, message: "Group Chat renamed successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteChat = async (req, res) => {
    try {

        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        };

        const members = chat.members;

        if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this chat" });
        }

        if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this chat" });
        }

        // Here we have to delete all the messages and attachments associated with the chat

        const meesagesWithAttachments = await Message.find({
            chat: chatId,
            attachments: { $exists: true, $ne: [] }
        });

        const public_Ids = [];

        meesagesWithAttachments.forEach(({ attachments }) => {
            attachments.forEach(({ public_id }) => public_Ids.push(public_id));
        });

        await Promise.all([
            // Delete files from cloudinary
            deleteFilesFromCloud(public_Ids),
            // Delete messages
            Message.deleteMany({ chat: chatId }),
            // Delete chat
            Chat.findByIdAndDelete(chatId)
        ]);

        emitEvent(req, REFETCH_CHATS, members);

        return res.status(200).json({ success: true, message: "Chat deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMessages = async (req, res) => {
    try {

        const chatId = req.params.id;
        const { page = 1 } = req.query;

        const resultPerPage = 20;
        const skip = (page - 1) * resultPerPage;

        const [ messages, totalMessages ] = await Promise.all([
            Message.find({ chat: chatId })
                .populate("sender", "name")
                .skip(skip)
                .limit(resultPerPage)
                .sort({ createdAt: -1 })
                .lean(),
            Message.countDocuments({ chat: chatId })
        ]);

        const totalPages = Math.ceil(totalMessages / resultPerPage) || 0;

        return res.status(200).json({ success: true, messages: messages.reverse(), totalPages });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup, sentAttachment, getChatDetails, renameGroup, deleteChat, getMessages }