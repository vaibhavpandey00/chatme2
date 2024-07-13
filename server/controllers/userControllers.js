import { User } from "../models/userModel.js"
import bcrypt from "bcrypt";



// user register and save to database and save in cookie
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

            res.status(201).json({ message: "user created successfully" });

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

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (email && password) {

            const userExists = await User.findOne({ email });

            if (!userExists) {
                return res.status(400).json({ message: "User not found" });
            }

            const isPasswordMatch = await bcrypt.compare(password, userExists.password);

            if (userExists && isPasswordMatch && userExists.email === email) {

                const { _id, name, email, bio, avatar } = userExists;

                res.status(201).json({ message: "Login successful", user: { _id, name, email, bio, avatar }, token: await userExists.generateToken() });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { login, register }