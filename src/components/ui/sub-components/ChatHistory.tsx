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
      <div className="overflow-y-auto flex flex-col h-[75%]">
        {/* reversed chatlog */}
        {Object.values(chatLogs)
          .reverse()
          .map((chatLog) => (
            <div
              onClick={() => setCurrentChatId(chatLog.id)}
              key={chatLog.id}
              className="text-sm text-white h-fit flex items-center"
            >
              <p className="border-b-2 p-2">Chat ID: {chatLog.id}</p>
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
