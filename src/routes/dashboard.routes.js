
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

// Admin dashboard
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

// Staff dashboard (teaching and administrative staff)
dashboardRouter.get(
    "/staff",
    authenticate,
    authorize("staff"),
    (req, res) => {
        res.json({
            message: "Welcome to the staff dashboard"
        });
    }
);

// Student dashboard
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

// Examination Officer dashboard
dashboardRouter.get(
    "/exam-officer",
    authenticate,
    authorize("exam_officer"),
    (req, res) => {
        res.json({
            message: "Welcome to the Examination Officer dashboard"
        });
    }
);

// Controller of Examinations dashboard
dashboardRouter.get(
    "/coe",
    authenticate,
    authorize("coe"),
    (req, res) => {
        res.json({
            message: "Welcome to the COE dashboard"
        });
    }
);

export default dashboardRouter;
