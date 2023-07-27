import React, { useState } from "react";
import Subject from "./sub-components/Subject";
import ChatHistory from "./sub-components/ChatHistory";
import Footer from "./sub-components/Footer";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";

// Define the props for the Sidebar component
interface SidebarProps {
  onNewChat: () => void;
  chatLogs: Record<string, ChatLog>;
  setCurrentChatId: (id: string) => void;
}

// Define the type for the chat log
interface ChatLog {
  id: string;
  messages: { role: string; content: string }[];
}

const TestingSidebar: React.FC<SidebarProps> = ({
  onNewChat,
  chatLogs,
  setCurrentChatId,
}) => {
  // State variable to track the selected option
  const [selectedOption, setSelectedOption] = useState("1");

  // Event handler for the radio button change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.id);
  };

  // Collapsable component of the sidebar for medium and small screens
  const [isOpen, setIsOpen] = useState(false);
  // const toggleSidebar = () => setIsOpen(!isOpen);

  // State variable to track the selected subject
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <>
      <button
        className="absolute w-10 h-10 text-2xl m-2 text-slate-200 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BsReverseLayoutSidebarInsetReverse />
      </button>
      <div
        className={`${
          isOpen ? "w-[80%]" : "w-0"
        } lg:w-[30%] h-screen bg-[#282828] overflow-hidden lg:overflow-visible`}
      >
        <h1 className="text-4xl font-extrabold text-center pt-10 pb-5 text-slate-200" style={{ textShadow: "3px 3px 6px #000000" }}>
          TheGuides
        </h1>
        <div className="mx-5 rounded-xl h-[75%]">
          <div
            className="grid grid-cols-2 space-x-2 rounded-xl shadow-md shadow-black bg-[#ffffff]  p-2"
            x-data="app"
          >
            <div>
              <input
                type="radio"
                name="option"
                id="1"
                className="peer hidden"
                checked={selectedOption === "1"}
                onChange={handleChange}
              />
              <label
                htmlFor="1"
                className="block cursor-pointer select-none rounded-xl p-2 text-center text-slate-800
                hover:bg-slate-300 hover:shadow-md hover:shadow-gray-400 peer-checked:shadow-md peer-checked:shadow-[#373737] peer-checked:bg-slate-800 peer-checked:font-bold peer-checked:text-gray-100 transition-all duration-200"
              >
                Subject
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="2"
                className="peer hidden"
                checked={selectedOption === "2"}
                onChange={handleChange}
              />
              <label
                htmlFor="2"
                className="block cursor-pointer select-none rounded-xl p-2 text-center text-slate-800
                hover:bg-slate-300 hover:shadow-md hover:shadow-gray-400 peer-checked:shadow-md peer-checked:shadow-[#373737] peer-checked:bg-slate-800 peer-checked:font-bold peer-checked:text-gray-100 transition-all duration-200"
              >
                History
              </label>
            </div>
          </div>
          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="text-white flex my-4 border-2 rounded-lg p-2 justify-center items-center text-center w-full  shadow-md shadow-black hover:shadow-lg hover:shadow-black"
          >
            <BiSolidMessageSquareAdd className="mr-2" />
            New Chat
          </button>
          {/* Subject */}
          {selectedOption === "1" && <Subject />}
          {/* History */}
          {selectedOption === "2" && (
            <ChatHistory
              chatLogs={chatLogs}
              setCurrentChatId={setCurrentChatId}
              // selectedSubject={selectedSubject}
            />
          )}
        </div>
        {/* Ignored footer in prototype */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default TestingSidebar;