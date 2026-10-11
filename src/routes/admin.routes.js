
import { Router } from "express";
import {
    authenticate,
    authorize
} from "../middleware/auth.middleware.js";
import { createUser,getAllUsers } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post(
    "/users",
    authenticate,
    authorize("admin"),
    createUser
);

adminRouter.get(
    "/users",
    authenticate,
    authorize("admin"),
    getAllUsers
);


export default adminRouter;
