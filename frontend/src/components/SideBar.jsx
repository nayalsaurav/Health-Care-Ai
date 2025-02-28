import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../store/ChatContext";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Moon, Sun, Trash2 } from "lucide-react";

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return ''; // Check for invalid date
    
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};


const SideBar = ({ isCollapsed }) => {
  const { chats, deleteChat } = useContext(ChatContext);
  
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleNewChat = () => navigate("/dashboard/chatbot");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2 md:p-4 border-b border-border">
        {!isCollapsed && (
          <h1 className="text-sm md:text-lg font-semibold">Chat History</h1>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-2 md:p-4">
        <button 
          onClick={handleNewChat}
          className={`flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
            isCollapsed 
              ? 'w-8 h-8 md:w-10 md:h-10 p-0' 
              : 'w-full px-3 md:px-4 py-1.5 md:py-2'
          }`}
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
          {!isCollapsed && (
            <span className="text-sm md:text-base">New Chat</span>
          )}
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-1 md:px-2">
        {chats.length === 0 ? (
          !isCollapsed && (
            <div className="text-center py-4 text-muted-foreground text-sm md:text-base">
              No conversations yet
            </div>
          )
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <div key={chat.id} className="group relative">
                <Link 
                  to={`/dashboard/chatbot/${chat.id}`}
                  className="flex flex-col w-full p-2 md:p-3 rounded-md hover:bg-accent transition-colors"
                >
                  {!isCollapsed && (
                    <>
                      <span className="font-medium truncate text-sm md:text-base">
                        {chat.title || 'New Chat'}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {formatTime(chat.createdAt || chat.timestamp)}
                      </span>
                    </>
                  )}
                </Link>
                {!isCollapsed && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteChat(chat.id);
                      navigate("/dashboard/chatbot");
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 md:p-2 hover:bg-destructive/10 rounded-md transition-all"
                  >
                    <Trash2 className="h-3 w-3 md:h-4 md:w-4 text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;