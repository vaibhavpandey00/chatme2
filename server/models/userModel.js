import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    bio: String,
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
},
    {
        timestamps: true,
    }
);


// what to do before saving user to database
// check if password is modified
// hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({ _id: this._id.toString(), email: this.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    } catch (error) {
        console.log(error);
    }
};

export const User = mongoose.models.User || model("User", userSchema);