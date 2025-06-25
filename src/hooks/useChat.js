import { useState, useEffect } from "react";
import { ref, set, get, push, remove } from "firebase/database";
import { database } from "../utils/firebase";
import { sendToGemini } from "../utils/api";
import { showToast } from "../utils/toast";

const QUESTION_LIMIT = 5;

const WELCOME_MESSAGE = `# Welcome to YHA - AI! 🤖

**YHA - AI** is a sleek, modern, and responsive AI-powered chat application designed to empower users to explore AI, coding, and computer science concepts.

## ✨ Features:
- **Programming & Coding** - Code writing, debugging, and code review assistance
- **Multi-language Support** - Ask questions in Myanmar or English
- **Learning & Education** - Computer Science, AI, and Technology concepts
- **File Upload Support** - Upload text files and images for analysis
- **Dark/Light Theme** - Switch between themes for comfortable viewing
- **Chat History** - Save and manage your conversation history

## 🚀 Getting Started:
Ask me anything about programming, technology, or any topic you're curious about!

---
*Examples: "How do I write a function in Python?" or "Create a React component for me"*`;

export const useChat = (user) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load conversations from Firebase when user changes
  useEffect(() => {
    if (user) {
      loadConversations();
    } else {
      setConversations([]);
      setCurrentConversationId(null);
      setCurrentMessages([]);
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;

    try {
      const snapshot = await get(ref(database, "conversations/" + user.uid));
      if (snapshot.exists()) {
        const convData = snapshot.val();
        const convArray = Object.entries(convData).map(([id, conv]) => ({
          id,
          ...conv,
        }));
        setConversations(convArray);

        // Load the latest conversation if exists
        if (convArray.length > 0) {
          const latest = convArray[convArray.length - 1];
          loadConversation(latest.id);
        }
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
      showToast("Failed to load conversations!");
    }
  };

  const newChat = () => {
    setCurrentConversationId(null);
    setCurrentMessages([]);
    setSelectedFiles([]);
    showToast("New chat started!");
  };

  const loadConversation = async (conversationId) => {
    setCurrentConversationId(conversationId);

    const conversation = conversations.find(
      (conv) => conv.id === conversationId,
    );
    if (conversation && conversation.messages) {
      setCurrentMessages(conversation.messages);
    } else {
      setCurrentMessages([]);
    }
    setSelectedFiles([]);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() && selectedFiles.length === 0) return;

    // Check question limit for non-authenticated users
    if (!user) {
      let questionCount = parseInt(
        localStorage.getItem("questionCount") || "0",
      );
      questionCount++;
      localStorage.setItem("questionCount", questionCount);

      if (questionCount > QUESTION_LIMIT) {
        showToast(
          "You have reached the 5-question limit. Please log in to continue.",
        );
        return;
      }
    }

    setLoading(true);

    try {
      // Create user message
      const userMessage = {
        text: messageText,
        role: "user",
        timestamp: new Date().toISOString(),
        files: selectedFiles.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      };

      const newMessages = [...currentMessages, userMessage];
      setCurrentMessages(newMessages);

      // Get AI response
      const aiResponse = await sendToGemini([userMessage], selectedFiles);

      const aiMessage = {
        text: aiResponse,
        role: "assistant",
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...newMessages, aiMessage];
      setCurrentMessages(finalMessages);

      // Save conversation if user is logged in
      if (user) {
        await saveConversation(finalMessages, messageText);
      }

      setSelectedFiles([]);
    } catch (error) {
      console.error("Error sending message:", error);
      showToast("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveConversation = async (messages, firstMessage) => {
    if (!user) return;

    try {
      let conversationId = currentConversationId;

      if (!conversationId) {
        // Create new conversation
        const newConvRef = push(ref(database, "conversations/" + user.uid));
        conversationId = newConvRef.key;
        setCurrentConversationId(conversationId);
      }

      const conversation = {
        id: conversationId,
        title:
          firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : ""),
        messages: messages,
        updatedAt: new Date().toISOString(),
      };

      await set(
        ref(database, "conversations/" + user.uid + "/" + conversationId),
        conversation,
      );

      // Update local conversations
      setConversations((prev) => {
        const existing = prev.find((conv) => conv.id === conversationId);
        if (existing) {
          return prev.map((conv) =>
            conv.id === conversationId ? conversation : conv,
          );
        } else {
          return [...prev, conversation];
        }
      });
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  const clearHistory = async () => {
    if (!user) return;

    if (!window.confirm("Are you sure you want to clear all chat history?")) {
      return;
    }

    try {
      await remove(ref(database, "conversations/" + user.uid));
      setConversations([]);
      setCurrentConversationId(null);
      setCurrentMessages([]);
      setSelectedFiles([]);
      showToast("Chat history cleared!");
    } catch (error) {
      console.error("Error clearing history:", error);
      showToast("Failed to clear history!");
    }
  };

  return {
    conversations,
    currentConversationId,
    currentMessages:
      currentMessages.length > 0
        ? currentMessages
        : [
            {
              text: WELCOME_MESSAGE,
              role: "assistant",
              timestamp: new Date().toISOString(),
            },
          ],
    selectedFiles,
    loading,
    newChat,
    loadConversation,
    sendMessage,
    clearHistory,
    setSelectedFiles,
  };
};
