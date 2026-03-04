import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/message";
import chatRoutes from "./routes/chat";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// auth routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/chat', chatRoutes);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`server listening on PORT: ${PORT}`)
})