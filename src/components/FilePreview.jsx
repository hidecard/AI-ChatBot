import React from "react";

const FilePreview = ({ files, onRemove }) => {
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return "bi-image";
    } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      return "bi-file-text";
    } else if (file.name.endsWith(".js") || file.name.endsWith(".jsx")) {
      return "bi-file-code";
    } else if (file.name.endsWith(".py")) {
      return "bi-file-code";
    } else if (file.name.endsWith(".html") || file.name.endsWith(".css")) {
      return "bi-file-code";
    }
    return "bi-file-earmark";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="file-preview-container">
      <div className="file-preview-header">
        <span>Selected Files ({files.length})</span>
      </div>
      <div className="file-preview-list">
        {files.map((file, index) => (
          <div key={index} className="file-preview-item">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="file-thumbnail"
              />
            ) : (
              <div className="file-icon">
                <i className={`bi ${getFileIcon(file)}`}></i>
              </div>
            )}

            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-size">{formatFileSize(file.size)}</div>
            </div>

            <button
              className="remove-file"
              onClick={() => onRemove(index)}
              aria-label="Remove file"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;
