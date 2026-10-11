
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const allowedRoles = ["staff", "exam_officer", "coe"];

export async function createUser(req, res) {
    try {
        const { username, email, password, role } = req.body;

        // 1. Validate the input
        if (
            typeof username !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof role !== "string" ||
            !username.trim() ||
            !email.trim() ||
            password.length < 12
        ) {
            return res.status(400).json({
                message:
                    "Username, email, role, and a password of at least 12 characters are required"
            });
        }

        // 2. Only allow approved account roles
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: "Allowed roles: staff, exam_officer, coe"
            });
        }

        // 3. Normalize the values
        const normalizedUsername = username.trim();
        const normalizedEmail = email.trim().toLowerCase();

        // 4. Check for existing accounts
        const existingUser = await userModel.findOne({
            $or: [
                { username: normalizedUsername },
                { email: normalizedEmail }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }

        // 5. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Create the account
        const user = await userModel.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password: hashedPassword,
            role
        });

        // 7. Never return the password or hash
        return res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }

        console.error("Admin create-user error:", error.message);

        return res.status(500).json({
            message: "Unable to create account"
        });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await userModel
            .find()
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Users fetched successfully",
            count: users.length,
            users
        });
    } catch (error) {
        console.error("Get users error:", error.message);

        return res.status(500).json({
            message: "Unable to fetch users"
        });
    }
}
