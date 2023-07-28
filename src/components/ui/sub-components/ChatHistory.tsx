import React, { useState, useEffect } from "react";

interface Message {
  role: string;
  content: string;
}

interface ChatLog {
  id: string;
  messages: Message[];
}

interface ChatHistoryProps {
  chatLogs: Record<string, ChatLog>;
  setCurrentChatId: (id: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chatLogs,
  setCurrentChatId,
}) => {
  return (
    <>
      <div className="overflow-y-auto flex flex-col h-[90%] bg-slate-500 rounded-2xl px-4 py-4 shadow-md shadow-black">
        {/* reversed chatlog */}
        {Object.values(chatLogs)
          .reverse()
          .map((chatLog) => (
            <div
              onClick={() => setCurrentChatId(chatLog.id)}
              key={chatLog.id}
              className="text-sm cursor-pointer w-full text-slate-800 p-1 overflow-none flex items-center bg-slate-300 shadow-md shadow-slate-900 hover:text-white hover:bg-slate-800 hover:shadow-md hover:shadow-black rounded-lg my-1 transition-all transition-duration-100"
            >
              <p className="w-full p-2">Chat ID: {chatLog.id}</p>
              {/* <h3>Conversation:</h3>
            {chatLog.log.map((message, index) => (
              <p key={index}>
                {message.type}: {message.message}
              </p>
            ))} */}
            </div>
          ))}
      </div>
    </>
  );
};

export default ChatHistory;
