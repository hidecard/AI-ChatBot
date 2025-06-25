// Replace with your actual Gemini API key from Google AI Studio
// Get one at: https://ai.google.dev/
const API_KEY = "your-gemini-api-key"; // Replace this with your actual API key
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const sendToGemini = async (messages, files = []) => {
  try {
    // Check if API key is configured
    if (!API_KEY || API_KEY === "your-gemini-api-key") {
      throw new Error(
        "API key is not configured. Please set a valid Gemini API key in src/utils/api.js",
      );
    }

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
      const errorData = await response.json().catch(() => null);
      if (errorData?.error?.message) {
        throw new Error(`API Error: ${errorData.error.message}`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);

    // Return a helpful error message for the user
    if (error.message.includes("API key")) {
      return "I apologize, but the AI service is not properly configured. Please configure the Gemini API key to enable AI responses.\n\nTo fix this:\n1. Get a Gemini API key from Google AI Studio\n2. Replace the API_KEY in src/utils/api.js\n3. Restart the application";
    } else if (error.message.includes("API Error")) {
      return `I encountered an error with the AI service: ${error.message}\n\nPlease try again later or contact support if the issue persists.`;
    } else {
      return "I apologize, but I am temporarily unable to respond due to a technical issue. Please try again later.";
    }
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
