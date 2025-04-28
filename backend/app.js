import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

connectToDB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

export default app;