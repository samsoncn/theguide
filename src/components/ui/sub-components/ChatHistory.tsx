import React from "react";

interface Message {
  type: string;
  message: string;
}

interface ChatLog {
  id: string;
  log: Message[];
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
    <div>
      {/* <h2>Chat History</h2> */}
      <div className="overflow-y-auto flex flex-col">
        {Object.values(chatLogs).map((chatLog) => (
          <div
            onClick={() => setCurrentChatId(chatLog.id)}
            key={chatLog.id}
            className="text-base text-white flex items-center"
          >
            <p>Chat ID: {chatLog.id}</p>
            {/* <h3>Conversation:</h3>
            {chatLog.log.map((message, index) => (
              <p key={index}>
                {message.type}: {message.message}
              </p>
            ))} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
