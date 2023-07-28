import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import ResponseLoadingAnimation from "./sub-components/ResponseLoadingAnimation";
import axios from "axios";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import Login from "./sub-components/Login";
interface Message {
  role: string;
  content: string;
}

interface ChatLog {
  id: string;
  messages: Message[];
}
interface Interaction {
  conversation: ChatLog;
  query: string;
}
// Define the properties that this component should receive
interface ChatProps {
  currentChatId: string;
  setChatLogs: (chatLogs: Record<string, ChatLog>) => void;
  chatLogs: Record<string, ChatLog>;
}

const TestingChat: React.FC<ChatProps> = ({
  currentChatId,
  setChatLogs,
  chatLogs,
}) => {
  // State for input field value
  const [inputValue, setInputValue] = useState("");
  // State for loading state, to show or hide the loading spinner
  const [isLoading, setIsLoading] = useState(false);
  // State to determine when to send a message
  const [shouldSendMessage, setShouldSendMessage] = useState(false);

  // Get the current chat log from the array of chat logs
  const currentChatLog = chatLogs[currentChatId];

  // If the current chat log is not found, log an error and do not render the component
  if (!currentChatLog) {
    console.error("Invalid chat ID");
    return null;
  }
  // Function to handle the submission of the form (when the user sends a message)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Log the input value
    // console.log(`Input value: ${inputValue}`);
    if (inputValue !== "") {
      const newMessage: Message = { role: "user", content: inputValue };
      // console.log(`newMessage: ${newMessage}`); // Log the
      const newChatLog: ChatLog = {
        ...currentChatLog,
        messages: [...currentChatLog.messages, newMessage],
      };

      // Update the chat logs state
      setChatLogs({
        ...chatLogs,
        [currentChatId]: newChatLog,
      });

      // Set shouldSendMessage to true to trigger the useEffect above
      setShouldSendMessage(true);
      // issue: AI model is not reading the user input
      // reason: because we reset the input value before sending it to the server (fixed)

      // setInputValue("");
    }
  };

  // send a message to the server
  const sendMessage = (message: string) => {
    // console.log(`Sending the following input to the server: ${message}`);

    // Show the loading spinner
    setIsLoading(true);
    // Create an instance of the Interaction class
    const interaction: Interaction = {
      conversation: {
        messages: currentChatLog.messages,
        id: "",
      },
      query: message,
    };
    // Send a POST request to the server
    try {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://theguidesai.vercel.app";

      let result = axios
        .post(`${baseUrl}/api/app/conversation`, interaction, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          // Add the bot's response to the chat log
          const newMessage: Message = {
            role: "bot",
            content: response.data.response,
          };
          // console.log("1" + response.data.response);
          // console.log(
          //   "newMessage.content :::" +
          //     JSON.stringify(newMessage.content, null, 2).replace(/\\n/g, "\n")
          // );

          const newChatLog: ChatLog = {
            ...currentChatLog,
            messages: [...currentChatLog.messages, newMessage],
          };

          // Update the chat logs state
          setChatLogs({
            ...chatLogs,
            [currentChatId]: newChatLog,
          });
          // Set loading state to false to hide the loading spinner
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (shouldSendMessage) {
      // console.log(inputValue);
      sendMessage(inputValue);
      setShouldSendMessage(false);
      // solution: reset input bar here
      setInputValue("");
    }
  }, [shouldSendMessage, inputValue]);

  return (
    <>
      <div className="w-full bg-[#191919]">
        <Login />
        <div className="h-[85%] overflow-y-auto mt-5">
          <div className="mt-50 overflow-auto flex flex-col justify-center items-center">
            {currentChatLog.messages.map((message, index) => (
              <div
                key={index}
                className={`text-base text-white flex items-center mb-4 p-4 rounded-lg w-[80%] shadow-lg shadow-[#000000] hide-scrollbar ${
                  message.role === "bot" && "bg-slate-800 text-slate-100 pr-10"
                } ${
                  message.role === "user" &&
                  "bg-[#1e1e1e] border border-green-700 pr-10"
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
            {isLoading && (
              <div
                key={currentChatLog.messages.length}
                className="flex justify-start "
              >
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm ">
                  <ResponseLoadingAnimation />
                </div>
              </div>
            )}{" "}
          </div>
        </div>
        <div className="h-[10%] z-[50] flex items-center bg-transparent border-transparent">
          <div className="flex flex-col w-full items-center mb-4">
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
            {/* <Link href="/api/python">
              <code className="font-mono font-bold">api/index.py</code>
            </Link> */}
            <p className="text-[#6d6d6d] w-[75%] font-light mt-3 text-sm text-center">
              theguides.ai Version 1.0. Our mission is to guide people to learn
              with AI. Your feedback will help us improve!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestingChat;
