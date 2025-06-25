import React, { useState } from "react";
import ChatHistoryItem from "./ChatHistoryItem";

const Sidebar = ({
  isOpen,
  conversations,
  currentConversationId,
  onNewChat,
  onLoadConversation,
  onClearHistory,
  onToggleTheme,
  onLogout,
  isDarkMode,
  onToggleSidebar,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title && conv.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleConversationClick = (conversationId) => {
    onLoadConversation(conversationId);
    if (window.innerWidth <= 767) {
      onToggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <h5>
          <i className="bi bi-robot"></i> YHA - AI
        </h5>
        <button className="new-chat-btn" onClick={onNewChat}>
          <i className="bi bi-plus-circle"></i> New Chat
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chats..."
          aria-label="Search chat history"
        />
      </div>

      <div className="chat-history">
        {filteredConversations.map((conversation) => (
          <ChatHistoryItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === currentConversationId}
            onClick={() => handleConversationClick(conversation.id)}
            onTitleEdit={(newTitle) => {
              // Handle title editing
              console.log("Title edit:", newTitle);
            }}
          />
        ))}

        {filteredConversations.length === 0 && searchTerm && (
          <div className="no-results">
            <p>No chats found</p>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={onToggleTheme}>
          <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon-stars"}`}></i>
          {isDarkMode ? " Light Mode" : " Dark Mode"}
        </button>

        <button className="clear-history-btn" onClick={onClearHistory}>
          <i className="bi bi-trash"></i> Clear History
        </button>

        <button className="logout-btn" onClick={onLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
