import { User } from "../models/userModel.js"
import bcrypt from "bcrypt";
import { emitEvent, sendToken } from "../utils/features.js";
import { Chat } from "../models/chatModel.js";
import { Request } from "../models/requestModel.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";


// user register and save to database and save token in cookie
const register = async (req, res) => {

    // const avatar = req.body.avatar ? req.body.avatar : "https://www.w3schools.com/howto/img_avatar.png";

    try {

        const { name, email, password, bio } = req.body;

        const userFile = req.file;
        // console.log(req.body);

        if (!userFile) {
            return res.status(400).json({ success: false, message: "Avatar is required" });
        }

        if (name && email && password) {

            console.log(`name: ${name}, email: ${email}, password: ${password}, bio: ${bio}`);

            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const setBio = bio ? bio : "Hello, I am using ChatMe";

            const avatar = {
                public_id: "aevsawe",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            }

            const user = await User.create({
                name,
                email,
                password,
                bio: setBio,
                avatar
            });

            // res.status(201).json({ message: "user created successfully" });

            sendToken(res, user, 201, "User created successfully");

        } else {
            return res.status(400).json({ message: "All fields are required" });
        }

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// user login
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log(`email: ${email}, password: ${password}`);

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (email && password) {

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(400).json({ success: false, message: "User not found" });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (user && isPasswordMatch && user.email === email) {

                // We can also destructure user here
                // const { _id, name, email, bio, avatar } = user;

                // 1st method
                // res.status(201).json({ message: "Login successful", user: { _id, name, email, bio, avatar } });
                // we can also send token in cookie
                // token: await user.generateToken()

                // 2nd method
                sendToken(res, user, 200, `Welcome Back, ${user.name}`);
            } else {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user);
        res.status(200).json({ message: "Profile retrieved successfully", success: true, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = (req, res) => {

    return res.status(200).clearCookie("ChatME_token").json({ success: true, message: "Logged out successfully" });
}

const searchUser = async (req, res) => {

    try {
        const { name } = req.query;

        // Finding all my chats
        const myChat = await Chat.find({ groupChat: false, members: req.user });

        // Extracting all users from my chat means peoples i have chated with
        const allUsersFromMyChat = myChat.map((chat) => chat.members).flat();

        // Finding all users except me and friends
        const allUsersExceptMeAndFriends = await User.find({
            _id: { $nin: allUsersFromMyChat },
            name: { $regex: name, $options: "i" }
        });

        const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({ _id, name, avatar: avatar.url }));

        return res.status(200).json({ success: true, myChat })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const sendRequest = async (req, res) => {
    try {

        const { userId } = req.body;

        const request = await Request.findOne({
            $or: [ { sender: req.user, receiver: userId }, { sender: userId, receiver: req.user } ]
        });

        if (request) {
            return res.status(400).json({ success: false, message: "Request already sent" });
        }

        await Request.create({ sender: req.user, receiver: userId });

        emitEvent(req, NEW_REQUEST, [ userId ], "Request sent successfully");

        return res.status(200).json({ success: true, message: "Friend request sent" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const acceptRequest = async (req, res) => {
    try {

        const { requestId, accept } = req.body;

        const request = await Request.findById(requestId).populate("sender", "name").populate("receiver", "name ");

        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        if (request.receiver._id.toString() !== req.user.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        if (!accept) {
            await request.deleteOne();

            return res.status(200).json({ success: true, message: "Friend request rejected" });
        }

        const members = [ request.sender._id, request.receiver._id ];

        await Promise.all([
            Chat.create({ groupChat: false, members, name: `${request.sender.name}-${request.receiver.name}` }), request.deleteOne() ]);

        emitEvent(req, REFETCH_CHATS, members, "Chat created successfully");

        return res.status(200).json({ success: true, message: "Friend request accepted", senderId: request.sender._id });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getNotifications = async (req, res) => {
    try {

        const request = await Request.find({ receiver: req.user }).populate("sender", "name avatar");

        const allRequests = request.map(({ sender, _id }) => ({
            _id,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url
            }
        }));

        return res.status(200).json({ success: true, allRequests });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMyFriends = async (req, res) => {
    try {

        const chatId = req.query.chatId;

        const chats = await Chat.find({
            members: req.user,
            groupChat: false
        }).populate("members", "name avatar");

        const friends = chats.map(({ members }) => {
            const otherUser = getOtherMember(members, req.user);
            return {
                _id: otherUser._id,
                name: otherUser.name,
                avatar: otherUser.avatar.url
            }
        });

        if (chatId) {

            const chat = await Chat.findById(chatId);

            // Filtering out the friends who are not in the chat
            // This is throwing error error (cannot read property of null 'reading members')


            const availableFriends = friends.filter((friend) => !chat.members.includes(friend._id));

            return res.status(200).json({ success: true, friends: availableFriends });

        } else {

            return res.status(200).json({ success: true, friends });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



export { login, register, getMyProfile, logout, searchUser, sendRequest, acceptRequest, getNotifications, getMyFriends }