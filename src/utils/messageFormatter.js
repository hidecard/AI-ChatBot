export const formatMessage = (text) => {
  if (!text) return "";

  // Convert markdown-style formatting to HTML
  let formatted = text
    // Headers
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || "javascript";
      return `
        <div class="code-block">
          <div class="code-header">
            <span class="language">${language}</span>
            <button class="copy-btn" onclick="copyCode('${code.replace(/'/g, "\\'")}')">
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
          <pre class="line-numbers"><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>
        </div>
      `;
    })

    // Inline code
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )

    // Line breaks
    .replace(/\n/g, "<br>");

  return formatted;
};

const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

// Global function for copying code (attached to window for onclick handlers)
window.copyCode = (code) => {
  // Try modern clipboard API first, fallback to legacy method
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        const event = new CustomEvent("showToast", {
          detail: { message: "Code copied to clipboard!" },
        });
        window.dispatchEvent(event);
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
        fallbackCopyCode(code);
      });
  } else {
    fallbackCopyCode(code);
  }
};

const fallbackCopyCode = (code) => {
  const textarea = document.createElement("textarea");
  textarea.value = code;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);

  try {
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    const successful = document.execCommand("copy");

    if (successful) {
      const event = new CustomEvent("showToast", {
        detail: { message: "Code copied to clipboard!" },
      });
      window.dispatchEvent(event);
    } else {
      const event = new CustomEvent("showToast", {
        detail: { message: "Could not copy code" },
      });
      window.dispatchEvent(event);
    }
  } catch (err) {
    console.error("Fallback copy failed: ", err);
    const event = new CustomEvent("showToast", {
      detail: { message: "Copy not supported" },
    });
    window.dispatchEvent(event);
  } finally {
    document.body.removeChild(textarea);
  }
};
