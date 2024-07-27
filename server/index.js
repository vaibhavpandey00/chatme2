import express from "express";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { connDB } from "./utils/features.js";
// import { createUser } from "./seeders/user.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const MongoURI = process.env.MONGO_URI;

// Continue from 34500 Get Messages might face error
// Continue from 51000

const app = express();

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

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})