import { Server as HttpServer } from "node:http";
import { Server, Socket } from "socket.io";
import db from "../lib/db.js";
import { users } from "../db/user.schema.js";
import { eq } from "drizzle-orm";
import { JwtConfig } from "../lib/jwt.js";

interface SocketUser {
  id: number;
  email: string;
  name: string;
}

interface ChatMessagePayload {
  id: number;
  from: number;
  to: number;
  message: string;
  file: string | null;
  created_at: Date;
  updated_at: Date;
}

let io: Server | null = null;

const connectedUsers = new Map<number, Set<string>>();

const getCookieValue = (cookieHeader: string | undefined, key: string) => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (name === key) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
};

const getUserRoom = (userId: number) => `user:${userId}`;

const emitOnlineUsers = () => {
  if (!io) {
    return;
  }

  io.emit("presence:online-users", Array.from(connectedUsers.keys()));
};

const addConnectedUser = (userId: number, socketId: string) => {
  const sockets = connectedUsers.get(userId) ?? new Set<string>();
  sockets.add(socketId);
  connectedUsers.set(userId, sockets);
};

const removeConnectedUser = (userId: number, socketId: string) => {
  const sockets = connectedUsers.get(userId);

  if (!sockets) {
    return;
  }

  sockets.delete(socketId);

  if (sockets.size === 0) {
    connectedUsers.delete(userId);
  }
};

const authenticateSocket = async (socket: Socket) => {
  const token = getCookieValue(socket.handshake.headers.cookie, "token");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = JwtConfig.verifyToken(token);
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
    })
    .from(users)
    .where(eq(users.id, decoded.id))
    .limit(1);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
};

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    try {
      const user = await authenticateSocket(socket);
      socket.data.user = user;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user as SocketUser;

    addConnectedUser(user.id, socket.id);
    socket.join(getUserRoom(user.id));
    emitOnlineUsers();

    socket.on("disconnect", () => {
      removeConnectedUser(user.id, socket.id);
      emitOnlineUsers();
    });
  });

  return io;
};

export const emitNewMessage = (message: ChatMessagePayload) => {
  if (!io) {
    return;
  }

  io.to(getUserRoom(message.from)).emit("message:new", message);
  io.to(getUserRoom(message.to)).emit("message:new", message);
};
