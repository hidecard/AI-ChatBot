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
    });
};
