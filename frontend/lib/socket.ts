"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => socket;

export const connectSocket = () => {
  if (socket?.connected) {
    return socket;
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    return socket;
  }

  socket.connect();
  return socket;
};

export const disconnectSocket = () => {
  if (!socket) {
    return;
  }

  socket.disconnect();
  socket = null;
};
