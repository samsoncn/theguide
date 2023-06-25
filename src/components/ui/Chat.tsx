// src/components/Chat.tsx
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { fetchGPT3Response } from "@/utils/openai";
import { PiPaperPlaneRightBold } from "react-icons/pi";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

const ChatMessage: React.FC<Message> = ({ role, content }) => {
  return (
    <div className={`p-2 ${role === "user" ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block p-2 rounded ${
          role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are talking to ChatGPT, a large language model trained by OpenAI.",
    },
  ]);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const userMessage: Message = { role: "user", content: message };
    setMessages((prevMessages: Message[]) => [...prevMessages, userMessage]);
    setMessage("");
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      const handleResponse = async () => {
        const assistantMessageContent = await fetchGPT3Response(messages);
        setMessages((prevMessages: Message[]) => [
          ...prevMessages,
          { role: "assistant", content: assistantMessageContent },
        ]);
      };

      handleResponse();
    }
  }, [messages]);

  return (
    <div>
      {messages.map((message, i) => (
        <ChatMessage key={i} role={message.role} content={message.content} />
      ))}
      <div className="absolute bottom-0 flex mx-5 w-max">
        <div className="mb-5 ">
          <form onSubmit={handleSubmit} className="flex flex-row mb-5">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              className="w-full p-2 rounded-lg border-none text-md focus:outline-none"
              placeholder="Type your question here....."
            />
            <button
              type="submit"
              className="bg-[#A530ED] mx-2 px-4 rounded-lg cursor-pointer"
            >
              <PiPaperPlaneRightBold className="text-white text-xl" />
            </button>
          </form>
          <p>
            TheGuides.ai Version 1.0. Our mission is to guide people to learn
            with AI. Your feedback will help us improve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
