import React, { useState, useEffect } from "react";
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthContainer from "./components/AuthContainer";
import ChatContainer from "./components/ChatContainer";
import Sidebar from "./components/Sidebar";
import SidebarToggle from "./components/SidebarToggle";
import Toast from "./components/Toast";
import { useAuth } from "./hooks/useAuth";
import { useChat } from "./hooks/useChat";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem("sidebarState") === "open" || window.innerWidth > 767,
  );

  const { login, register, logout } = useAuth();
  const {
    conversations,
    currentConversationId,
    currentMessages,
    newChat,
    loadConversation,
    sendMessage,
    clearHistory,
    selectedFiles,
    setSelectedFiles,
  } = useChat(user);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    localStorage.setItem("sidebarState", !sidebarOpen ? "open" : "closed");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <SidebarToggle onToggle={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div
        className={`overlay ${sidebarOpen ? "show" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <div className="container-fluid">
        <div className="row">
          <Sidebar
            isOpen={sidebarOpen}
            conversations={conversations}
            currentConversationId={currentConversationId}
            onNewChat={newChat}
            onLoadConversation={loadConversation}
            onClearHistory={clearHistory}
            onToggleTheme={toggleTheme}
            onLogout={logout}
            isDarkMode={isDarkMode}
            onToggleSidebar={toggleSidebar}
          />

          <div
            className={`col-12 main-content ${sidebarOpen ? "sidebar-open" : ""}`}
          >
            {!user ? (
              <AuthContainer onLogin={login} onRegister={register} />
            ) : (
              <ChatContainer
                messages={currentMessages}
                onSendMessage={sendMessage}
                selectedFiles={selectedFiles}
                onFilesChange={setSelectedFiles}
                isNewChat={!currentConversationId}
              />
            )}
          </div>
        </div>
      </div>

      <Toast />
    </div>
  );
}

export default App;
