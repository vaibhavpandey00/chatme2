import { User } from "../models/userModel.js"




// user register and save to database and save in cookie
const register = async (req, res) => {

    // const avatar = req.body.avatar ? req.body.avatar : "https://www.w3schools.com/howto/img_avatar.png";

    const avatar = {
        public_id: "aevsawe",
        url: "https://www.w3schools.com/howto/img_avatar.png"
    }

    const user = await User.create({

        name: "Jone Doe",
        email: "L0uJt@example.com",
        password: "123456",
        avatar
    });

    res.status(201).json({ message: "user created successfully" });
};


// user login
const login = (req, res) => {
    res.send("Hello user!");
};


export { login, register }