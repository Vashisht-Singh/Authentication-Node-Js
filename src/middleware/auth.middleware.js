
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import config from "../config/config.js";

export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

export function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Please authenticate first"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission to access this resource"
            });
        }

        next();
    };
}
