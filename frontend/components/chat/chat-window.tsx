"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMessage, addMessage } from "@/store/slices/chatSlice";

export default function ChatWindow() {
  const dispatch = useAppDispatch();

  const { activeUser, messages } = useAppSelector((state) => state.chat);
  const currentUser = useAppSelector((state) => state.auth.user);

  const [text, setText] = useState("");

  if (!activeUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a conversation
      </div>
    );
  }

  const handleSend = async () => {
    if (!text.trim() || !activeUser) return;

    const result = await dispatch(
      sendMessage({
        to: activeUser.id,
        message: text,
      }),
    );

    // append message to redux
    dispatch(
      addMessage({
        id: result.payload.id, // backend generated id
        from: result.payload.from, // backend response
        to: activeUser.id,
        message: text,
        created_at: result.payload.created_at, // backend response
        updated_at: result.payload.updated_at, // backend response
      }),
    );

    setText("");
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* header */}
      <div className="border-b p-4 font-semibold">{activeUser.name}</div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.from === currentUser?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-2 rounded max-w-xs ${
                  isMe ? "bg-blue-500 text-white" : "bg-muted text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* input */}
      <div className="border-t p-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded p-2 flex-1"
        />

        <button
          onClick={handleSend}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
