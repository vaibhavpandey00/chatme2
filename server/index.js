import express from "express";
import userRoutes from "./routes/user.routes.js";
// import { connDB } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config();

const MongoURI = process.env.MONGO_URI;

// Continue from 5234

const app = express();
app.use(express.json());

// Database Connection and start server
// connDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})