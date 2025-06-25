const API_KEY = "AIzaSyD2RnZpCgWF_rKeDcPeTJqwCBOxhIkAYSE";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const sendToGemini = async (messages, files = []) => {
  try {
    const parts = [];

    // Add text message
    if (messages.length > 0) {
      parts.push({ text: messages[messages.length - 1].text });
    }

    // Add file data if present
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        const base64Data = await fileToBase64(file);
        parts.push({
          inlineData: {
            mimeType: file.type,
            data: base64Data.split(",")[1], // Remove data:image/...;base64, prefix
          },
        });
      } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const text = await file.text();
        parts.push({ text: `File content (${file.name}):\n${text}` });
      }
    }

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: parts,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadFileToStorage = async (file, userId) => {
  // This would be implemented if file uploads to Firebase Storage are needed
  // For now, we'll handle files inline with the API call
  return URL.createObjectURL(file);
};
