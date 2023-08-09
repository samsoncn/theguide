import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TestingSidebar from "./TestingSidebar";
import TestingChat from "./TestingChat";
// import Chat from "./Chat";

// Define the type for the message
interface Message {
  role: string;
  content: string;
}

interface ChatLog {
  id: string;
  messages: Message[];
  subject?: string;
}
// interface Interaction {
//   conversation: Conversation;
//   query: string;
// }
// interface ChatComponentProps {
//   currentChatId: string;
//   interaction: Interaction;
//   setChatLogs: (chatLogs: Record<string, Conversation>) => void;
// }

const WholeScreen = () => {
  // Generate an initial chat ID using the uuidv4 library
  const initialChatId = uuidv4();

  // State variables for chat logs and current chat ID
  const [chatLogs, setChatLogs] = useState<Record<string, ChatLog>>({
    [initialChatId]: { id: initialChatId, messages: [] },
  });
  const [currentChatId, setCurrentChatId] = useState(initialChatId);

  // Function to handle creating a new chat
  const handleNewChat = () => {
    // Generate a new chat ID
    const newChatId = uuidv4();

    // Create a new chat log with an empty log array
    const newChatLog: ChatLog = { id: newChatId, messages: [] };

    // Update the chat logs state by adding the new chat log
    setChatLogs({
      ...chatLogs,
      [newChatId]: newChatLog,
    });

    // Set the current chat ID to the new chat ID
    setCurrentChatId(newChatId);
  };

  // Create an interaction object for the current conversation
  // const interaction: Interaction = {
  //   conversation: chatLogs[currentChatId],
  //   query: "",
  // };

  return (
    <div className="h-screen overflow-hidden w-screen flex bg-[#191919]">
      <TestingSidebar
        onNewChat={handleNewChat}
        chatLogs={chatLogs}
        setCurrentChatId={setCurrentChatId}
      />
      <TestingChat
        currentChatId={currentChatId}
        chatLogs={chatLogs}
        setChatLogs={setChatLogs}
      />
    </div>
  );
};

export default WholeScreen;
