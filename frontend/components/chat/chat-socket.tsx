"use client";

import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  receiveSocketMessage,
  setOnlineUsers,
  setSocketConnected,
} from "@/store/slices/chatSlice";
import { Message } from "@/types/chat";

export default function ChatSocket() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setSocketConnected(false));
      dispatch(setOnlineUsers([]));
      disconnectSocket();
      return;
    }

    const socket = connectSocket();

    const handleConnect = () => {
      dispatch(setSocketConnected(true));
    };

    const handleDisconnect = () => {
      dispatch(setSocketConnected(false));
    };

    const handleOnlineUsers = (userIds: number[]) => {
      dispatch(setOnlineUsers(userIds));
    };

    const handleNewMessage = (message: Message) => {
      dispatch(receiveSocketMessage(message));
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("presence:online-users", handleOnlineUsers);
    socket.on("message:new", handleNewMessage);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("presence:online-users", handleOnlineUsers);
      socket.off("message:new", handleNewMessage);
      dispatch(setSocketConnected(false));
      disconnectSocket();
    };
  }, [dispatch, isAuthenticated]);

  return null;
}
