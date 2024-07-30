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

const isAdminAuthenticated = async (req, res, next) => {

    // console.log(req.cookies["ChatME_token"]);

    const token = req.cookies[ "ChatME_adminToken" ];

    // console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Only Admins can access this resource" });
    }

    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const adminSecretKey = process.env.ADMIN_SECRET_KEY || "JegwaarPrivateKey";

    const isMatched = secretKey.secretKey === adminSecretKey;

    // console.log(isMatched);
    // console.log(secretKey.secretKey);
    // console.log(adminSecretKey);

    if (!isMatched) {
        return res.status(401).json({ success: false, message: "Invalid secret key" });
    }

    next();
}

export { isAuthenticated, isAdminAuthenticated }