import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isAlreadyRegistered) {
        return res.status(409).json({
            message: "Username or email already exists"
        });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
        {
            id: user.id
        },
        config.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email
        },
        token
    });
}