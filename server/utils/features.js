import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 4 * 60 * 60 * 24 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true
}

const connDB = async (uri) => {

    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected: ", conn.connection.host);

    } catch (error) {
        console.log(`MongDb Error: ${error.message}`);
        process.exit(0);
    }
}


const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    return res.status(code).cookie("ChatME_token", token, cookieOptions).json({
        success: true,
        message
    })
}

// Test function to send token
// sendToken("ChatME_token", "token", cookieOptions, "Login successful");

const emitEvent = (req, event, users, data) => {
    console.log("emitEvent", event, users, data);
}

const deleteFilesFromCloud = async (public_ids) => {
    // Upload files to cloudinary
    console.log("deleteFilesFromCloud", public_ids);
}

export { connDB, sendToken, emitEvent, deleteFilesFromCloud };

// mongoose.connection.on("error", (err) => {
//     console.log(err);
// });