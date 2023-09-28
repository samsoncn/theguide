import { useState, useEffect } from "react";

export interface Message {
  role: string;
  content: string;
}

export interface ChatLog {
  id: string;
  messages: Message[];
  subject: string;
}

export interface ChatLogs {
  [subject: string]: ChatLog[];
}

const useChatLogs = (selectedSubject: null | string) => {
  const [chatLogs, setChatLogs] = useState<ChatLogs>({});

  useEffect(() => {
    if (selectedSubject) {
      fetch(`http://localhost:3000/api/app/conversation/${selectedSubject}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          setChatLogs((prevLogs) => ({
            ...prevLogs,
            [selectedSubject]: data,
          }));
        })
        .catch((error) => {
          console.error("Error fetching chat logs:", error);
        });
    }
  }, [selectedSubject]);

  return { chatLogs, setChatLogs };
};

export default useChatLogs;
