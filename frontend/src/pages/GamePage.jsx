import React, { useState } from "react";
import Countdown from "../components/Countdown";
import { Link } from "react-router-dom";

const GamePage = () => {
  const [isImageMode, setIsImageMode] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <Countdown />
      <div
        style={{
          width: "400px",
          height: "300px",
          margin: "2rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isImageMode ? "#eee" : "#ccc",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {isImageMode ? (
          <span style={{ fontSize: "2rem", color: "#888" }}>
            Placeholder Photo
          </span>
        ) : (
          <span style={{ fontSize: "2rem", color: "#666" }}>
            Map Mode (Gray Box)
          </span>
        )}
      </div>
      <button
        onClick={() => setIsImageMode((prev) => !prev)}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {isImageMode ? "Switch to Map Mode" : "Switch to Image Mode"}
      </button>
      <Link
        to="/"
        style={{
          marginTop: "2rem",
          fontSize: "1.2rem",
          color: "#007bff",
          textDecoration: "underline",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default GamePage;
