import { useState, FormEvent } from "react";
import { useMutation } from "react-query";
import { fetchResponse } from "../pages/api/openai";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const mutation = useMutation(fetchResponse);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setChatHistory((oldChatHistory) => [
      ...oldChatHistory,
      { sender: "user", message },
    ]);
    mutation.mutate(message, {
      onSuccess: (data: string) => {
        setChatHistory((oldChatHistory) => [
          ...oldChatHistory,
          { sender: "bot", message: data },
        ]);
      },
    });
    setMessage("");
  };

  return (
    <div>
      <ul>
        {chatHistory.map((chat, index) => (
          <li key={index}>
            <strong>{chat.sender}</strong>: {chat.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
