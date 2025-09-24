// src/components/Button.jsx
import React from "react";

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "medium", 
  style = {}, 
  disabled = false,
  ...props 
}) => {
  const baseStyle = {
    border: "none",
    borderRadius: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const variants = {
    primary: {
      backgroundColor: "#007bff",
      color: "white",
    },
    success: {
      backgroundColor: "#28a745", 
      color: "white",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "white",
    },
  };

  const sizes = {
    small: {
      padding: "0.5rem 1rem",
      fontSize: "0.9rem",
    },
    medium: {
      padding: "0.75rem 1.5rem", 
      fontSize: "1.1rem",
    },
    large: {
      padding: "1rem 2rem",
      fontSize: "1.2rem",
    },
  };

  const buttonStyle = {
    ...baseStyle,
    ...variants[variant],
    ...sizes[size],
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={buttonStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
