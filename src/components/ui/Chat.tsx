import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import Link from "next/link";
import ResponseLoadingAnimation from "./sub-components/ResponseLoadingAnimation";
import Login from "./sub-components/Login";

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  messages: Message[];
}
interface Interaction {
  conversation: Conversation;
  query: string;
}
interface ChatComponentProps {
  currentChatId: string;
  interaction: Interaction;
  setChatLogs: (chatLogs: Record<string, Conversation>) => void;
}

async function sendQueryToFastAPI(query: string) {
  const response = await fetch("/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const data = await response.json();
  return data.response;
}

const Chat: React.FC<ChatComponentProps> = ({
  currentChatId,
  interaction,
  setChatLogs,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const response = await sendQueryToFastAPI(inputValue);
    // do something with the response
    setInputValue("");
  };

  return (
    <>
      <div className="w-[80%] bg-[#191919]">
        <div className="h-[85%] overflow-y-auto flex flex-col justify-center items-center mt-2">
          {interaction.conversation.messages.map((message, index) => (
            <div
              key={index}
              className={`text-base text-white flex items-center mb-4 p-4 rounded-lg w-[80%] shadow-lg shadow-[#000000] hide-scrollbar bg-gradient-to-r from-[#0b235a] to-slate-600 ${
                message.role === "bot" &&
                "bg-gradient-to-r from-slate-900 to-[#0d072f] text-slate-100"
              }`}
            >
              <span className="mr-4 rounded-2xl bg-slate-600 h-fit p-2 text-white shadow shadow-[#000000]">
                {message.role === "user" ? <FaUserGraduate /> : <BsRobot />}
              </span>
              <div className="" key={index}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="h-[12%] z-[50] flex items-center bg-transparent border-transparent">
          <div className="flex flex-col w-full items-center">
            <form className="w-[75%] relative flex" onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-[100%] rounded-lg bg-[#2e2e2e] p-3 text-base text-gray-300 shadow-lg shadow-[#000000] focus:outline-none"
                placeholder="Type your question here....."
              />
              <button
                type="submit"
                className="absolute right-0 p-3 rounded-lg cursor-pointer"
              >
                <PiPaperPlaneRightBold className="text-slate-200 text-xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
