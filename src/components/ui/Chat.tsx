import React, { useState } from "react";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import Login from "./sub-components/Login";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<{ type: string; message: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add the user's message to the chat log
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    // Send the user's message to the API
    sendMessage(inputValue);

    // Clear the input field
    setInputValue("");
  };

  // fetching response data from openai model
  const sendMessage = (message: string) => {
    setIsLoading(true);

    // Send a request from /api/chat to our own API route
    axios
      .post(
        "/api/chat",
        { message: message },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        // similar process as user input
        // receiving response from openai to the chat log
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })

      // reset loading data and console.log error message
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-[80%] bg-[#191919]">
        {/* Login Button */}
        <Login />

        <div className="h-[88%] flex flex-col justify-center items-center">
          {/* Conversation */}
          {chatLog.map((message, index) => (
            <div
              className={`text-md text-white font-mono flex mt-4 p-4 rounded-lg w-[80%] shadow-lg shadow-[#000000] hide-scrollbar overflow-y-auto bg-gradient-to-r from-[#0b235a] to-slate-600 ${
                message.type === "bot" &&
                "bg-gradient-to-r from-slate-900 to-[#0d072f] text-slate-100"
              }`}
            >
              {/* Icons */}
              <span className="mr-2 bg-slate-600 p-2 text-white h-full shadow shadow-[#000000]">
                {message.type === "user" ? <FaUserGraduate /> : <BsRobot />}
              </span>
              {/* Chat Message */}
              <div className="h-fit leading-loose" key={index}>
                {message.message}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="h-[12%] flex justify-center items-center">
          <div className="flex flex-col w-full items-center justify-center">
            <form className="w-[75%] relative flex" onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-[100%] rounded-lg bg-[#2e2e2e] p-4 text-gray-300 shadow-lg shadow-[#000000] focus:outline-none"
                placeholder="Type your question here....."
              />
              <button
                type="submit"
                className="absolute right-0 p-4 rounded-lg cursor-pointer"
              >
                <PiPaperPlaneRightBold className="text-slate-200 text-2xl" />
              </button>
            </form>
            <p className="text-[#6d6d6d] font-light mt-4 text-sm text-center">
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
