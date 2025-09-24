// src/components/ResultBox.jsx
import React from "react";

const ResultBox = ({ 
  title, 
  titleColor = "#6c757d", 
  children, 
  style = {} 
}) => {
  const boxStyle = {
    border: "2px solid #6c757d",
    borderRadius: "12px",
    padding: "1rem",
    backgroundColor: "#ffffff",
    minWidth: "300px",
    textAlign: "center",
    ...style,
  };

  const titleStyle = {
    color: titleColor,
    margin: "0 0 0.5rem 0",
    fontSize: "1.1rem",
    fontWeight: "600",
  };

  return (
    <div style={boxStyle}>
      <h3 style={titleStyle}>{title}</h3>
      {children}
    </div>
  );
};

export default ResultBox;
