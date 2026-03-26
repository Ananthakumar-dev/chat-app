"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMessage } from "@/store/slices/chatSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ChatWindow() {
  const dispatch = useAppDispatch();

  const { activeUser, messages, onlineUserIds, socketConnected } = useAppSelector(
    (state) => state.chat,
  );
  const currentUser = useAppSelector((state) => state.auth.user);

  const [text, setText] = useState("");

  if (!activeUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a conversation
      </div>
    );
  }

  const isActiveUserOnline = onlineUserIds.includes(activeUser.id);

  const handleSend = async () => {
    if (!text.trim() || !activeUser) return;

    const result = await dispatch(
      sendMessage({
        to: activeUser.id,
        message: text,
      }),
    );

    if (sendMessage.fulfilled.match(result)) {
      setText("");
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center border-b pl-4">
        <div className="relative">
          <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed">
            <span className="text-lg font-semibold">
              {activeUser.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="p-4 font-semibold">
          {activeUser.name}
          <p className="text-xs text-muted-foreground">
            {isActiveUserOnline ? "Online" : "Offline"}
            {!socketConnected ? " | reconnecting..." : ""}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.map((msg) => {
          const isMe = msg.from === currentUser?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-1 ${
                  isMe ? "bg-blue-500 text-white" : "bg-muted text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t p-4 flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />

        <Button
          onClick={handleSend}
          variant="default"
          className="cursor-pointer"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
