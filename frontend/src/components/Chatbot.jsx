import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";
import SideBar2 from "./SideBar2";
import { Button } from "./ui/button";
import { v4 as uuid } from "uuid";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat-bubble";
import { ChatMessageList } from "./ui/chat-message-list";
import { ChatInput } from "./ui/chat-input";
import { useParams, useNavigate } from "react-router";
import {ChatContext} from "../store/ChatContext"

const formatMessageTime = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting message time:', error);
    return '';
  }
};

export function Chatbot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chats, addChat, updateChat } = useContext(ChatContext);
  
  const [currentChat, setCurrentChat] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initial AI message
  const initialAIMessage = {
    id: uuid(),
    content: "Hello! How can I help you today?",
    role: "assistant",
    timestamp: new Date().toISOString()
  };

  // Fetch conversation if id exists or set initial message
  useEffect(() => {
    if (id) {
      const chat = chats.find((c) => c.id === id);
      if (chat) {
        setCurrentChat(chat.messages || []);
      }
    } else {
      // Set initial AI message for new chat
      setCurrentChat([initialAIMessage]);
    }
  }, [id, chats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message immediately to display
    const userMessage = {
      id: uuid(),
      content: input,
      role: "user",
      timestamp: new Date().toISOString()
    };
    setCurrentChat(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    try {
      if (id) {
        // Update existing conversation
        const response = await updateChat(id, input);
        const aiMessage = {
          id: uuid(),
          content: response.message,
          role: "assistant",
          timestamp: new Date().toISOString()
        };
        setCurrentChat(prev => [...prev, aiMessage]);
      } else {
        // Create new conversation
        const newChat = await addChat(input);
        navigate(`/chatbot/${newChat.id}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Sidebar - Hidden on mobile by default */}
      <div className="hidden md:block md:w-64 flex-shrink-0">
        <SideBar2 />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden p-2 md:p-4">
          <ChatMessageList className="space-y-4">
            {currentChat.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.role === "user" ? "sent" : "received"}
                className="max-w-[85%] md:max-w-[70%]"
              >
                <ChatBubbleAvatar
                  className="h-6 w-6 md:h-8 md:w-8 shrink-0"
                  src={
                    message.role === "user"
                      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                  }
                  fallback={message.role === "user" ? "US" : "AI"}
                />
                <div className="flex flex-col">
                  <ChatBubbleMessage
                    variant={message.role === "user" ? "sent" : "received"}
                    className="text-sm md:text-base"
                  >
                    {message.content}
                  </ChatBubbleMessage>
                  <span className="text-[10px] md:text-xs text-gray-500 mt-1">
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
              </ChatBubble>
            ))}

            {isLoading && (
              <ChatBubble variant="received" className="max-w-[85%] md:max-w-[70%]">
                <ChatBubbleAvatar
                  className="h-6 w-6 md:h-8 md:w-8 shrink-0"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                  fallback="AI"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
        </div>

        {/* Chat Input Area */}
        <div className="p-2 md:p-4 border-t bg-background">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-10 md:min-h-12 text-sm md:text-base resize-none rounded-lg bg-background border-0 p-2 md:p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-2 md:p-3 pt-0 justify-between">
              <div className="flex gap-1 md:gap-2">
                <Button variant="ghost" size="icon" type="button" className="hidden md:inline-flex">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" type="button" className="hidden md:inline-flex">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button type="submit" size="sm" className="ml-auto text-sm md:text-base">
                Send
                <CornerDownLeft className="h-3 w-3 md:h-4 md:w-4 ml-1.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
