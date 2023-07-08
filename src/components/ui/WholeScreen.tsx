import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TestingSidebar from "./TestingSidebar";
import TestingChat from "./TestingChat";

// Define the type for the message
interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  messages: Message[];
}

const WholeScreen = () => {
  // Generate an initial chat ID using the uuidv4 library
  const initialChatId = uuidv4();

  // State variables for chat logs and current chat ID
  const [chatLogs, setChatLogs] = useState<Record<string, Conversation>>({
    [initialChatId]: { id: initialChatId, messages: [] },
  });
  const [currentChatId, setCurrentChatId] = useState(initialChatId);

  // Function to handle creating a new chat
  const handleNewChat = () => {
    // Generate a new chat ID
    const newChatId = uuidv4();

    // Create a new chat log with an empty log array
    const newChatLog: Conversation = { id: newChatId, messages: [] };

    // Update the chat logs state by adding the new chat log
    setChatLogs({
      ...chatLogs,
      [newChatId]: newChatLog,
    });

    // Set the current chat ID to the new chat ID
    setCurrentChatId(newChatId);
  };

  return (
    <div className="h-screen w-screen flex">
      <TestingSidebar
        onNewChat={handleNewChat}
        chatLogs={chatLogs}
        setCurrentChatId={setCurrentChatId}
      />
      <TestingChat
        currentChatId={currentChatId}
        setChatLogs={setChatLogs}
        chatLogs={chatLogs}
      />
    </div>
  );
};

export default WholeScreen;
