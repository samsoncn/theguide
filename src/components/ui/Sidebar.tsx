import React, { useState } from "react";
import Subject from "./sub-components/Subject";
import ChatHistory from "./sub-components/ChatHistory";
import Footer from "./sub-components/Footer";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState("1");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.id);
  };

  return (
    <>
      <div className="w-[20%] h-screen bg-[#282828] overflow-hidden">
        <h1 className="text-4xl font-extrabold text-center py-10 underline text-slate-200">
          TheGuides
        </h1>

        <div className="mx-5 rounded-xl h-[75%]">
          <div
            className="grid grid-cols-2 space-x-2 rounded-xl bg-[#ffffff] shadow-inner shadow-black p-2"
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
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:shadow-inner peer-checked:shadow-[#9f9f9f] peer-checked:bg-black peer-checked:font-bold peer-checked:text-gray-100"
              >
                <Subject />
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
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:shadow-inner peer-checked:shadow-[#9f9f9f] peer-checked:bg-black peer-checked:font-bold peer-checked:text-gray-100"
              >
                <ChatHistory />
              </label>
            </div>
          </div>

          {/* New Chat Button */}
          <button className="text-white flex my-2 border-2 rounded-lg p-2 justify-center items-center text-center w-full hover:shadow-lg hover:shadow-black">
            <BiSolidMessageSquareAdd className="mr-1" />
            New Chat
          </button>

          {/* For things inside the sidebar pane */}
          <div className="h-[75%] overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <p className="text-white flex my-2 p-2 justify-center items-center text-center w-full hover:bg-slate-400 hover:text-black">
                Past Chat
              </p>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Sidebar;
