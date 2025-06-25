import React, { useEffect } from "react";
import { formatMessage } from "../utils/messageFormatter";

const Message = ({ message, isUser }) => {
  const messageRef = React.useRef(null);

  useEffect(() => {
    // Highlight code blocks after message is rendered
    if (messageRef.current && window.Prism) {
      const codeBlocks = messageRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        window.Prism.highlightElement(block);
      });
    }
  }, [message]);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Show toast notification
        const event = new CustomEvent("showToast", {
          detail: { message: "Text copied to clipboard!" },
        });
        window.dispatchEvent(event);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div
      ref={messageRef}
      className={`message ${isUser ? "user-message" : "ai-message"}`}
    >
      <div className="avatar">
        {isUser ? (
          <i className="bi bi-person-circle"></i>
        ) : (
          <i className="bi bi-robot"></i>
        )}
      </div>

      <div className="message-content">
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: formatMessage(message.text),
          }}
        />

        {message.files && message.files.length > 0 && (
          <div className="message-files">
            {message.files.map((file, index) => (
              <div key={index} className="file-info">
                <i className="bi bi-file-earmark"></i>
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="message-actions">
          <button
            className="copy-btn"
            onClick={() => handleCopy(message.text)}
            title="Copy message"
          >
            <i className="bi bi-clipboard"></i>
          </button>

          <span className="timestamp">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
