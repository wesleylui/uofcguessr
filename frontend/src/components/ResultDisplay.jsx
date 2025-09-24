import React from "react";
import ResultBox from "./ResultBox";

const ResultDisplay = ({ correctLocation, playerGuess }) => {
  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "0.5rem",
  };

  const placeholderStyle = {
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
  };

  const textStyle = {
    margin: "0",
    fontWeight: "bold",
    fontSize: "1.1rem",
  };

  const coordStyle = {
    margin: "0",
    fontSize: "1rem",
  };

  return (
    <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
      {/* Correct Answer Box */}
      <ResultBox title="Correct Answer" titleColor="#28a745">
        <img
          src={correctLocation.placeholderImage}
          alt={correctLocation.name}
          style={imageStyle}
        />
        <p style={textStyle}>
          {correctLocation.name}
        </p>
      </ResultBox>

      {/* Player Guess Box */}
      <ResultBox title="Your Guess" titleColor="#007bff">
        <div style={placeholderStyle}>
          📍 Map Location
        </div>
        <p style={coordStyle}>
          Coordinates: {playerGuess.lng.toFixed(6)}, {playerGuess.lat.toFixed(6)}
        </p>
      </ResultBox>
    </div>
  );
};

export default ResultDisplay;
