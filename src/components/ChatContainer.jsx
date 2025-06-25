import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import FilePreview from "./FilePreview";

const ChatContainer = ({
  messages,
  onSendMessage,
  selectedFiles,
  onFilesChange,
  isNewChat,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() && selectedFiles.length === 0) return;

    setLoading(true);
    try {
      await onSendMessage(inputValue);
      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesChange(files);
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            isUser={message.role === "user"}
          />
        ))}

        {loading && (
          <div className="message ai-message">
            <div className="avatar">
              <i className="bi bi-robot"></i>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="input-area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="form-control"
            disabled={loading}
          />

          <label
            htmlFor="fileInput"
            className="btn btn-primary file-upload-btn"
          >
            <i className="bi bi-paperclip"></i>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            id="fileInput"
            accept=".txt,.js,.py,.html,.css,.png,.jpg,.jpeg"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              loading || (!inputValue.trim() && selectedFiles.length === 0)
            }
          >
            <i className="bi bi-send"></i>
          </button>
        </form>

        {selectedFiles.length > 0 && (
          <FilePreview files={selectedFiles} onRemove={removeFile} />
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
