import React from "react";

const SidebarToggle = ({ onToggle, sidebarOpen }) => {
  return (
    <button
      className="sidebar-toggle"
      onClick={onToggle}
      aria-expanded={sidebarOpen}
      aria-label="Toggle Sidebar"
    >
      <i className="bi bi-list"></i>
    </button>
  );
};

export default SidebarToggle;
