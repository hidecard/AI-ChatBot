import React, { useState } from "react";

const AuthContainer = ({ onLogin, onRegister }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (activeTab === "login") {
        const result = await onLogin(formData.email, formData.password);
        if (!result.success) {
          setMessage(`Error: ${result.error}`);
        }
      } else {
        const result = await onRegister(
          formData.username,
          formData.email,
          formData.password,
        );
        if (result.success) {
          setMessage("User registered successfully!");
          setFormData({ username: "", email: "", password: "" });
        } else {
          setMessage(`Error: ${result.error}`);
        }
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Welcome to YHA - AI</h2>
        <p>Login or create an account to continue</p>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("login");
            setMessage("");
          }}
        >
          Login
        </div>
        <div
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("register");
            setMessage("");
          }}
        >
          Register
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="active">
          {activeTab === "register" && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                {activeTab === "login" ? "Logging in..." : "Registering..."}
              </>
            ) : activeTab === "login" ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>

      {message && <div className="auth-message">{message}</div>}
    </div>
  );
};

export default AuthContainer;
