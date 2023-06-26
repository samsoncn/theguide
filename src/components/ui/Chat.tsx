import { useState, FormEvent } from "react";
import { useMutation } from "react-query";
import { fetchResponse } from "../../pages/api/openai/api";
import Login from "./sub-components/Login";
import { PiPaperPlaneRightBold } from "react-icons/pi";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const mutation = useMutation(fetchResponse);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setChatHistory((oldChatHistory) => [
      ...oldChatHistory,
      { sender: "user", message },
    ]);
    mutation.mutate(message, {
      onSuccess: (data: string) => {
        setChatHistory((oldChatHistory) => [
          ...oldChatHistory,
          { sender: "bot", message: data },
        ]);
      },
    });
    setMessage("");
  };

  return (
    <>
      <div className="w-[80%] bg-slate-300">
        {/* Login Button */}
        <Login />
        <ul>
          {chatHistory.map((chat, index) => (
            <li key={index}>
              <strong>{chat.sender}</strong>: {chat.message}
            </li>
          ))}
        </ul>
        {/* Input Section */}
        <div className="absolute bottom-0 flex mx-5 w-max">
          <div className="mb-5 ">
            <form onSubmit={handleSubmit} className="flex flex-row mb-5">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
            <p className="text-[#616161]">
              TheGuides.ai Version 1.0. Our mission is to guide people to learn
              with AI. Your feedback will help us improve!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
