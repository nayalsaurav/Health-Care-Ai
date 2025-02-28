import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial AI message
  const initialAIMessage = {
    id: uuid(),
    content: "Hello! How can I help you today?",
    role: "assistant",
    timestamp: new Date().toISOString()
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/v1/chatbot/conversations")
      .then((res) => res.json())
      .then((data) => {
        setChats(data.reverse() || []);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addChat = async (message) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/chatbot/conversation", {
        prompt: message
      });

      const timestamp = new Date().toISOString();
      const userMessage = {
        id: uuid(),
        content: message,
        role: "user",
        timestamp
      };

      const aiMessage = {
        id: uuid(),
        content: response.data.message,
        role: "assistant",
        timestamp
      };

      const newChat = {
        ...response.data,
        createdAt: timestamp,
        messages: [userMessage, aiMessage]
      };

      setChats((prevChats) => [newChat,...prevChats]);
      return newChat;
    } catch (error) {
      console.error("Error adding chat:", error);
      throw error;
    }
  };

  const deleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/chatbot/conversation/${id}`);
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  };

  const updateChat = async (id, message) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/chatbot/conversation/${id}`, {
        prompt: message
      });
      
      const timestamp = new Date().toISOString();
      const newMessages = [
        { id: uuid(), content: message, role: "user", timestamp },
        { id: uuid(), content: response.data.message, role: "assistant", timestamp }
      ];

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === id 
            ? { ...chat, messages: [...(chat.messages || []), ...newMessages] }
            : chat
        )
      );
      return newMessages;
    } catch (error) {
      console.error("Error updating chat:", error);
      throw error;
    }
  };

  return (
    <ChatContext.Provider value={{ chats, addChat, deleteChat, updateChat, setChats}}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500">Error: {error}</div>
        </div>
      ) : (
        children
      )}
    </ChatContext.Provider>
  );
};