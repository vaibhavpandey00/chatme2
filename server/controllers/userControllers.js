import { User } from "../models/userModel.js"
import bcrypt from "bcrypt";
import { sendToken } from "../utils/features.js";



// user register and save to database and save token in cookie
const register = async (req, res) => {

    // const avatar = req.body.avatar ? req.body.avatar : "https://www.w3schools.com/howto/img_avatar.png";

    try {

        const { name, email, password, bio } = req.body;

        // console.log(req.body);

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
            return res.status(400).json({ message: "All fields are required" });
        }

        if (email && password) {

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(400).json({ message: "User not found" });
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
                return res.status(400).json({ message: "Invalid credentials" });
            }

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
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

        return res.status(200).json({ success: true, message: name })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export { login, register, getMyProfile, logout, searchUser }