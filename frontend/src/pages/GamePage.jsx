import React from "react";
import MapboxMap from "../components/MapboxMap";

const GamePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "#f8f9fa",
      }}
    >
      <MapboxMap
        style={{
          width: "80vw",
          height: "80vh",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default GamePage;
