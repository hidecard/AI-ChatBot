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
    .replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || "javascript";
      const escapedCode = escapeHtml(code.trim());
      const codeId = "code_" + Math.random().toString(36).substr(2, 9);
      return `
        <div class="code-block" data-language="${language}">
          <button class="copy-btn" onclick="copyCodeBlock('${codeId}')">
            <i class="bi bi-clipboard"></i>
          </button>
          <pre class="line-numbers"><code id="${codeId}" class="language-${language}">${escapedCode}</code></pre>
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

// Global function for copying code blocks with improved UX
window.copyCodeBlock = (codeId) => {
  const codeElement = document.getElementById(codeId);
  if (!codeElement) return;

  const code = codeElement.textContent || codeElement.innerText;
  const copyBtn = codeElement.closest(".code-block").querySelector(".copy-btn");

  // Add copying state
  if (copyBtn) {
    copyBtn.classList.add("copying");
    copyBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
  }

  // Try modern clipboard API first, fallback to legacy method
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        showCopySuccess(copyBtn);
        const event = new CustomEvent("showToast", {
          detail: { message: "Code copied to clipboard!" },
        });
        window.dispatchEvent(event);
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
        fallbackCopyCodeWithBtn(code, copyBtn);
      });
  } else {
    fallbackCopyCodeWithBtn(code, copyBtn);
  }
};

const showCopySuccess = (copyBtn) => {
  if (copyBtn) {
    copyBtn.classList.remove("copying");
    copyBtn.classList.add("copied");
    copyBtn.innerHTML = '<i class="bi bi-check"></i>';

    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
    }, 2000);
  }
};

const fallbackCopyCodeWithBtn = (code, copyBtn) => {
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
      showCopySuccess(copyBtn);
      const event = new CustomEvent("showToast", {
        detail: { message: "Code copied to clipboard!" },
      });
      window.dispatchEvent(event);
    } else {
      if (copyBtn) {
        copyBtn.classList.remove("copying");
        copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
      }
      const event = new CustomEvent("showToast", {
        detail: { message: "Could not copy code" },
      });
      window.dispatchEvent(event);
    }
  } catch (err) {
    console.error("Fallback copy failed: ", err);
    if (copyBtn) {
      copyBtn.classList.remove("copying");
      copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
    }
    const event = new CustomEvent("showToast", {
      detail: { message: "Copy not supported" },
    });
    window.dispatchEvent(event);
  } finally {
    document.body.removeChild(textarea);
  }
};

// Keep the old function for backwards compatibility
window.copyCode = (code) => {
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
