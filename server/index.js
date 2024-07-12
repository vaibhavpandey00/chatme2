import express from "express";
import userRoutes from "./routes/user.routes.js";
// require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})