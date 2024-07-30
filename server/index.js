import express from "express";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { connDB } from "./utils/features.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_USER } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/messageModel.js";
// import { createUser } from "./seeders/user.js";

dotenv.config();
const MongoURI = process.env.MONGO_URI;
const userSocketIDs = new Map();

// Continue from 34500 Get Messages might face error
// 50500 getMyFriends might face error
// Skiped from 60000 Error handling
// 62700 Starting work with Socket.io
// 2nd Part Completed with Socket.io

const app = express();
const sever = createServer(app);
const io = new Server(sever, {});

// Using Middleware here to parse json and cookie parser
app.use(express.json());
app.use(cookieParser());

// Database Connection and start server
connDB(MongoURI);

const PORT = process.env.PORT || 3000;

// Create Fake Users using faker and seeders
// createUser(10);

// Routes 
app.use("/api", userRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
})

io.use((socket, next) => { });

io.on("connection", (socket) => {

    const user = {
        _id: "dfbdr",
        name: "Jone Doe",
    }

    userSocketIDs.set(user._id.toString(), socket.id);

    console.log(userSocketIDs);

    socket.on(NEW_MESSAGE_USER, async ({ chatId, members, message }) => {

        const messageFroRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chatId,
            createdAt: new Date().toISOString()
        }

        const messageFroDB = {
            content: message,
            sender: user._id,
            chatId
        }

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE_USER, {
            chatId,
            message: messageFroRealTime
        })
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId
        })

        try {
            await Message.create(messageFroDB);
        } catch (error) {
            console.log(error);
        }

        // console.log("New Message", messageFroRealTime);
    })

    socket.on("disconnect", () => {
        userSocketIDs.delete(user._id.toString());
        console.log("User Disconnected", socket.id);
    })
})

sever.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

export { userSocketIDs }