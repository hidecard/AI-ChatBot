import React, { useEffect } from "react";
import { formatMessage } from "../utils/messageFormatter";

const Message = ({ message, isUser }) => {
  const messageRef = React.useRef(null);

  useEffect(() => {
    // Highlight code blocks after message is rendered
    if (messageRef.current && window.Prism) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const codeBlocks = messageRef.current.querySelectorAll("pre code");
        codeBlocks.forEach((block) => {
          // Remove existing highlighting
          block.removeAttribute("class");
          block.className = block.dataset.language
            ? `language-${block.dataset.language}`
            : "language-javascript";

          if (window.Prism.highlightElement) {
            window.Prism.highlightElement(block);
          }
        });

        // Also highlight any code blocks with proper class
        const allCodeBlocks = messageRef.current.querySelectorAll(
          ".code-block pre code",
        );
        allCodeBlocks.forEach((block) => {
          if (
            window.Prism.highlightElement &&
            !block.classList.contains("prism-highlighted")
          ) {
            window.Prism.highlightElement(block);
            block.classList.add("prism-highlighted");
          }
        });
      }, 100);
    }
  }, [message]);

  const handleCopy = (text) => {
    // Try modern clipboard API first, fallback to legacy method
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          const event = new CustomEvent("showToast", {
            detail: { message: "Text copied to clipboard!" },
          });
          window.dispatchEvent(event);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          fallbackCopy(text);
        });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);

    try {
      textarea.select();
      textarea.setSelectionRange(0, 99999); // For mobile devices
      const successful = document.execCommand("copy");

      if (successful) {
        const event = new CustomEvent("showToast", {
          detail: { message: "Text copied to clipboard!" },
        });
        window.dispatchEvent(event);
      } else {
        console.warn("Copy command was unsuccessful");
        const event = new CustomEvent("showToast", {
          detail: { message: "Could not copy text" },
        });
        window.dispatchEvent(event);
      }
    } catch (err) {
      console.error("Fallback copy failed: ", err);
      const event = new CustomEvent("showToast", {
        detail: { message: "Copy not supported in this environment" },
      });
      window.dispatchEvent(event);
    } finally {
      document.body.removeChild(textarea);
    }
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
