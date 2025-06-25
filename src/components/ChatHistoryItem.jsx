import React, { useState } from "react";

const ChatHistoryItem = ({ conversation, isActive, onClick, onTitleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const newTitle = editTitle.trim() || conversation.title;
    setEditTitle(newTitle);
    setIsEditing(false);
    onTitleEdit(newTitle);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditTitle(conversation.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`chat-history-item ${isActive ? "active" : ""}`}
      onClick={!isEditing ? onClick : undefined}
      tabIndex={0}
    >
      <i className="bi bi-chat-left-text"></i>

      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyPress}
          className="title-edit-input"
          autoFocus
        />
      ) : (
        <span className="conversation-title">{conversation.title}</span>
      )}

      <button
        className="edit-title"
        onClick={handleEditClick}
        aria-label="Edit chat title"
      >
        <i className="bi bi-pencil"></i>
      </button>
    </div>
  );
};

export default ChatHistoryItem;
