import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {

    // console.log(req.cookies["ChatME_token"]);

    const token = req.cookies[ "ChatME_token" ];

    if (!token) {
        return res.status(401).json({ message: "Please login to access this resource" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    req.user = decoded._id;


    next();
}

export { isAuthenticated }