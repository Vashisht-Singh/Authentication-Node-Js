import dashboardRouter from "./routes/dashboard.routes.js";
import cors from "cors";
import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import adminRouter from "./routes/admin.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/admin", adminRouter);

export default app;