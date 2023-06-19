const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid access token",
                });
            }
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Required authentication!",
        });
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin")
        return res.status(401).json({
            success: false,
            message: "Require admin role!",
        });
    next();
});

module.exports = {
    verifyAccessToken,
    isAdmin,
};
