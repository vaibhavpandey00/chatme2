import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js"
import jwt from "jsonwebtoken";


const cookieOptions = {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    sameSite: "none",
    secure: true
}

const adminLogin = async (req, res) => {
    try {

        const { secretKey } = req.body;

        const adminSecretKey = process.env.ADMIN_SECRET_KEY || "JegwaarPrivateKey";

        const isMatched = secretKey === adminSecretKey;

        if (!isMatched) {
            return res.status(401).json({ success: false, message: "Invalid secret key" });
        }

        const token = jwt.sign({ secretKey }, process.env.JWT_SECRET, { expiresIn: process.env.ADMIN_JWT_EXPIRE });

        return res.status(200).cookie("ChatME_adminToken", token, cookieOptions).json({ success: true, message: "Authenticated successfully, Welcome Admin" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getAdminData = async (req, res) => {
    try {
        return res.status(200).json({
            admin: true
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const adminLogout = async (req, res) => {
    return res.status(200).clearCookie("ChatME_adminToken", { ...cookieOptions, httpOnly: false, maxAge: 0 }).json({ success: true, message: "Logged out successfully" });
}

const allUsers = async (req, res) => {
    try {

        const users = await User.find({});

        const transformUsers = await Promise.all(
            users.map(
                async ({ _id, name, email, avatar }) => {

                    const [ groups, friends ] = await Promise.all([
                        Chat.countDocuments({ members: _id, groupChat: true }),
                        Chat.countDocuments({ members: _id, groupChat: false })
                    ])

                    return {
                        _id,
                        name,
                        email,
                        avatar: avatar.url,
                        groups,
                        friends
                    }
                })
        )

        return res.status(200).json({ success: true, user: transformUsers });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const allChats = async (req, res) => {
    try {

        const chats = await Chat.find({})
            .populate("members", "name avatar")
            .populate("creator", "name avatar");

        const transformChats = await Promise.all(
            chats.map(
                async ({ _id, name, groupChat, creator, members }) => {

                    const totalMessages = await Chat.countDocuments({ chat: _id });

                    return {
                        _id,
                        name,
                        groupChat,
                        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
                        members: members.map(({ _id, name, avatar }) => ({ _id, name, avatar: avatar.url })),
                        creator: creator ? creator.name : "none",
                        totalMembers: members.length,
                        totalMessages
                    }
                })
        )

        return res.status(200).json({ success: true, chats: transformChats });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const allMessages = async (req, res) => {
    try {

        const messages = await Message.find({})
            .populate("sender", "name avatar")
            .populate("chat", "groupChat");

        const transformMessages = messages.map(({ content, attachment, sender, chat, _id, createdAt }) => ({
            _id,
            attachment,
            content,
            createdAt,
            chat: chat._id,
            groupChat: chat.groupChat,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url
            }
        }))

        return res.status(200).json({ success: true, messages: transformMessages });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getDashboardStats = async (req, res) => {
    try {

        const [ groupsCount, usersCount, messagesCount, totalChatsCount ] = await Promise.all([
            Chat.countDocuments({ groupChat: true }),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments()
        ]);

        const today = new Date();

        const last7Days = new Date();

        last7Days.setDate(last7Days.getDate() - 7);

        const last7DaysMessages = await Message.find({
            createdAt: { $gte: last7Days, $lte: today }
        }).select("createdAt");

        const messages = new Array(7).fill(0);

        last7DaysMessages.forEach(message => {

            const indexApprox = (today.getTime - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);

            const index = Math.floor(indexApprox);

            messages[ 6 - index ]++;
        })

        const stats = {
            groupsCount,
            usersCount,
            messagesCount,
            totalChatsCount,
            messagesChart: messages
        }

        return res.status(200).json({ success: true, stats });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { adminLogin, adminLogout, allUsers, allChats, allMessages, getDashboardStats, getAdminData }