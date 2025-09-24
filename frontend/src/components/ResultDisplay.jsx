import React from "react";

const ResultDisplay = ({ correctLocation, playerGuess, distance, score }) => {
  return (
    <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
      {/* Correct Answer Box */}
      <div
        style={{
          border: "2px solid #6c757d",
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#ffffff",
          minWidth: "300px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#28a745", margin: "0 0 0.5rem 0" }}>
          Correct Answer
        </h3>
        <img
          src={correctLocation.placeholderImage}
          alt={correctLocation.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "0.5rem",
          }}
        />
        <p style={{ margin: "0", fontWeight: "bold", fontSize: "1.1rem" }}>
          {correctLocation.name}
        </p>
      </div>

      {/* Player Guess Box */}
      <div
        style={{
          border: "2px solid #6c757d",
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#ffffff",
          minWidth: "300px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#007bff", margin: "0 0 0.5rem 0" }}>
          Your Guess
        </h3>
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#e9ecef",
            borderRadius: "8px",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            color: "#6c757d",
          }}
        >
          📍 Map Location
        </div>
        <p style={{ margin: "0", fontSize: "1rem" }}>
          Coordinates: {playerGuess.lng.toFixed(6)}, {playerGuess.lat.toFixed(6)}
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
