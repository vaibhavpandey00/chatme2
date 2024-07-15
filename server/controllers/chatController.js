import { Chat } from "../models/chatModel.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/userModel.js";


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

export { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup }