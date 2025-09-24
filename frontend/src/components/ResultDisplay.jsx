import React from "react";

const ResultDisplay = ({ correctLocation, playerGuess, distance, score }) => {
  const campusImageStyle = {
    width: "80vw",
    height: "60vh",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
    marginBottom: "1rem",
  };

  const locationInfoStyle = {
    textAlign: "center",
    marginBottom: "1rem",
  };

  const locationNameStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
    color: "#333",
  };

  const guessInfoStyle = {
    fontSize: "1rem",
    color: "#666",
    margin: "0.25rem 0",
  };

  const scoreStyle = {
    fontSize: "1.1rem",
    color: "#000",
    margin: "0.25rem 0",
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* UofC Campus Image */}
      <img
        src={correctLocation.image || correctLocation.placeholderImage}
        alt={correctLocation.name}
        style={campusImageStyle}
      />
      
      {/* Location Information */}
      <div style={locationInfoStyle}>
        <h2 style={locationNameStyle}>
          Answer: {correctLocation.name}
        </h2>
        <p style={guessInfoStyle}>
          Your guess was {distance.toFixed(2)} meters away
        </p>
        <p style={scoreStyle}>
          Score: {score} points
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
