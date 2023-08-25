import React, { useState } from "react";
import Subject from "./sub-components/Subject";
import ChatHistory from "./sub-components/ChatHistory";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";

interface ChatLog {
  id: string;
  messages: { role: string; content: string }[];
  subject: string;
}

interface SidebarProps {
  onNewChat: () => void;
  setCurrentChatId: (id: string) => void;
}

const TestingSidebar: React.FC<SidebarProps> = ({
  onNewChat,
  setCurrentChatId,
}) => {
  const [selectedOption, setSelectedOption] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<null | string>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.id);
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "w-[80%]" : "w-0"
        } lg:w-[30%] h-screen bg-[#2b2b2b] overflow-hidden lg:overflow-auto`}
      >
        <button
          className="absolute w-10 h-10 text-2xl m-2 text-slate-200 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BsReverseLayoutSidebarInsetReverse />
        </button>
        <h1
          className="text-4xl font-extrabold text-center pt-5 pb-5 text-slate-200"
          style={{ textShadow: "3px 3px 6px #000000" }}
        >
          TheGuides
        </h1>
        <div className="mx-5 rounded-xl h-[75%]">
          <div className="grid grid-cols-2 space-x-2 rounded-xl shadow-md shadow-black bg-[#ffffff]  p-2">
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
            className="text-white flex my-4 border-2 rounded-lg p-2 justify-center items-center text-center w-full shadow-md shadow-black hover:shadow-xl hover:border-slate-300 hover:bg-slate-300 hover:text-black hover:shadow-black transition-al duration-100"
          >
            <BiSolidMessageSquareAdd className="mr-2" />
            New Chat
          </button>
          {/* Subject */}
          {selectedOption === "1" && (
            <Subject setSelectedSubject={setSelectedSubject} />
          )}
          {selectedOption === "2" && (
            <ChatHistory
              setCurrentChatId={setCurrentChatId}
              selectedSubject={selectedSubject}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TestingSidebar;

// V2
// import React, { useState, useEffect } from "react";
// import Subject from "./sub-components/Subject";
// import ChatHistory from "./sub-components/ChatHistory";
// import Footer from "./sub-components/Footer";
// import { BiSolidMessageSquareAdd } from "react-icons/bi";
// import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
// import axios from "axios";

// interface ChatLog {
//   id: string;
//   messages: { role: string; content: string }[];
//   subject: string;
// }

// interface SidebarProps {
//   chatLogs: Record<string, ChatLog>;
//   onNewChat: () => void;
//   setChatLogs: (chatLogs: Record<string, ChatLog>) => void;
//   setCurrentChatId: (id: string) => void;
//   // selectedSubject: null | string;
//   // setSelectedSubject: (subject: string | null) => void;

// }

// const TestingSidebar: React.FC<SidebarProps> = ({ onNewChat, chatLogs, setChatLogs, setCurrentChatId }) => {
//   // , selectedSubject, setSelectedSubject
//   const [selectedOption, setSelectedOption] = useState("1");
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedSubject, setSelectedSubject] = useState<null | string>(null);
//   // const [chatLogs, setChatLogs] = useState<Record<string, ChatLog>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedOption(e.target.id);
//   };

//   // Fetch chat logs when selectedSubject changes
//   useEffect(() => {
//     if (selectedSubject) {
//       console.log(`TestingSidebar: ${selectedSubject}`);
//       axios.post(`http://localhost:3000/api/app/conversation/${selectedSubject}`)
//         .then((response) => {
//           setChatLogs(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [selectedSubject]);

//   return (
//     <>
//       <div
//         className={`${
//           isOpen ? "w-[80%]" : "w-0"
//         } lg:w-[30%] h-screen bg-[#2b2b2b] overflow-hidden lg:overflow-auto`}
//       >
//         <button
//         className="absolute w-10 h-10 text-2xl m-2 text-slate-200 lg:hidden"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <BsReverseLayoutSidebarInsetReverse />
//       </button>
//         <h1 className="text-4xl font-extrabold text-center pt-5 pb-5 text-slate-200" style={{ textShadow: "3px 3px 6px #000000" }}>
//           TheGuides
//         </h1>
//         <div className="mx-5 rounded-xl h-[75%]">
//           <div
//             className="grid grid-cols-2 space-x-2 rounded-xl shadow-md shadow-black bg-[#ffffff]  p-2"
//             x-data="app"
//           >
//             <div>
//               <input
//                 type="radio"
//                 name="option"
//                 id="1"
//                 className="peer hidden"
//                 checked={selectedOption === "1"}
//                 onChange={handleChange}
//               />
//               <label
//                 htmlFor="1"
//                 className="block cursor-pointer select-none rounded-xl p-2 text-center text-slate-800
//                 hover:bg-slate-300 hover:shadow-md hover:shadow-gray-400 peer-checked:shadow-md peer-checked:shadow-[#373737] peer-checked:bg-slate-800 peer-checked:font-bold peer-checked:text-gray-100 transition-all duration-200"
//               >
//                 Subject
//               </label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 name="option"
//                 id="2"
//                 className="peer hidden"
//                 checked={selectedOption === "2"}
//                 onChange={handleChange}
//               />
//               <label
//                 htmlFor="2"
//                 className="block cursor-pointer select-none rounded-xl p-2 text-center text-slate-800
//                 hover:bg-slate-300 hover:shadow-md hover:shadow-gray-400 peer-checked:shadow-md peer-checked:shadow-[#373737] peer-checked:bg-slate-800 peer-checked:font-bold peer-checked:text-gray-100 transition-all duration-200"
//               >
//                 History
//               </label>
//             </div>
//           </div>
//           {/* New Chat Button */}
//           <button
//             onClick={onNewChat}
//             className="text-white flex my-4 border-2 rounded-lg p-2 justify-center items-center text-center w-full shadow-md shadow-black hover:shadow-xl hover:border-slate-300 hover:bg-slate-300 hover:text-black hover:shadow-black transition-al duration-100"
//           >
//             <BiSolidMessageSquareAdd className="mr-2" />
//             New Chat
//           </button>
//           {/* Subject */}
//         {selectedOption === "1" && <Subject setSelectedSubject={setSelectedSubject} />}
//         {selectedOption === "2" && (
//           <ChatHistory
//             chatLogs={chatLogs}
//             setChatLogs={setChatLogs}
//             setCurrentChatId={setCurrentChatId}
//             selectedSubject={selectedSubject}
//           />
//         )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TestingSidebar;
