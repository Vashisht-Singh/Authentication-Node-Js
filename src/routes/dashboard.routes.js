
import { Router } from "express";
import {
    authenticate,
    authorize
} from "../middleware/auth.middleware.js";

const dashboardRouter = Router();

// Any logged-in user
dashboardRouter.get(
    "/me",
    authenticate,
    (req, res) => {
        res.json({
            message: "Your account",
            user: req.user
        });
    }
);

// Admin only
dashboardRouter.get(
    "/admin",
    authenticate,
    authorize("admin"),
    (req, res) => {
        res.json({
            message: "Welcome to the admin dashboard"
        });
    }
);

// Faculty only
dashboardRouter.get(
    "/faculty",
    authenticate,
    authorize("faculty"),
    (req, res) => {
        res.json({
            message: "Welcome to the faculty dashboard"
        });
    }
);

// Student only
dashboardRouter.get(
    "/student",
    authenticate,
    authorize("student"),
    (req, res) => {
        res.json({
            message: "Welcome to the student dashboard"
        });
    }
);

export default dashboardRouter;
