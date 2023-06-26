import React, { useState } from "react";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import Login from "./sub-components/Login";
import axios from "axios";

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
      <div className="w-[80%] bg-slate-300">
        {/* Login Button */}
        <Login />
        {chatLog.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))}

        {/* Input Section */}
        <div className="absolute bottom-0 flex mx-5 w-max">
          <div className="mb-5 ">
            <form onSubmit={handleSubmit} className="flex flex-row mb-5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
    </>
  );
};

export default Chat;
