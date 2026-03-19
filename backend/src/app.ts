import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve static files
app.use(express.static('public'));

// routes
// auth routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);

const PORT: number = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT}`);
});
